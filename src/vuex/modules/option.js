import {
  SET_INDUSTRY_OPTION,
  SET_CITY_OPTION
} from '@/vuex/mutations_types'

import {
  GET_INDUSTRY_OPTION,
  GET_CITY_OPTION
} from '@/vuex/actions_types'

import api from '@/api'

const state = {
  industryOption:[],
  cityOption:[]
}

const mutations = {
  //设置行业选项
  [SET_INDUSTRY_OPTION](state,option){
    state.industryOption = option
  },
  //设置城市选项
  [SET_CITY_OPTION](state,option){
    state.cityOption = option
  },
}

const actions = {
  //获取行业分类
  [GET_INDUSTRY_OPTION]({commit}){
    return new Promise((resolve,reject) => {
      api.option.getIndustryOptions()
        .then(res => {
          if(res.data.error == 0){
            commit(SET_INDUSTRY_OPTION,res.data.data)
            resolve()
          } else {
            reject()
          }
        })
        .catch(err => {
          reject()
        })
    })
  },
  //获取城市选项
  [GET_CITY_OPTION]({commit}){
    return new Promise((resolve,reject) => {
      api.option.getCityOptions()
        .then(res => {
          if(res.data.error == 0){
            commit(SET_CITY_OPTION,res.data.data)
            resolve()
          } else {
            reject(res.data.msg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}