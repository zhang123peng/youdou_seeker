import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

import login from './modules/login';
import transition from './modules/transition';
import form from './modules/form';
import option from './modules/option';
import home from './modules/home';
import me from './modules/me';
import message from './modules/message';

const store = new Vuex.Store({
  modules:{
    login,
    transition,
    form,
    option,
    home,
    me,
    message
  }
})

export default store;