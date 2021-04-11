<template>
  <div id="home" class="home">
    <van-search
      v-model="search"
      shape="round"
      input-align="center"
      placeholder="演出搜索"
    />
    <van-swipe :autoplay="3000" width="400" height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swiperImg" v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item icon="video-o" text="演唱会" />
      <van-grid-item icon="video-o" text="话剧歌剧" />
      <van-grid-item icon="video-o" text="曲苑杂坛" />
      <van-grid-item icon="video-o" text="舞蹈芭蕾" />
      <van-grid-item icon="video-o" text="音乐会" />
      <van-grid-item icon="video-o" text="休闲展览" />
      <van-grid-item icon="video-o" text="体育比赛" />
      <van-grid-item icon="video-o" text="其它类型" />
    </van-grid>

    <van-panel title="月度精选">
      <van-grid :column-num="2">
      </van-grid>
    </van-panel>
    <van-panel title="为您推荐">
      <div>内容</div>
    </van-panel>
  </div>
</template>

<script>
  import showApi from '@/api/show'
  import Vue from 'vue';
  import { Lazyload } from 'vant';
  Vue.use(Lazyload);

  export default {
    data() {
      return {
        page: 1,
        size: 10,  //每页记录数
        searchObj: {},
        search: '',
        areaList: {},
        list: [],
        images:[]
      }
    },
    computed: {
      //计算属性
    },
    created() {
      this.getShowRecommend()
    },
    methods: {
      getList(page = 1) { //默认第一页
        this.page = page
        showApi.getShowListPage(this.page, this.size, this.searchObj).then(response => {
          //请求成功,response是得到接口返回的数据
          if (response.success === true) {
            console.log(response.data);
          }
          //this.loading = false
          //console.log(response);
        })
          .catch(error => { //请求失败
            console.log(error)
          })
      },
      getShowRecommend() {
        showApi.getShowRecommend().then(response => {
          if (response.data.success === true) {
            //response中data要自己取出来
            this.list = response.data.data.show
            //console.log(this.list);
            if(this.list!=null){
              console.log(this.list);
              for (var i = 0; i < this.list.length; i++) {
                if(this.list[i].showPoster){
                  this.images.push(this.list[i].showPoster)
                }
              }
            }
          }
        })
      }
    }
  }
</script>
<style lang="less">
  #home{
    .swiperImg{
      width: 400px;
      height: 200px;
    }
  }
</style>
