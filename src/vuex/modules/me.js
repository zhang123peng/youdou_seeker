import {
  SET_GLOBAL_USER_INFO
} from '@/vuex/mutations_types'

import {
  GET_GLOBAL_USER_INFO
} from '@/vuex/actions_types'

import api from '@/api'

const state = {
  userInfo:null
}

const mutations = {
  [SET_GLOBAL_USER_INFO](state,userInfo){
    state.userInfo = userInfo
  }
}

const actions = {
  [GET_GLOBAL_USER_INFO]({ commit }){
    api.me.getUserInfo()
      .then(res => {
        if(res.data.error == 0){
          commit(SET_GLOBAL_USER_INFO,res.data.data)
        }
      })
  }
}

export default {
  state,
  mutations,
  actions
}