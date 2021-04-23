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
        <van-image width="50" height="68" lazy-load :src="item.header"/>
      </div>
      <div class="co">
        <div class="title">
          <div>{{item.nickname}}</div>
        </div>
        <div >
          <div>{{item.comments}}</div>
        </div>
      </div>
    </div>

    <div class="comment">
      <van-field
          v-model="comment.comments"
          center
          clearable
          label="评论"
          placeholder="分享你的喜悦"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendComment">发送评论</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
  import showApi from '../api/show'
  import cookie from 'js-cookie'
  import Vue from 'vue';
  import { Toast } from 'vant';

  Vue.use(Toast);

  export default {
    name: "ShowComment",
    data() {
      return {
        comments: [],
        userInfo: {},
        comment: {
          userId: '',
          showId: '',
          comments: ''
        }
      }
    },
    created() {
      this.getInfo()
      this.getShowComment(this.comment.showId)
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      getShowComment(id) {
        showApi.getComment(id).then(response => {
          if (response.data.success) {
            this.comments = response.data.data.comment
          }
        })
      },
      getInfo() {
        //获取uid
        const json = cookie.get("userInfo")
        if (json) {
          this.userInfo = JSON.parse(json)
          this.comment.userId = this.userInfo.id
        }
        if (this.$route.params && this.$route.params.id) {
          //从路径取得sid
          const id = this.$route.params.id
          this.comment.showId = id
        }
      },
      sendComment(){
        if(this.comment.comments==''){
          Toast('内容不能为空');
        }else{
         showApi.createComment(this.comment).then(response=>{
           if(response.data.success){
             Toast('评论成功');
             this.$router.go(0)
           }
         })
        }
      }
    }
  }
</script>

<style scoped>
  .show-img {
    width: 50px;
    height: 68px;
    object-fit: cover;
  }

  .cartItem {
    display: flex;
    align-items: center;
    padding: 20px 10px;
  }

  .co {
    flex-direction: column; /* 按照列column(垂直方向)排列*/
  }

  .title {
    display: flex;
    padding: 0px 10px;
    align-items: center;
    justify-content: center;
    color: darkgrey;
    font-size: 15px;
  }

  .comment {
    position: fixed;
    bottom: 0;
  }
</style>
