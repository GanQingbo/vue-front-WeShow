import axiox from 'axios'
import cookie from 'js-cookie'

const service = axiox.create({
  baseURL: 'http://localhost:9001',//baseURL会在发送请求的时候拼接在url参数的前面
  timeout: 5000
})

//请求拦截
//所有的网络请求都会先走这个方法
// 添加请求拦截器,所有的网络请求都会先走这个方法
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //统一在请求的header加上token
  if(cookie.get('token')){
    config.headers['token'] = cookie.get('token');
  }
  //token && (config.headers.Authorization = token)
  //config.headers.token='12343'
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
//此处可以根据服务器的返回状态码做响应的处理
//404 404 500
service.interceptors.response.use(function (response) {
    if (response.data.code === 511) {
      // 未授权调取授权接口
    } else if (response.data.code === 510) {
      // 未登录跳转登录页
      this.$router.replace('/Login')
    } else {
      return Promise.resolve(response)
    }
    return response;

}, function (error) {
  // 对响应错误做点什么
  if (error.response.status) {
    return Promise.reject(error);
  }
});

export function get(url, params) {
  return service.get(url, {
    params
  })
}

export function post(url, data) {
  return service.post(url, data)
}

export function del(url) {
  return service.delete(url)
}

export function put(url, data) {
  return service.put(url, data)
}
export default service
