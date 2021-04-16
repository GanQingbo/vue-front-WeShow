<template>
  <div>
    <van-nav-bar
        title="请登录"
        left-text="返回"
        right-text="注册"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />

    <van-form @submit="login" class="login-form">
      <van-field v-model="user.username" name="手机号码" label="用户名/手机号码" placeholder="手机号码"
                 :rules="[{ required: true, message: '请填写用户名或手机号码' }]">
      </van-field>
      <van-field v-model="user.password" type="password" name="密码" label="密码" placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' }]">
      </van-field>
      <div style="margin: 20px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
        <br/>
        <span class="pass-tip" @click="$router.push('/ResetPassword')">点击找回密码</span>
      </div>
    </van-form>

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
  import authApi from '@/api/auth'
  import Toast from "vant/lib/toast"

  export default {
    data() {
      return {
        active: 3,
        user: {
          username: '',
          password: '',
        },
        userInfo: {},
      }
    },
    created() {
    },
    methods: {
      login() { //登录
        if (this.isEmpty(this.user.username)) {
          Toast({message: '账号不能为空', className: 'message-tips'});
        } else if (this.isEmpty(this.user.password)) {
          Toast({message: '密码不能为空', className: 'message-tips'});
        } else {
          authApi.login(this.user).then(response => {
            if (response.data.success === true) {
              Toast({message: '登录成功', className: 'message-tips'})
              cookie.set('token', response.data.data.token, {domain: 'localhost'}) //token存在cookie中
              authApi.getUserInfo().then(response => { //根据toekn获取用户信息
                this.userInfo = response.data.data.user
                cookie.set('userInfo', this.userInfo, {domain: 'localhost'})
              })
              this.$router.replace('/Person')
            } else {
              Toast({message: '登录失败', className: 'message-tips'})
            }
          })
        }
      },
      onClickLeft() { //返回
        this.$router.go(-1)
      },
      onClickRight() { //跳往注册
        this.$router.replace('/Register')
      },
      isEmpty(str) {
        return str.replace(/\s*/g, "") == '' ? true : false
      },
    }
  }
</script>

<style lang='less'>

</style>
