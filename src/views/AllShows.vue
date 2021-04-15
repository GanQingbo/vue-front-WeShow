<template>
  <div>
    <van-search
        v-model="search"
        shape="round"
        input-align="center"
        placeholder="演出搜索"
    />
    <van-dropdown-menu active-color="#1989fa" >
      <van-dropdown-item v-model="searchObj.showType" :options="option1" @change="closed"/>
      <van-dropdown-item v-model="searchObj.showCity" :options="option2" @change="closed"/>
      <van-dropdown-item v-model="searchObj.showTime" :options="option3" @change="closed"/>
      <van-dropdown-item v-model="searchObj.showOrder" :options="option4" @change="closed"/>
    </van-dropdown-menu>

    <div v-for="(show,index) in list" :key="index" @click="showInfo(show.id)">
      <van-card
          :price="show.seatPrice"
          :desc="show.showPerformer"
          :title="show.showName"
          :thumb="show.showPoster"
          lazy-load
      />

    </div>

      <!--<div class="list">
        <div class="cartItem" v-for="(item,index) in list" :key="index">
          <div class="showimg">
            <van-image width="100" height="135" lazy-load :src="item.showPoster"/>
          </div>
          <div class="proBreif">
            <div class="title">{{item.showName}}</div>
          </div>
        </div>
      </div>-->

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
        search:'',
        active:1,
        loading: false,
        finished: false,
        list:[],
        searchObj:{
          showType:'全部演出',
          showCity:'全国',
          showTime:0,
          showOrder:0,
        },
        value1:'全部演出',
        value2:'全国',
        value3:0,
        value4:0,
        option1: [
          { text: '全部演出', value: '全部演出' },
          { text: '演唱会', value: '演唱会' },
          { text: '音乐会', value: '音乐会' },
          { text: '歌剧话剧', value: '歌剧话剧' },
          { text: '舞蹈芭蕾', value: '舞蹈芭蕾' },
          { text: '体育比赛', value: '体育比赛' },
          { text: '曲苑杂坛', value: '曲苑杂坛' },
          { text: '休闲展览', value: '休闲展览' },
        ],
        option2: [
          { text: '全国', value: '全国' },
          { text: '北京', value: '北京' },
          { text: '上海', value: '上海' },
          { text: '广州', value: '广州' },
          { text: '深圳', value: '深圳' },
          { text: '天津', value: '天津' },
          { text: '成都', value: '成都' },
          { text: '苏州', value: '苏州' },
          { text: '重庆', value: '重庆' },
          { text: '海口', value: '海口' },
          { text: '东莞', value: '东莞' },
          { text: '杭州', value: '杭州' },
          { text: '中山', value: '中山' },
          { text: '济南', value: '济南' },
          { text: '厦门', value: '厦门' },
        ],
        option3: [
          { text: '全部时间', value: 0 },
          { text: '一周内', value: 7 },
          { text: '一月内', value: 30 },
        ],
        option4: [
          { text: '默认排序', value: 0 },
          { text: '热度排序', value: 1 },
          { text: '价格排序', value: 2 },
        ],

      }
    },
    created() {
      this.closed()
    },
    methods:{
      closed(){
        showApi.getShowListByQuery(this.searchObj).then(response=>{
          if(response.data.success === true){
            this.list=response.data.data.show
            console.log(this.list);
          }else {
            this.list=[]
          }
        })
      },
      showInfo(id){ //演出具体信息
        this.$router.push({path: '/ShowInfo/'+id})
      }

    }
  }
</script>

<style scoped>
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
