import request from '@/utils/request'

export default {
  getCode(phone) {
    return request({
      url: '/other/sms/getCode/' + phone,
      method: 'get',
    })
  },

}
