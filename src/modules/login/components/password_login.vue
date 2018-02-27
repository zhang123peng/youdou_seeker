<template>
  <div class="password-login">
    <div class="input-box">
      <input v-model="form.username" maxlength="11" placeholder="账号/手机号">
    </div>
    <div class="input-box">
      <input class="password-input"  v-model="form.password"  type="password" placeholder="密码（8-16位）">
    </div>
    <div class="submit-box">
      <mt-button class="form-button" type="primary" size="large" @click="submit">下一步</mt-button>
    </div>
    <div class="bottom-link">
      <router-link tag="span" to="mobile_login" class="mobile-login">手机登陆</router-link>
      <router-link tag="span" to="/login/agreement" class="user-agreement">用户协议</router-link>
    </div>
  </div>
</template>
<script>
import {SET_USER_INFO} from '@/vuex/mutations_types'
import { verifyPhone,verifyPassword } from '@/assets/js/form_verification'
import { Indicator } from 'mint-ui';
export default {
  data () {
    return {
      form:{
        username:'',
        password:''
      }
    }
  },
  methods:{
    submit(){
      this.$api.login.passwordLogin(this.form)
        .then(res => {
          Indicator.close();
          if(res.data.error == '0'){
            this.$store.commit(SET_USER_INFO,res.data.data)
            if(res.data.data.has_resume == 0){
              //无简历则跳到简历完善页面
              this.$router.push('/login/know_you')
            } else if(res.data.data.resumeInfo.source == 'app'){
              //有简历且简历来源为app则进一步判断简历是否完整
              if(res.data.data.intent_industry && res.data.data.intent_industry.length && res.data.data.intent_job && res.data.data.intent_job.length){
                //已填写意向跳首页
                this.$router.push('/home')
              } else {
                //未填写意向跳意向填写页面
                this.$router.push('/login/intention')
              }
            } else {
              //有简历且简历来源为非app则进入猜猜你是谁页面
              this.$router.push('/login/guess')
            }
          }
        })
        .catch(err => {
          Indicator.close();
        })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.bottom-link
  position relative
  font-size 0.14rem
  line-height 0.4rem
  .mobile-login
    position absolute
    top 0
    left 0
  .user-agreement
    position absolute
    top 0
    right 0
</style>
