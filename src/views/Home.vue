<template>
  <div class="home">
    <van-row>
        <van-col span="2">
          <van-icon name="location-o" size="1.8rem"/>
        </van-col>
      <van-col span="22">
        <van-search
            v-model="search"
            shape="round"
            input-align="center"
            placeholder="演出搜索"
        />
      </van-col>
    </van-row>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

  </div>
</template>

<script>
import show from '@/api/test'

export default {

  data(){
    return{
      page:1,
      size: 10,  //每页记录数
      searchObj: {},
      search:'',
      areaList:{},
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(page = 1) { //默认第一页
      this.page = page
      show.getShowListPage(this.page, this.size, this.searchObj).then(response => {
        //请求成功,response是得到接口返回的数据
          if (response.success === true) {
            console.log(response.data);
          }
          //this.loading = false
          console.log(response);
        })
        .catch(error => { //请求失败
          console.log(error)
        })
    },
  }
}
</script>
