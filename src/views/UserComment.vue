<template>
  <div>
    <van-nav-bar
        title="评论列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="cartItem" v-for="(item,index) in comments" :key="index">
      <div class="show-img">
        <van-image width="50" height="68" lazy-load :src="item.showPoster"/>
      </div>
      <div class="co">
        <div class="title">
          <div>{{item.createTime}}</div>
        </div>
        <div >
          <div>{{item.comments}}</div>
        </div>
      </div>
      <div>
        <van-button  hairline type="danger" round  size="small" @click="deleteComment(item.id)">删除</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import showApi from '../api/show'
  import cookie from 'js-cookie'
  import Vue from 'vue';
  import { Toast } from 'vant';
  import { Dialog } from 'vant';

  export default {
    name: "UserComment",
    data(){
      return{
        comments:[],
      }
    },
    created() {
      const json = cookie.get("userInfo")
      if (json) {
        this.userInfo = JSON.parse(json)
        this.getComments(this.userInfo.id)
      }
    },
    methods:{
      getComments(id){
        showApi.getUserComments(id).then(response=>{
          if(response.data.success){
            this.comments=response.data.data.comment
          }
        })
      },
      deleteComment(id){
        Dialog.confirm({
          title: '警告',
          message: '是否删除评论',
        })
          .then(() => {
            // on confirm
            showApi.deleteComment(id).then(response=>{
              if(response.data.success){
                Toast("删除评论成功")
                this.$router.go(0)
              }
            })
          })
          .catch(() => {
            // on cancel
          });
      },
      onClickLeft() {
        this.$router.go(-1)
      },
    }
  }
</script>

<style scoped>

</style>
