import axios from 'axios'
import router from '../router'
import JSONbig from 'json-bigint'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/mp/v1_0',
  // baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0',
  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data)

    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }
  }]
  // axios 默认在内部使用 JSON.parse 来转换处理原始数据
})
request.interceptors.request.use(config => {
  const { token } = JSON.parse(localStorage.user || '{}')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, error => {
  Promise.reject(error)
})

request.interceptors.response.use(response => {
  return response
}, error => {
  const { status } = error.response
  if (status === 401) {
    // 跳转到登录页面
    // 清除本地存储中的用户登录状态
    localStorage.removeItem('user')
    router.push('/login')
    Message.error('登录状态无效，请重新登录')
  } else if (status === 403) {
    // token 未携带或已过期
    Message({
      type: 'warning',
      message: '没有操作权限'
    })
  } else if (status === 400) {
    // 客户端参数错误
    Message.error('参数错误，请检查请求参数')
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }
  Promise.reject(error)
})

export default request