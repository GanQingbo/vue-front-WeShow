<template>
  <div>
    <div class="user-info">
      <div class="userWrap">
        <div class="user-img">
          <div v-if="!userInfo.id">
            <van-image class="head-img" :src="this.defaultHead" @click="loginClick"/>
          </div>
          <div v-else>
            <van-image class="head-img" :src="this.userInfo.header" @click="infoManage"/>
          </div>
            <div class="userName-wrap">
              <div v-if="!userInfo.id">点击头像登录</div>
              <div v-else>{{this.userInfo.nickname}}</div>
            </div>
        </div>
<!--        <div v-show="(userInfo.id!=null)" class="iconfont icon-logout logout-text" @click="logout">注销</div>-->
      </div>
    </div>

    <div class="me-container">
      <div class="me-item">
        <van-icon name="like-o"/>
        <div class="me-text">我的收藏</div>
      </div>
      <div class="me-item">
        <van-icon name="shopping-cart-o"/>
        <div class="me-text">我的订单</div>
      </div>
      <div class="me-item">
        <van-icon name="good-job-o"/>
        <div class="me-text">我的评价</div>
      </div>
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
  import cookie from 'js-cookie'

  export default {
    data() {
      return {
        active: 3,
        defaultHead: "https://weshow-bucket.oss-cn-guangzhou.aliyuncs.com/avatar/userdefault.jpg",
        userInfo: {},

      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      loginClick() {
        this.$router.replace('/Login')
      },
      infoManage(){
        this.$router.replace('/UserInfo')
      },
      getUserInfo() { //从token获取用户数据并解析成json
        var json = cookie.get("userInfo")
        if (json) {
          this.userInfo = JSON.parse(json)
        }
      },
    }
  }
</script>

<style scoped>
  .me-container {
  }

  .me-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;
    padding: 20px 20px;
    border-bottom: solid 1px rgba(143, 143, 143, 0.2);
  }

  .me-text{
    padding: 0px 20px;
  }

  img {
    width: 32px;
    margin-right: 5px;
  }

  .user-info {
    width: 100%;
    margin-top: 25%;
    z-index: 90;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: white;
  }

  .userWrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .user-img {
    display: flex;
    flex-direction: row;
  }

  .head-img {
    position: relative;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border-color: white;
    border-width: 10px;
    border-style: solid;
    left: 20px;
    top: -20px;
  }

  .userName-wrap {
    font-size: 24px;
    line-height: 25px;
    /*font-weight: bold;*/
    margin-bottom: 10px;
    padding: 0px 20px;
  }

  .user-detail {
    margin-left: 20px;
  }

  .logout-text {
    font-size: 15px;
    line-height: 48px;
    margin-right: 20px;
  }
</style>
