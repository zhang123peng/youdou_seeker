import {
  SET_ROUTE_TRANSITION_NAME,
  ADD_ROUTE_CHAIN,
  POP_ROUTE_CHAIN
} from '@/vuex/mutations_types'

const state = {
  routeTransitionName:'slide-left', //路由切换的动画名称
  routeChain:[]   //路由历史记录
}

const mutations = {
  /**
   * 设置路由切换的动画名称
   * @param {*} state 
   * @param {*动画名称} name 
   */
  [SET_ROUTE_TRANSITION_NAME](state, name) {
    state.routeTransitionName = name;
  },
  /**
   * 路由切换时添加路由名称到路由历史记录
   * @param {*} state 
   * @param {*路由名称} route 
   */
  [ADD_ROUTE_CHAIN](state,route) {
    state.routeChain.push(route);
  },
  /**
   * 后退时删除路由记录的最后一项
   * @param {*} state 
   */
  [POP_ROUTE_CHAIN](state) {
    state.routeChain.pop();
  }
}

export default {
  state,
  mutations
}