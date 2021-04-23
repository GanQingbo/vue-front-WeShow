<template>
  <div>
    <van-nav-bar title="票夹"/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"/>
    <div class="cartItem" v-for="(item,index) in showList" :key="index" @click="showInfo(item.id)">
      <div class="title">{{item.showName}}</div>
      <div>{{item.showCity}}|{{item.showPlace}}</div>
      <div>{{item.showTime}}</div>
      <van-divider />
    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="hot-o" to="/">精选</van-tabbar-item>
      <van-tabbar-item icon="search" to="/AllShows">全部</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/Ticket">票夹</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/Person">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import Vue from 'vue';
  import showApi from '@/api/show'
  import cookie from 'js-cookie'
  import {Toast} from 'vant'
  import { PullRefresh } from 'vant';

  Vue.use(PullRefresh);
  Vue.use(Toast)
  export default {
    data() {
      return {
        active: 2,
        showList: [],
        userInfo: {},
        isLoading:false,
      }
    },
    created() {
      var json = cookie.get("userInfo")
      if (json) {
        this.userInfo = JSON.parse(json)
      }
      this.getShowByUserId(this.userInfo.id)
    },
    methods: {
      getShowByUserId(id) {
        showApi.getShowByUserId(id).then(response => {
          if (response.data.success) {
            this.showList = response.data.data.show
          }
        })
      },
      showInfo(id) { //演出具体信息
        this.$router.push({path: '/ShowInfo/' + id})
      },
      onRefresh() {
        setTimeout(() => {
          Toast('刷新成功');
          this.isLoading = false;
        }, 1000);
      },
    }
  }
</script>

<style scoped>
  .showimg {
    width: 100px;
    height: 135px;
    object-fit: cover;
  }

  .cartItem {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    flex-direction: column;  /* 按照列column(垂直方向)排列*/
  }
</style>
