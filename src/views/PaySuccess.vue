<template>
  <div>
    <div>支付成功</div>
    <div>{{count}}秒后跳转到票夹</div>
  </div>
</template>

<script>
  import cookie from 'js-cookie'
  import orderApi from '@/api/order'
  export default {
    name: "PaySuccess",
    data(){
      return{
        order:{},
        count:'',
      }
    },
    created(){
      if(cookie.get("order")!=null && cookie.get("order")!=""){
        //支付成功了，更新订单以及库存
        this.order=cookie.get("order")
        this.completeOrder(this.order)
      }
      this.goTicket()
    },
    methods:{
      goTicket(){
        const TIME_COUNT = 2
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
              this.$router.push('/Ticket')
            }
          }, 1000)}
      },
      completeOrder(){
        if(cookie.get("order")!=null && cookie.get("order")!=""){
          //支付成功了，更新订单以及库存
          this.order=cookie.get("order")
        }
        orderApi.paySuccess(this.order).then(response=>{
          if(response.data.success){
            console.log("订单更新成功");
            cookie.set("order","", {domain: 'localhost'}) //清空cookie信息
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
