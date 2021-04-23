<template>
  <div>
    <van-nav-bar
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div v-for="(order,index) in orderList" :key="index" @click="OrderInfo(order.id)">
      <van-card
          :price="order.orderAmount"
          :desc="order.createTime"
          :title="order.showName"
          :thumb="order.showPoster"
      >
        <template #footer>
          <van-button size="mini" disabled>{{order.isShow}}</van-button>
          <van-button size="mini" disabled>{{order.status}}</van-button>
        </template>
      </van-card>
    </div>

  </div>
</template>

<script>
  import orderApi from "../api/order";
  import cookie from "js-cookie"

  export default {
    name: "OrderByUser",
    data(){
      return{
        orderList:[],
        userInfo:{},
      }
    },
    created(){
      const json = cookie.get("userInfo")
      if (json) {
        this.userInfo = JSON.parse(json)
        this.getOrderByUser(this.userInfo.id)
      }

    },
    methods:{
      onClickLeft(){
        //this.$router.go(-1)
        this.$router.replace('/Person')
      },
      OrderInfo(id){
        this.$router.push({path: '/OrderInfo/'+id})
      },
      getOrderByUser(id){ //获取订单信息
        orderApi.getOrderByUser(id).then(response=>{
          if(response.data.success){
            this.orderList=response.data.data.order
            for(let i=0;i<this.orderList.length;i++){
              if(this.orderList[i].showStatus==0){
                this.orderList[i].isShow='未上映'
              }else {
                this.orderList[i].isShow='已上映'
              }
              if(this.orderList[i].orderStatus==0){
                this.orderList[i].status='待支付'
              }else if(this.orderList[i].orderStatus==1){
                this.orderList[i].status='已支付'
              }else if(this.orderList[i].orderStatus==2){
                this.orderList[i].status='退票中'
              }else if(this.orderList[i].orderStatus==3){
                this.orderList[i].status='已退票'
              }
            }
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
