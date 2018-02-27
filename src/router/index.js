import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/components/welcome'
import login from './login'
import form from './form'
import home from './home'
import job from './job'
import message from './message'
import me from './me'

import store from '@/vuex/store'
import {SET_ROUTE_TRANSITION_NAME,ADD_ROUTE_CHAIN,POP_ROUTE_CHAIN, SET_USER_INFO} from '@/vuex/mutations_types'
import {GET_GLOBAL_USER_INFO} from '@/vuex/actions_types'

Vue.use(Router)




const router = new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    ...login,
    ...form,
    ...home,
    ...job,
    ...message,
    ...me
  ]
})

/**
 * 注册路由钩子设置切换动画
 */
router.beforeEach((to, from, next) => {
  let tabs = ['home','job','message','me']
  if(!store.state.login.token){
    let userInfo = localStorage.getItem("userInfo")
    if(userInfo){
      store.commit(SET_USER_INFO,JSON.parse(userInfo))
      store.dispatch(GET_GLOBAL_USER_INFO)
    }
  }

  let routeLength = store.state.transition.routeChain.length;
  if (routeLength === 0) {
    store.commit(SET_ROUTE_TRANSITION_NAME, 'fade');
    if (to.path === from.path && to.path === '/') {
      //当直接打开根路由的时候
      store.commit(ADD_ROUTE_CHAIN, to);
    } else {
      //直接打开非根路由的时候其实生成了两个路径，from就是根路由
      store.commit(ADD_ROUTE_CHAIN, from);
      store.commit(ADD_ROUTE_CHAIN, to);
    }
  } else if (routeLength === 1) {
    store.commit(SET_ROUTE_TRANSITION_NAME, 'slide-left');
    store.commit(ADD_ROUTE_CHAIN, to);
  } else {
    let lastBeforeRoute = store.state.transition.routeChain[routeLength-2];
    if(tabs.indexOf(to.name) != -1 && tabs.indexOf(from.name) != -1){
      store.commit(ADD_ROUTE_CHAIN, to);
      store.commit(SET_ROUTE_TRANSITION_NAME, '');
      console.log(123)
    } else if (lastBeforeRoute.path === to.path) {
      store.commit(POP_ROUTE_CHAIN);
      store.commit(SET_ROUTE_TRANSITION_NAME, 'slide-right');
    } else {
      store.commit(ADD_ROUTE_CHAIN, to);
      store.commit(SET_ROUTE_TRANSITION_NAME, 'slide-left');
    }
  }
  next();
})

export default router