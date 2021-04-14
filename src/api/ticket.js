import request from '@/utils/request'
export default {
  getTicketByShowId(id){
    return request({
      url: '/ticket/getTicketByShow/'+id,
      method: 'get',
    })
  },
}
