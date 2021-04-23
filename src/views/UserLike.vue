<template>
  <div>
    <van-nav-bar
        title="我的收藏"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div v-for="(show,index) in showList" :key="index" @click="showInfo(show.id)">
      <van-card
          :price="show.seatPrice"
          :desc="show.showPerformer"
          :title="show.showName"
          :thumb="show.showPoster"
          lazy-load
      />
    </div>
  </div>
</template>

<script>
  import showApi from '@/api/show'
  import cookie from 'js-cookie'
  export default {
    name: "UserLike",
    data(){
      return{
        userInfo:'',
        showList:[],
      }
    },
    created() {
      const json = cookie.get("userInfo")
      if (json) {
        this.userInfo = JSON.parse(json)
        this.getUserLike(this.userInfo.id)
      }
    },
    methods:{
      getUserLike(id){
        showApi.getUserLike(id).then(response=>{
          if(response.data.success){
            this.showList=response.data.data.show
          }
        })
      },
      onClickLeft(){
        this.$router.replace('/Person')
      },
      showInfo(id){
        this.$router.push({path: '/ShowInfo/'+id})
      }
    }
  }
</script>

<style scoped>

</style>
