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
  }
}
