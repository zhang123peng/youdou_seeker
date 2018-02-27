import {
  SET_JOB_LIST
} from '@/vuex/mutations_types'

import {
  GET_JOB_LIST
} from '@/vuex/actions_types'

import api from '@/api'

const state = {
  jobList:[]
}

const mutations = {
  [SET_JOB_LIST](state,list){
    state.jobList = list
  }
}

const actions = {
  [GET_JOB_LIST]({commit},filter){
    return new Promise((resolve,reject) => {
      api.job.getJobList(filter)
        .then(res => {
          if(res.data.error == 0){
            commit(SET_JOB_LIST,res.data.data)
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