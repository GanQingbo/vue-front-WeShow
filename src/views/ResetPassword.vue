<template>
  <div class="register">
    <van-nav-bar
        title="密码重置"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-form class="login-form">
      <van-field v-model="number" name="输入手机号"   label="手机号"
                 :rules="[{ required: true, message: '请输入手机号' }]">
      </van-field>
      <van-field v-model="password1" type="password" name="输入密码"   label="输入密码"
                 :rules="[{ required: true, message: '请填写密码' }]">
      </van-field>
      <van-field v-model="password2" type="password" name="确认密码" label="确认密码"
                 :rules="[{ required: true, message: '请填写密码' }]">
      </van-field>
      <van-field v-model="code" center clearable  placeholder="请输入短信验证码" label="验证码">
        <template #button>
          <van-button size="small" type="primary" :disabled="num!=60" @click="getCode">
            <span v-if="num==60">发送验证码</span>
            <span v-if="num!=60">重新发送{{num}}s</span>
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" @click="register">
          重置
        </van-button>
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
  import Toast from "vant/lib/toast";

  export default {
    data(){
      return{
        active:3,
        number:'',
        password1:'',
        password2:'',
        code:'',
        num:60,
      }
    },
    created() {
    },
    methods:{
      countDown(){ //验证码倒计时
        let time = setInterval(() => {
          if (this.num > 0) {
            this.num--
          } else {
            clearInterval(time)
            this.num = 60
          }
        }, 1000);
      },
      getCode(){ //获取验证码
        if (this.isEmpty(this.number)) { Toast({message: '手机号不能为空', className: 'message-tips'}); }
        else if (this.isEmpty(this.password1)) {Toast({message: '密码不能为空', className: 'message-tips'});
        } else if (this.password1 != this.password2) {Toast({message: '两次输入的密码不正确，请重新确认', className: 'message-tips'});
        } else {
          Toast({message: '验证码发送成功请注意查收', className: 'message-tips'});
          //this.code = res.msg
          this.countDown();
          //Toast({message: '演示期间，暂停注册', className: 'message-tips'});
          /*request({
              url: "/app/user/check/email",
              method: 'get',
              params: {
                  userEmail: this.userEmail
              }
          }).then(res => {
              if (res.code == 200) {
                  Toast({message: '验证码发送成功请注意查收', className: 'message-tips'});
                  this.yzm = res.msg
                  this.yzmNum();
              } else if (res.code == 400) {
                  Toast({message: res.msg, className: 'message-tips'});
              }
          }).catch(err => {
              console.log(err)
          })*/
        }
      },
      register(){ //注册

      },
      onClickLeft(){ //返回
        this.$router.replace('/Person')
      },
      isEmpty(str){
        return str.replace(/\s*/g, "")==''?true:false
      },

    }
  }
</script>

<style scoped>
  .register {
    position: absolute;
    background: #f3f2f2;
    width: 100%;
    height: 100%;
  }
  .login-form van-field {
    height: 50px;
  }

</style>
