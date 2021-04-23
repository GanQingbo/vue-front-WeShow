<template>
  <div>
    <van-nav-bar
        title="个人信息更新"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
          v-model="userInfo.nickname"
          name="昵称"
          label="昵称"
          placeholder="新的昵称"
      />
      <van-field name="uploader" label="更换头像">
        <template #input>
          <van-uploader :after-read="afterRead"  />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  //const axios = require('axios');
  import cookie from 'js-cookie'
  import userApi from '../api/user'
  import authApi from '../api/auth'
  import smsApi from '../api/sms'
  import Vue from 'vue';
  import { Toast } from 'vant';
  import axios from 'axios'

  export default {
    data(){
      return{
        userInfo:{},
        postData:[],
      }
    },
    created(){
      const json = cookie.get("userInfo")
      if (json) {
        this.userInfo = JSON.parse(json)
      }
    },
    methods:{
      onClickLeft(){
        this.$router.replace('/UserInfo')
      },
      afterRead(file){
        //上传到oss返回地址保存到header中
        console.log(file);
        this.postData.push(file)
        let formData = new FormData();
        formData.append("upImgs", file.file);
       /* axios.post("http://localhost:9001/other/oss/uploadPoster",formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response=>{
          if(response.data.success){
            this.userInfo.header=response.data.data.url
          }
        })*/
/*        const instance=axios.create({
          withCredentials:true
        })*/
        axios.post("http://localhost:9001/other/oss/uploadPoster",formData).then(response=>{
          if(response.data.success){
            this.userInfo.header=response.data.data.url
            console.log("后端返回的url是："+this.userInfo.header);
          }
        })
      },
      onSubmit(){
        userApi.updateUserInfo(this.userInfo).then(response=>{
          if(response.data.success){
            Toast("信息已更新")
            //更新本地token
            authApi.getUserInfo().then(response => { //根据toekn获取用户信息
              this.userInfo = response.data.data.user
              cookie.set('userInfo', this.userInfo, {domain: 'localhost'})
            })
            this.$router.replace('/UserInfo')
          }
        })
      },

    },
  }
</script>

<style scoped>

</style>
