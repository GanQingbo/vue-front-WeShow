import request from '@/utils/request'

export default {
  getShowListPage(page, size, searchObj) {
    return request({
      url: '/show/show/getShowByPage/' + page + '/' + size, //拼接，两种写法
      method: 'post',
      data: searchObj
    })
  },
  getShowRecommend(){
    return request({
      url: '/show/recommend/getShowRecommend',
      method: 'get',
    })
  },
  getHotShow(){
    return request({
      url: '/show/recommend/topHot',
      method: 'get',
    })
  },
  getShowListByQuery(searchObj){
    return request({
      url:'/show/show/getAllShowByQuery',
      method:'post',
      data: searchObj
    })
  },
  getShowInfoById(id){
    return request({
      url: '/show/show/getShowById/' + id ,
      method: 'get',
    })
  },
  getShowByUserId(id){
    return request({
      url: '/show/show/getShowsByUser/' + id ,
      method: 'get',
    })
  }
}
