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
    <div v-for="(item,index) in ticket" :class="active==index ? 'activeClass' : ''" :key="index">
      <div @click="change(index)">{{item.seatType}} ￥{{item.seatPrice}}</div>
    </div>

    <van-divider/>
    <div>
      <div class="number">每人限购2张</div>
      <van-stepper  v-model="number" theme="round" button-size="22" disable-input max="2"/>
    </div>
    <van-goods-action>
      <div class="price-class">￥ {{this.amount}}</div>
      <van-goods-action-button type="danger" text="确定"/>
    </van-goods-action>
  </div>
</template>

<script>
  import showApi from '@/api/show'
  import ticketApi from '@/api/ticket'

  export default {
    data() {
      return {
        ticket: [],
        show: {},
        price: 0,
        number: 1,
        order: {
          seatType: '',
        },
        active: 0,
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
      }
    },
    methods: {
      getShowInfo(id) {
        showApi.getShowInfoById(id).then(response => {
          if (response.data.success) {
            this.show = response.data.data.show
          }
        })
      },
      getTicketInfo(id) {
        ticketApi.getTicketByShowId(id).then(response => {
          if (response.data.success) {
            this.ticket = response.data.data.ticket
            this.order.seatType = this.ticket[0].seatType
            this.price=this.ticket[0].seatPrice
            console.log(this.ticket);
          }
        })
      },
      onClickLeft(id) {
        this.$router.push({path: '/ShowInfo/' + id})
      },
      change(index) {
        //把index值赋给active，点击改变样式
        this.active = index;
        this.price=this.ticket[index].seatPrice
        this.order.ticketId=this.ticket[index].id
        this.order.seatType=this.ticket[index].seatType
        this.order.seatPrice=this.ticket[index].seatPrice
        this.order.amount=this.amount
      },
      getSellTime(id){ //获取倒计时时间，毫秒
        ticketApi.getSellTimeDistance(id).then(response=>{
          if(response.data.success){
            this.countdown=response.data.data.time
          }
        })
      },

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
</style>
