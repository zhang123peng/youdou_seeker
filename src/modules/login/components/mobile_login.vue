<template>
  <div class="mobile-login">
    <!-- 手机号输入框 -->
    <div class="input-box">
      <input type="tel" v-model="form.username" maxlength="11" placeholder="请输入手机号">
      <mt-button @click="getCode" class="getcode-button" :type="canGetCode ? 'primary':'default'" size="normal">获取验证码{{codeMsg}}</mt-button>
    </div>
    <!-- 验证码输入框 -->
    <div class="input-box">
      <input type="tel" v-model="form.code" maxlength="4" placeholder="请输入验证码">
    </div>
    <!-- 提交按钮 -->
    <div class="submit-box">
      <mt-button class="form-button" @click="submit" type="primary" size="large">下一步</mt-button>
    </div>
    <div class="bottom-link">
      <router-link tag="span" to="password_login" class="password-login">密码登陆</router-link>
      <router-link tag="span" to="/login/agreement" class="user-agreement">用户协议</router-link>
    </div>
  </div>
</template>
<script>
import {SET_USER_INFO} from '@/vuex/mutations_types'
import { verifyPhone,verifyCode } from '@/assets/js/form_verification'
import { Indicator,Toast } from 'mint-ui';
export default {
  data () {
    return {
      canGetCode:true,
      codeMsg:'',
      form:{
        username:'',
        code:''
      }
    }
  },
  methods:{
    getCode(){
      if(!this.canGetCode || !verifyPhone(this.form.username)) return
      this.canGetCode = false
      this.codeMsg = '30'
      let timer = setInterval(() => {
        this.codeMsg = this.codeMsg - 1 + ''
        if(this.codeMsg == '0'){
          this.codeMsg = ''
          clearInterval(timer)
          this.canGetCode = true
        }
      },1000)
      this.$api.login.sendCode({telephone:this.form.username})
        .then(res => {
          if(res.data.error == 0){
            Toast({
              message: '验证码已发送',
              position: 'bottom',
              duration: 3000
            });
          }
        })
    },
    submit(){
      if(!verifyPhone(this.form.username) || !verifyCode(this.form.code)){
        return
      }
      Indicator.open();
      this.$api.login.mobileLogin(this.form)
        .then(res => {
          Indicator.close();
          if(res.data.error == '0'){
            this.$store.commit(SET_USER_INFO,res.data.data)
            if(res.data.data.has_resume == 0){
              //无简历则跳到简历完善页面
              this.$router.push('/login/know_you')
            } else if(res.data.data.resumeInfo.source == 'app'){
              //有简历且简历来源为app则进一步判断简历是否完整
              if(res.data.data.resumeInfo.intent_industry && res.data.data.resumeInfo.intent_industry.length && res.data.data.resumeInfo.intent_job && res.data.data.resumeInfo.intent_job.length){
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
  .password-login
    position absolute
    top 0
    left 0
  .user-agreement
    position absolute
    top 0
    right 0
</style>
