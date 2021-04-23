import request from '@/utils/request'

export default {
  updateUserInfo(user){
    return request({
      url: '/user/updateUser',
      method: 'post',
      data:user
    })
  },
  getIdentityByUser(id){
    return request({
      url: '/user/getIdentityByUser/'+id,
      method: 'get',
    })
  },
  createIdentity(identity){
    return request({
      url: '/user/createIdentity',
      method: 'post',
      data:identity
    })
  },
  deleteIdentity(id){
    return request({
      url: '/user/deleteIdentity/'+id,
      method: 'delete',
    })
  },
  checkIdentity(identity){
    return request({
      url: '/user/identityCheck',
      method: 'post',
      data:identity
    })
  },
  addTicketSell(ticket){
    return request({
      url: '/user/addTicketSell',
      method: 'post',
      data:ticket
    })
  },
}
