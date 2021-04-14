<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="hot-o" to="/">精选</van-tabbar-item>
      <van-tabbar-item icon="search" to="/AllShows">全部</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/Ticket">票夹</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/Person">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active:2,
      }
    }
  }
</script>

<style scoped>

</style>
