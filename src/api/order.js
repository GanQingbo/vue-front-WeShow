import request from '@/utils/request'
import cookie from 'js-cookie'
export default {
  getOrderToken(id){
    return request({
      url: '/order/getOrderToken/'+id,
      method: 'get',
    })
  },
  submitOrder(order){
    return request({
      url: '/order/submitOrder/',
      method: 'post',
      data:order
    })
  },
  alipay(order){
    return request({
      url: '/other/alipay/alipay',
      method: 'post',
      data:order
    })
  },
  paySuccess(lockVo){
    return request({
      url:'/order/paySuccess',
      method:'post',
      data:lockVo
    })
  },
  getOrderByUser(id){
    return request({
      url:'/order/getOrderVoByUserId/'+id,
      method:'get'
    })
  },
  getOrderById(id){
    return request({
      url:'/order/getOrderVoByOrderId/'+id,
      method:'get'
    })
  },
  orderReturn(id){
    return request({
      url:'/order/createOrderReturn/'+id,
      method:'get'
    })
  },
  deleteOrder(id){
    return request({
      url:'/order/updateDeleteStatus/'+id,
      method:'get'
    })
  }
}
