<template>
  <div>
    <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="show-info">
      <van-divider />
      <div >订单号：{{this.order.orderSn}}</div>
      <van-divider />
      <div >演出名：{{this.order.showName}}</div>
      <van-divider />
      <div >演出时间：{{this.order.showTime}}</div>
      <van-divider />
      <div>座位类型：{{this.order.seatType}}</div>
      <van-divider />
      <div >订单总金额：{{this.order.orderAmount}}</div>
      <van-divider />
      <div >订单创建时间：{{this.order.createTime}}</div>
      <van-divider />
      <div>订单状态：{{this.order.status}}</div>
    </div>
    <div class="btn">
      <van-button plain hairline type="info" :disabled="isRefund" @click="ticketRefund">退票</van-button>
      <van-button plain hairline type="danger" @click="deleteOrder">删除订单</van-button>
    </div>
  </div>
</template>

<script>
  import orderApi from "../api/order";
  import { Dialog } from 'vant';
  import { Toast } from 'vant';

  export default {
    name: "OrderInfo",
    data(){
      return{
        order:{},
        isRefund:false,
      }
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        //从路径取得id
        const id = this.$route.params.id
        this.getOrderById(id)
      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      getOrderById(id){
        orderApi.getOrderById(id).then(response=>{
          if(response.data.success){
            this.order=response.data.data.order
            if(this.order.orderStatus==0){
              this.order.status='待支付'
            }else if(this.order.orderStatus==1){
              this.order.status='已支付'
            }else if(this.order.orderStatus==2){
              this.order.status='退票中'
              this.isRefund=true
            }else if(this.order.orderStatus==3){
              this.order.status='已退票'
              this.isRefund=true
            }
          }
        })
      },
      ticketRefund(){ //退票
        Dialog.confirm({
          title: '警告',
          message: '是否申请退票',
        })
          .then(() => {
            // on confirm
            orderApi.orderReturn(this.order.id).then(reponse=>{
              Toast("退票申请已提交，等待管理员审核")
              this.$router.go(0)
            })
          })
          .catch(() => {
            // on cancel
          });
      },
      deleteOrder(){ //删除订单
        Dialog.confirm({
          title: '警告',
          message: '是否删除订单',
        })
          .then(() => {
            // on confirm
            orderApi.deleteOrder(this.order.id).then(reponse=>{
              Toast("订单记录已删除")
              this.$router.go(-1)
            })
          })
          .catch(() => {
            // on cancel
          });
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
  .order-item{
    float:left;
  }
  .show-intro{
    padding: 20px 20px;
    padding-bottom: 30px;
  }
  .btn{
    position: fixed;
    padding-left: 30%;
    bottom: 0;
  }
</style>
