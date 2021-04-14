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
    </div>
    <van-divider/>
    票档
    <van-radio-group v-model="this.order.seatType">
      <div v-for="(item,index) in ticket" :key="index">
        <van-radio :name="item.seatType">{{item.seatType}} ￥{{item.seatPrice}}</van-radio>
      </div>
    </van-radio-group>

    <van-divider/>
    <div>
      <div class="number">每人限购2张</div>
      <van-stepper v-model="number" theme="round" button-size="22" disable-input max="2"/>
    </div>
    <van-goods-action>
      <div class="price-class">￥50</div>
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
        totalPrice: '',
        number: 1,
        order:{},
      }
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        //从路径取得id
        const id = this.$route.params.id
        this.getShowInfo(id)
        this.getTicketInfo(id)
        this.order.seatType=this.ticket[0].seatType
      }
    },
    methods: {
      getShowInfo(id) {
        showApi.getShowInfoById(id).then(response => {
          if (response.data.success) {
            this.show = response.data.data.show
            console.log(response);
          }
        })
      },
      getTicketInfo(id) {
        ticketApi.getTicketByShowId(id).then(response => {
          if (response.data.success) {
            this.ticket = response.data.data
            console.log(this.ticket);
          }
        })
      },
      onClickLeft(id) {
        this.$router.push({path: '/ShowInfo/' + id})
      }
    }
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
</style>
