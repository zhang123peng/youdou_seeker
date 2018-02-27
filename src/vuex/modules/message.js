import {
  SET_MESSAGE_INTERVIEW_INFO,
  SET_MESSAGE_JOB_INFO
} from '@/vuex/mutations_types'


import api from '@/api'

const state = {
  interviewInfo:{},
  jobInfo:{}
}

const mutations = {
  [SET_MESSAGE_INTERVIEW_INFO](state,interviewInfo){
    state.interviewInfo = interviewInfo
  },
  [SET_MESSAGE_JOB_INFO](state,jobInfo){
    state.jobInfo = jobInfo
  },
}


export default {
  state,
  mutations
}