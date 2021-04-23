<template>
  <div>
    <van-nav-bar
        title="订单确认"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft()"
    />
    <div class="show-info">
      <van-divider/>
      <div>{{this.order.showName}}</div>
      <van-divider/>
      <div>{{this.order.showCity}} | {{this.order.showPlace}}</div>
      <van-divider/>
      <div>{{this.order.showTime}}</div>
      <van-divider/>
      <div>￥{{this.order.price}} X {{this.order.number}}张</div>
      <van-divider/>
      <div>
        <!--<div v-if="order.number==1">
          <van-field name="radio" label="观影人">
            <template #input>
              <van-radio-group v-model="person" direction="horizontal">
                <div v-for="(item,index) in identity" :key="index">
                  <van-radio :name="item.number">{{item.name}}</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
        </div>-->
        <van-field name="checkboxGroup" label="观影人：">
          <template #input>
            <van-checkbox-group v-model="persons" :max="maxPerson" direction="horizontal">
              <div v-for="(item,index) in identity" :key="index">
                <van-checkbox :name="item.number" shape="square">{{item.name}}</van-checkbox>
              </div>
            </van-checkbox-group>
          </template>
        </van-field>
      </div>
      <van-divider/>
    </div>

    <van-goods-action>
      <div class="price-class">￥{{this.order.amount}}</div>
      <div class="btn-class">
        <van-button round type="danger" size="large" @click="submit">提交订单</van-button>
      </div>
    </van-goods-action>

  </div>
</template>

<script>
  import orderApi from '@/api/order'
  import userApi from '@/api/user'
  import cookie from 'js-cookie'
  import {Dialog} from 'vant';

  export default {
    data() {
      return {
        order: {
          ticketId: '', //ticketid
          seatType: '', //座位类型
          number: 1, //购票数量
          amount: 0, //订单金额
          showTime: '',
          showCity: '',
          showPlace: '',
          price: 0,
          token: '',
        },
        userInfo: {},
        toPay: {},
        lockVo: {},
        identity: [],
        persons: [],
        person: '',
        maxPerson: 1,
        isPass: false, //检验
      }
    },
    created() {
      this.orderInit()
      this.getOrderToken()
      this.getIdentityByUser()
    },
    methods: {
      getOrderToken() { //获取订单token
        const json = cookie.get("userInfo")
        if (json) {
          this.userInfo = JSON.parse(json)
          orderApi.getOrderToken(this.userInfo.id).then(response => {
            if (response.data.success) {
              this.order.token = response.data.data.token
              this.order.userId = this.userInfo.id
              console.log("订单唯一Token：" + this.order.token);
            }
          })
        }
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      orderInit() { //页面数据初始化
        this.order.ticketId = this.$route.query.id
        this.order.seatType = this.$route.query.type
        this.order.number = this.$route.query.number
        this.order.amount = this.$route.query.amount
        this.order.showName = this.$route.query.showName
        this.order.showCity = this.$route.query.showCity
        this.order.showTime = this.$route.query.showTime
        this.order.showPlace = this.$route.query.showPlace
        this.order.price = this.$route.query.price
        if (this.order.number == 2) {
          this.maxPerson = 2
        }
      },
      submit() { //提交订单,先校验有没有重复购买
        //this.viewerCheck()
        console.log(this.persons.length);
        if (this.maxPerson != this.persons.length) {
          Dialog.alert({
            message: '人数不正确',
          }).then(() => {
            // on close
          });
        } else {
          let check = {};
          check.ticketId = this.order.ticketId
          check.number = this.persons

          userApi.checkIdentity(check).then(response => {
            if (response.data.success) {
              //检验通过
              console.log("检验通过");

              orderApi.submitOrder(this.order).then(response => {
                if (response.data.success) { //锁定库存成功，开始支付
                  //锁库存，加到map中
                  this.addTicketSell()

                  this.toPay = response.data.data.response.order
                  this.lockVo.id = response.data.data.response.order.ticketId
                  this.lockVo.orderId = response.data.data.response.order.id
                  this.lockVo.number = this.order.number

                  orderApi.alipay(this.toPay).then(response => {
                    if (response.data.code == 200) {
                      //支付成功，更新订单
                      this.completeOrder(this.lockVo)
                      let routeData = this.$router.resolve({path: '/Alipay', query: {htmls: response.data.data.body}});
                      window.open(routeData.href, '_self');
                    }
                  })
                }
              })
             // this.isPass = true;
            }else {
              Dialog.alert({
                message: '不能重复购票！',
              }).then(() => {
                // on close
              });
            }
          })
        }

       /* console.log(this.isPass);
        if (this.isPass == false) {
          //不通过
          Dialog.alert({
            message: '不能重复购票！',
          }).then(() => {
            // on close
          });
        } else { //下单

        }*/
      },
      addTicketSell() { //添加购票记录
        let check = {};
        check.ticketId = this.order.ticketId
        check.number = this.persons
        userApi.addTicketSell(check).then(response => {
          if (response.data.success) {
            console.log("添加购票记录成功");
          }
        })
      },
      viewerCheck() { //校验观影人是否符合条件
        console.log(this.persons.length);
        if (this.maxPerson != this.persons.length) {
          Dialog.alert({
            message: '人数不正确',
          }).then(() => {
            // on close
          });
        } else {
          let check = {};
          check.ticketId = this.order.ticketId
          check.number = this.persons
          userApi.checkIdentity(check).then(response => {
            if (response.data.success) {
              //检验通过
              console.log("检验通过");
              this.isPass = true;
            }
          })
        }
      },
      completeOrder(toPay) { //支付成功了，更新订单以及库存
        orderApi.paySuccess(toPay).then(response => {
          if (response.data.success) {
            console.log("订单更新成功");
          }
        })
      },
      getIdentityByUser() { //获取观影人
        const json = cookie.get("userInfo")
        if (json) {
          this.userInfo = JSON.parse(json)
          userApi.getIdentityByUser(this.userInfo.id).then(response => {
            if (response.data.success) {
              this.identity = response.data.data.identity
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .show-info {
    margin: 0.6rem;
    font-size: 1.2rem;
    background-color: #fff;
  }

  .btn-class {
    width: 100%;
  }

  .price-class {
    padding: 60px;
    font-size: 20px;
    color: red;
    font-weight: bold;
    font-family: SansSerif;
  }
</style>
