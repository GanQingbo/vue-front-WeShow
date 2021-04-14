import request from '@/utils/request'
import cookie from 'js-cookie'
export default {
  register(uservo) {
    return request({
      url: '/auth/register',
      method: 'post',
      data: uservo,
    })
  },
  login(user){
    return request({
      url: '/auth/login',
      method: 'post',
      data: user,
    })
  },
  getUserInfo(){
    return request({
      url: '/user/getUserInfo',
      method: 'get',
      headers:{'token':cookie.get('token')}
    })
  },
}
