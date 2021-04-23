<template>
  <div>
    <van-nav-bar
        title="观影人"
        left-text="返回"
        right-text="新增"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
    <div class="me-container" v-for="(item,index) in identities" :key="index">
      <div class="me-item">
        <div class="me-text">{{item.name}}</div>
        <div class="me-text">{{item.number}}</div>
        <van-button plain hairline type="danger" @click="deleteIdentity(item.id)">删除</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import cookie from 'js-cookie'
  import userApi from '../api/user'
  import { Dialog } from 'vant';
  import { Toast } from 'vant';
  export default {
    name: "UserIdentity",
    data(){
      return{
        identities:[],
        userInfo:{},
      }
    },
    created() {
      const json = cookie.get("userInfo")
      if (json) {
        this.userInfo = JSON.parse(json)
        this.getIdentityByUser(this.userInfo.id)
      }
    },
    methods:{
      onClickLeft(){
        this.$router.replace('/Person')
      },
      onClickRight(){
        if(this.identities.length>=2){
          Toast("观影人已达上限")
        }else{
          this.$router.replace('/IdentityAdd')
        }
      },
      getIdentityByUser(id){
        userApi.getIdentityByUser(id).then(response=>{
          if(response.data.success){
            this.identities=response.data.data.identity
          }
        })
      },
      deleteIdentity(id){
        Dialog.confirm({
          title: '警告',
          message: '是否删除观影人信息',
        })
          .then(() => {
            // on confirm
            userApi.deleteIdentity(id).then(response=>{
              if(response.data.success){
                Toast("删除成功")
                this.$router.go(0)
              }
            })
          })
          .catch(() => {
            // on cancel
          });
      }

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
    font-size: 18px;
    padding: 20px 20px;
    border-bottom: solid 1px rgba(143, 143, 143, 0.2);
  }
  .me-text{
    padding: 0px 10px;
  }

</style>
