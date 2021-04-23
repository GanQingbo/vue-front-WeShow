<template>
  <div>
    <van-nav-bar
        :title="this.show.showName"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <div class="divclass">
      <van-image :src="this.show.showPoster" fit="contain" class="imgclass">
        <template v-slot:loading>
          <van-loading type="spinner" size="20"/>
        </template>
      </van-image>
    </div>

    <div class="show-info">
      <van-divider />
      <div class="show-title">{{this.show.showName}}</div>
      <van-divider />
      <div class="show-time">{{this.show.showTime}}</div>
      <van-divider />
      <div class="show-time">{{this.show.showCity}} | {{this.show.showPlace}}</div>
      <van-divider />
      <div class="show-time">{{this.show.showPerformer}}</div>
      <van-divider />
      <div>演出介绍</div>
    </div>
    <div class="show-intro">{{show.showIntro}}</div>
    <van-divider />
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="评论" @click="getShowComment(show.id)" color="#ee0a24"/>
      <div v-if="isLike==true">
        <van-goods-action-icon icon="like" text="取消收藏" @click="userReduceLike" color="#ff5000"/>
      </div>
      <div v-else>
        <van-goods-action-icon icon="like-o" text="收藏" @click="userAddLike" color="#ff5000"/>
      </div>

      <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="goTicketChoice(show.id)"
      />
    </van-goods-action>
  </div>
</template>

<script>
  import cookie from 'js-cookie'
  import showApi from '@/api/show'

  export default {
    data() {
      return {
        show: {},
        userShow:{
          showId:'',
          userId:'',
        },
        userInfo:'',
        isLike:false,

      }
    },
    created() {
      this.getUserShow()
    },
    methods: {
      getShowInfo(id) {
        showApi.getShowInfoById(id).then(response => {
          if (response.data.success) {
            this.show = response.data.data.show
            console.log(response);
          }
        })
      },
      onClickLeft() { //返回
        //this.$router.replace('/')
        this.$router.go(-1)
      },
      goTicketChoice(id) { //跳转到选票
        this.$router.push({path: '/TicketChoice/'+id})
      },
      userIsLike(userShow){
        showApi.userIsLike(userShow).then(response=>{
          if(response.data.success){
            this.isLike=response.data.data.isLike
            console.log("获取收藏状态成功");
          }
        })
      },
      userAddLike(){
        this.getUserShow()
        console.log(this.userShow);
        showApi.userAddLike(this.userShow).then(response=>{
          if(response.data.success){
            this.$router.go(0)
          }
        })
      },
      userReduceLike(){
        this.getUserShow()
        console.log(this.userShow);
        showApi.userReduceLike(this.userShow).then(response=>{
          if(response.data.success){
            this.$router.go(0)
          }
        })
      },
      getUserShow(){
        if (this.$route.params && this.$route.params.id) {
          //从路径取得id
          const id = this.$route.params.id
          this.getShowInfo(id)
          this.userShow.showId=id
          const json = cookie.get("userInfo")
          if (json) {
            this.userInfo = JSON.parse(json)
            this.userShow.userId=this.userInfo.id+''
            this.userIsLike(this.userShow)
          }
        }
      },
      getShowComment(id){
        this.$router.push({path: '/ShowComment/'+id})
      }
    }
  }
</script>

<style scoped>
  .divclass {
    width: 300px;
    text-align: center;
    margin:0 auto;
    padding-top: 25px;
  }

  .show-info {
    margin: 0.6rem;
    font-size: 1.2rem;
    background-color: #fff;
  }
  .show-intro{
    padding: 20px 20px;
    padding-bottom: 30px;
  }
</style>
