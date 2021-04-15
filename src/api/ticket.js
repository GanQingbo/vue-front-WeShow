import request from '@/utils/request'

export default {
  getTicketByShowId(id){
    return request({
      url: '/ticket/getTicketByShow/'+id,
      method: 'get',
    })
  },
  getTicketSurplus(id){
    return request({
      url: '/ticket/getSurplus/'+id,
      method: 'get',
    })
  },
  getSellTimeDistance(id){
    return request({
      url: '/ticket/getSellTimeDistance/'+id,
      method: 'get',
    })
  },
}
