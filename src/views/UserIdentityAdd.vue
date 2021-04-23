<template>
  <div>
    <van-nav-bar
        title="新增观影人"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
          v-model="identity.name"
          name="姓名"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
          v-model="identity.number"
          name="身份证"
          label="身份证"
          placeholder="身份证"
          maxlength="18"
          :rules="[{ required: true, message: '请填写身份证号码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import userApi from '../api/user'
  import cookie from 'js-cookie'
  import Vue from 'vue';
  import { Toast } from 'vant';
  export default {
    name: "UserIdentityAdd",
    data(){
      return{
        identity:{},
        userInfo:{},
      }
    },
    created() {
      const json = cookie.get("userInfo")
      if (json) {
        this.userInfo = JSON.parse(json)
        this.identity.userId=this.userInfo.id
      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      onSubmit(){
        if(this.identity.name!='' && this.identity.number!=''){
          userApi.createIdentity(this.identity).then(response=>{
            if(response.data.success){
              Toast("添加观影人成功")
              this.$router.replace('/UserIdentity')
            }
          })
        }else {
          Toast("请填写完整信息")
        }
      },

    }
  }
</script>

<style scoped>

</style>
