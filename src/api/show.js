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
  },
  getUserLike(id){
    return request({
      url: '/show/show/getUserLikes/' + id ,
      method: 'get',
    })
  },
  userAddLike(userShow){
    return request({
      url:'/show/show/userAddLike',
      method:'post',
      data: userShow
    })
  },
  userReduceLike(userShow){
    return request({
      url:'/show/show/userReduceLike',
      method:'post',
      data: userShow
    })
  },
  userIsLike(userShow){
    return request({
      url:'/show/show/userIsLike',
      method:'post',
      data: userShow
    })
  },
  createComment(comment){
    return request({
      url:'/show/comment/createComment',
      method:'post',
      data: comment
    })
  },
  getComment(id){
    return request({
      url:'/show/comment/getCommentByShow/'+id,
      method:'get',
    })
  },
  getUserComments(id){
    return request({
      url:'/show/comment/getCommentByUser/'+id,
      method:'get',
    })
  },
  deleteComment(id) {
    return request({
      url:'/show/comment/deleteComment/'+id,
      method:'delete',
    })
  },
  getShowByKey(key){
    return request({
      url:'/show/show/getShowByKey/'+ key,
      method:'get',
    })
  }
}
