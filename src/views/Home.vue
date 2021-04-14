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
        <img class="swiperImg" v-lazy="image"/>
      </van-swipe-item>
    </van-swipe>
    <br/>
    <van-grid>
      <van-grid-item icon="video-o" text="演唱会"/>
      <van-grid-item icon="video-o" text="话剧歌剧"/>
      <van-grid-item icon="video-o" text="曲苑杂坛"/>
      <van-grid-item icon="video-o" text="舞蹈芭蕾"/>
      <van-grid-item icon="video-o" text="音乐会"/>
      <van-grid-item icon="video-o" text="休闲展览"/>
      <van-grid-item icon="video-o" text="体育比赛"/>
      <van-grid-item icon="video-o" text="其它类型"/>
    </van-grid>
    <van-panel title="热门演出推荐">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <div class="list">
          <div class="cartItem" v-for="(item,index) in hotList" :key="index">
            <div class="showimg">
              <van-image width="100" height="135" lazy-load :src="item.showPoster"/>
            </div>
            <div class="proBreif">
              <div class="title">{{item.showName}}</div>
            </div>
          </div>
        </div>
      </van-list>
    </van-panel>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="hot-o" to="/">精选</van-tabbar-item>
      <van-tabbar-item icon="search" to="/AllShows">全部</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/Ticket">票夹</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/Person">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  import showApi from '@/api/show'
  import Vue from 'vue';
  import {Lazyload} from 'vant';

  Vue.use(Lazyload);

  export default {
    data() {
      return {
        search: '',
        areaList: {},
        list: [],
        images: [],
        hotList: [],
        showList: [],
        loading: false,
        finished: false,
        active:0,

      }
    },
    computed: {
      //计算属性
    },
    created() {
      this.getShowRecommend()
    },
    methods: {
      getShowRecommend() {
        //加载推荐的数据
        showApi.getShowRecommend().then(response => {
          if (response.data.success === true) {
            //response中data要自己取出来
            this.list = response.data.data.show
            //console.log(this.list);
            if (this.list != null) {
              console.log(this.list);
              for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].showPoster) {
                  this.images.push(this.list[i].showPoster)
                }
              }
            }
          }
        })
        //加载排行榜数据
        showApi.getHotShow().then(response => {
          if (response.data.success === true) {
            this.showList = response.data.data.show
          } else {
            console.log("数据加载失败");
          }
        })
      },
      //热门演出
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.hotList.push(this.showList.shift())
            console.log(this.hotList)
          }
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.hotList.length >= 10) {
            this.finished = true;
          }
        }, 1000);
      },

    }
  }
</script>
<style lang="less">
  #home {
    .swiperImg {
      width: 400px;
      height: 540px;
    }
  }

  #buycart {
    .info {
      display: flex;
      justify-content: space-around;
      font-size: 12px;
      height: 24px;
      line-height: 24px;

      span {
        position: relative;
      }

      span::before {
        content: "";
        display: block;
        position: absolute;
        left: -10px;
        top: 8px;
        width: 4px;
        height: 4px;
        border-radius: 2px;
        border: 1px solid red;
      }
    }
  }

  .showimg {
    width: 100px;
    height: 135px;
    object-fit: cover;
  }

  .cartItem {
    display: flex;
    align-items: center;
    padding: 20px 10px;
  }

  .title {
    display: flex;
    padding: 0px 10px;
    align-items: center;
    justify-content: center;
  }
</style>
