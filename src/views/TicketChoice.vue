<template>
  <div>
    <van-nav-bar
        :title="show.showName"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft(show.id)"
    />
    <div class="show-info">
      <div>{{show.showCity}} | {{show.showPlace}}</div>
      <van-divider/>
      <div>日期：{{this.show.showTime}}</div>
      <van-divider/>
      票档
    </div>
    <div v-for="(item,index) in ticketList" :class="active==index ? 'activeClass' : ''" :key="index">
      <div @click="change(index)">{{item.seatType}} ￥{{item.seatPrice}}</div>
    </div>

    <van-divider/>
    <div>
      <div class="number">每人限购2张</div>
      <van-stepper @change="numberChange" v-model="number" theme="round" button-size="24" disable-input max="2"/>
    </div>

    <van-goods-action>
      <div class="price-class">￥{{this.amount}}</div>
      <div class="btn-class">
        <div v-if="countdown!=0" >
          距离开售还有：<van-count-down millisecond :time="this.countdown" format="HH:mm:ss:SS" />
        </div>
        <div v-else-if="surplus==0">
          <van-button disabled round type="danger" size="large">售罄</van-button>
        </div>
        <div v-else-if="countdown==0 && surplus!=0">
          <van-button round type="danger" size="large" @click="submit">确定</van-button>
        </div>
      </div>
    </van-goods-action>
  </div>
</template>

<script>
  import showApi from '@/api/show'
  import ticketApi from '@/api/ticket'
  import Vue from 'vue';
  import { Toast } from 'vant';

  Vue.use(Toast);

  export default {
    data() {
      return {
        ticketList: [],
        ticket:{},
        show: {},
        price: 0,
        index:0,
        number:1,
        order: {
          ticketId:'', //ticketid
          seatType:'',
          price:0,
          number:1, //购票数量
          amount:0, //订单金额
          showName:'',
          showTime:'',
        },
        active: 0,
        countdown:0,
        surplus:0, //票数，为0要禁用按钮
      }
    },
    computed:{
      amount: function () { //计算总价格
        console.log("总金额："+this.price * this.number);
        return this.price * this.number
      }
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        //从路径取得id
        const id = this.$route.params.id
        this.getShowInfo(id)
        this.getTicketInfo(id)
        console.log(this.order);
      }
    },
    methods: {
      getShowInfo(id) {
        showApi.getShowInfoById(id).then(response => {
          if (response.data.success) {
            this.show = response.data.data.show
            this.order.showName=this.show.showName
            this.order.showTime=this.show.showTime
          }
        })
      },
      getTicketInfo(id) {
        ticketApi.getTicketByShowId(id).then(response => {
          if (response.data.success) {
            this.ticketList = response.data.data.ticket //获取售票list
            this.order.seatType = this.ticketList[0].seatType //初始化默认选中的票档
            this.order.ticketId=this.ticketList[0].id //初始化订单中的票号
            this.order.amount=this.ticketList[0].seatPrice //初始化订单价格
            this.price=this.ticketList[0].seatPrice //初始化价格为第一个
            this.getSellTime(this.ticketList[0].id) //获取卖票时间差
            this.getTicketSurplus(this.ticketList[0].id) //获取剩余票数
          }
        })
      },
      onClickLeft(id) {
        //this.$router.push({path: '/ShowInfo/' + id})
        this.$router.go(-1)
      },
      change(index) { //点击不同票档切换事件
        //把index值赋给active，点击改变样式
        this.active = index;
        this.price=this.ticketList[index].seatPrice
        this.order.ticketId=this.ticketList[index].id
        this.order.seatType=this.ticketList[index].seatType
        this.order.seatPrice=this.ticketList[index].seatPrice
        this.order.amount=this.amount
        this.getSellTime(this.ticketList[index].id)
        this.getTicketSurplus(this.ticketList[index].id)
      },
      getSellTime(id){ //获取倒计时时间，毫秒，id是ticket id
        ticketApi.getSellTimeDistance(id).then(response=>{
          if(response.data.success){
            this.countdown=response.data.data.time
          }
        })
      },
      getTicketSurplus(id){ //获取票数
        ticketApi.getTicketSurplus(id).then(response=>{
          if(response.data.success){
            this.surplus=response.data.data.surplus
          }
        })
      },
      numberChange(){
        console.log("Number:"+this.number);
      },
      submit(){ //确认键，先判断是否有余票，有再跳转到下一个页面
        var id=this.order.ticketId
        if(this.getTicketSurplus(id)<=0){
          Toast.fail('手速太慢啦，票已卖完');
        }else {
          this.order.amount=this.amount
          this.$router.push({
            path:'/OrderConfirm',
            query:{
              id:this.order.ticketId,
              type:this.order.seatType,
              price:this.price,
              number:this.number,
              amount:this.order.amount,
              showId:this.show.id,
              showCity:this.show.showCity,
              showPlace:this.show.showPlace,
              showName:this.show.showName,
              showTime:this.show.showTime,
            }
          })
        }
      }
    },
  }
</script>

<style scoped>
  .price-class {
    padding: 60px;
    font-size: 20px;
    color: red;
    font-weight: bold;
    font-family: SansSerif;
  }

  .show-info {
    margin: 0.6rem;
    font-size: 1.2rem;
    background-color: #fff;
  }

  .number {
    width: 200px;
    float: left;
  }

  .activeClass {
    color: #ca151e;
    border: 1px solid #ca151e;
    margin-left: 35%;
    margin-right: 35%;
  }

  .btn-class{
    width: 100%;
  }


</style>
