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
  import cookie from 'js-cookie'

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
        lockVo:{},
      }
    },
    created() {
      this.orderInit()
      this.getOrderToken()
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
      },
      submit() { //提交订单
        orderApi.submitOrder(this.order).then(response => {
          if (response.data.success) { //锁定库存成功，开始支付
            this.toPay = response.data.data.response.order
            this.lockVo.id=response.data.data.response.order.ticketId
            this.lockVo.orderId=response.data.data.response.order.id
            this.lockVo.number=this.order.number
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
      },
      completeOrder(toPay){ //支付成功了，更新订单以及库存
        orderApi.paySuccess(toPay).then(response=>{
          if(response.data.success){
            console.log("订单更新成功");
          }
        })
      },
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
