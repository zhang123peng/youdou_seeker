import {
  INIT_FORM_LABEL,
  INIT_FORM_VALUE,
  INIT_FORM_VM,
  INIT_FORM_DATA,
  INIT_FORM_NAME,
  INIT_FORM_OPTION,
  SET_FORM_CITY,
  UPDATE_CURRENT_CITY
} from '@/vuex/mutations_types'

import {
  INIT_FORM_INFO
} from '@/vuex/actions_types'

const state = {
  label: '',
  value: '',
  vm: {},
  form:null,
  name:'',
  option:[],
  city:null,
  // currentCity:{
  //   name:'北京市',
  //   value:'131'
  // }
}

const mutations = {
  // 初始化表单项名
  [INIT_FORM_LABEL](state, label) {
    state.label = label || '';
  },
  //  初始化表单值
  [INIT_FORM_VALUE](state, value) {
    state.value = value || ''
  },
  //  初始化表单实例
  [INIT_FORM_OPTION](state, option) {
    state.option = option || []
  },
  //  初始表单选项
  [INIT_FORM_VM](state, vm) {
    state.vm = vm || ''
  },
  //  记录表单数据
  [INIT_FORM_DATA](state, form){
    state.form = form || null
  },
  //  初始化表单在对应实例数据中的位置
  [INIT_FORM_NAME](state, name){
    state.name = name || ''
  },
  //  设置选择的城市
  [SET_FORM_CITY](state,city){
    state.city = city
    state.currentCity = city
  },
  //更新全局当前城市
  // [UPDATE_CURRENT_CITY](state, city) {
  //   state.currentCity = city
  // }
}

const actions = {
  //初始化表单
  [INIT_FORM_INFO]({commit},info){
    commit(INIT_FORM_LABEL,info.label)
    commit(INIT_FORM_VALUE,info.value)
    commit(INIT_FORM_VM,info.vm)
    commit(INIT_FORM_NAME,info.name)
    commit(INIT_FORM_DATA,info.form)
    commit(INIT_FORM_OPTION,info.option)
  }
}

export default {
  state,
  mutations,
  actions
}