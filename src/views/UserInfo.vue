<template>
  <div id="dataExplain">
    <van-nav-bar
        title="个人信息"
        left-text="返回"
        right-text="信息更新"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
    <div class="cellcss">
      <van-cell-group>
        <van-cell class="me-item" title="昵称" :value="this.userInfo.nickname"/>
        <van-cell class="me-item" title="用户名" :value="this.userInfo.username"/>
        <van-cell class="me-item" title="手机号码" :value="this.userInfo.mobile"/>
      </van-cell-group>
    </div>
    <van-button class="logoutbtn" plain hairline type="danger" @click="logout" >退出登录</van-button>
  </div>
</template>

<script>
  import cookie from 'js-cookie'

  export default {
    data() {
      return {
        userInfo: {},
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      onClickLeft() { //返回
        this.$router.replace('/Person')
      },
      onClickRight() { //修改个人信息
        this.$router.replace('/Person')
      },
      getUserInfo() {
        var json = cookie.get("userInfo")
        if (json) {
          this.userInfo = JSON.parse(json)
        }
      },
      logout() { //退出登录
        cookie.set('token', "", {domain: 'localhost'})
        cookie.set('userInfo', "", {domain: 'localhost'})
        //刷新页面
        window.location.href = "/Person"
      }
    }
  }
</script>

<style scoped>
  #dataExplain {
  }

  .logoutbtn {
    position: absolute;
    top: 90%;
    left: 40%;
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
</style>
