import Axios from 'axios'
import store from '@/vuex/store'
import router from '@/router'
import { Toast } from 'mint-ui';
import { SET_USER_INFO } from '@/vuex/mutations_types'

function getXtoken() {
  // if(!store.state.login.token){
  //   let userInfo = localStorage.getItem("userInfo")
  //   if(userInfo){
  //     store.commit(SET_USER_INFO,JSON.parse(userInfo))
  //   }
  // }
  return store.state.login.token || null
}
/**
 * 拦截请求
 */
Axios.interceptors.request.use(
  config => {
    var token = getXtoken()
    // config.headers['client_type'] = 'DESKTOP_WEB'
    if (config.method == 'post') {
      if(config.headers['Content-Type'] === 'multipart/form-data'){
        config.data.append('_t',Date.parse(new Date()) / 1000)
        config.data.append('token',token)
      } else {
        config.data = {
          ...config.data,
          // _t: Date.parse(new Date()) / 1000,
          token
        }
      }
    } else if (config.method == 'get') {
      config.params = {
        // _t: Date.parse(new Date()) / 1000,
        token,
        ...config.params
      }
    }
    return config
  },

  error => {
    return Promise.reject(error)
  }
)
/**
 * 拦截响应
 */
Axios.interceptors.response.use(function (response) {
  if(response.data.error != 0 && response.data.error != 10051) {
    Toast({
      message: response.data.msg,
      position: 'bottom',
      duration: 3000
    });
  }
  // token 已过期，重定向到登录页面  
  if (response.data.error == 10051) {
    localStorage.clear()
    router.replace({
      path: '/login',
      // query: { redirect: router.currentRoute.fullPath }
    })
    Toast({
      message: '未登录或登录已失效',
      position: 'bottom',
      duration: 3000
    });
  }
  return response
},
  error => {
    // Do something with response error  
    return Promise.reject(error)
  }
)

export default Axios