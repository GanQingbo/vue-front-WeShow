import request from '@/utils/request'

export default {
  getCode(phone) {
    return request({
      url: '/other/sms/getCode/' + phone,
      method: 'get',
    })
  },
  uploadOss(file){
    return request({
      url: '/other/oss/uploadPoster',
      method: 'post',
      data:file,
      headers:{
        'content-type':'multipart/form-data',
      }
    })
  }
}
