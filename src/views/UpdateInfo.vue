<template>
  <div>
    <van-nav-bar
        title="个人信息更新"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </div>
</template>

<script>
  export default {
    data(){
      return{}
    },
    methods:{
      onClickLeft(){
        this.$router.replace('/UserInfo')
      },
    }
  }
</script>

<style scoped>

</style>
