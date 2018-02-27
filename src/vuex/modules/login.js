import {
  CLEAR_USER_INFO,
  UPDATE_LOGIN_STATE,
  SET_USER_INFO,
  UPDATA_RESUME_INFO
} from '@/vuex/mutations_types'

import { LOG_OUT } from '@/vuex/actions_types'
import api from '@/api'
import router from '@/router'

const state = {
  loginState: false,
  uid: 0,
  token:'',
  userInfo:{},
  resumeInfo:{},
  position:{
    longitude:'',
    latitude:''
  }
}

const mutations = {
  // 更新登陆状态
  [UPDATE_LOGIN_STATE](state, isLogin) {
    state.loginState = isLogin || false;
  },
  //初始化用户信息
  [SET_USER_INFO](state, userInfo) {
    state.loginState = true
    state.userInfo = userInfo
    state.uid = userInfo.id
    state.token = userInfo.token
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  },
  //清除用户信息
  [CLEAR_USER_INFO](state) {
    state.loginState = false
    state.userInfo = {}
    state.uid = ''
    state.token = ''
    localStorage.clear()
  },
  // 更新简历
  [UPDATA_RESUME_INFO](state, resumeInfo) {
    state.resumeInfo = resumeInfo
  },

}

const actions = {
  [LOG_OUT]({commit}){
    api.login.logout()
      .then(res => {
        if(res.data.error == 0){
          commit(CLEAR_USER_INFO)
          router.push('/login')
        }
      })
    
  }
}

export default {
  state,
  mutations,
  actions
}