<template>
  <div class="reset-password">
    <goback-nav>修改密码</goback-nav>
    <div class="tips">修改密码后，请用新的密码登录有豆APP</div>
    <div class="form">
      <!-- 手机号输入框 -->
      <div class="input-box">
        <input v-model="form.telephone" type="tel" maxlength="11" placeholder="请输入手机号">
        <mt-button @click="getCode"  class="getcode-button" :type="canGetCode ? 'primary':'default'" size="normal">获取验证码{{codeMsg}}</mt-button>
      </div>
      <!-- 验证码输入框 -->
      <div class="input-box">
        <input type="tel" v-model="form.code" maxlength="4" placeholder="请输入验证码">
      </div>
      <!-- 验证码输入框 -->
      <div class="input-box">
        <input type="password" v-model="form.password" maxlength="20" placeholder="请输入密码">
      </div>
      <!-- 提交按钮 -->
      <div class="submit-box">
        <mt-button class="form-button" @click="submit" type="primary" size="large">下一步</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { verifyPhone,verifyCode,verifyPassword } from '@/assets/js/form_verification'
import { GET_GLOBAL_USER_INFO } from '@/vuex/actions_types'

export default {
  data () {
    return {
      canGetCode: true,
      codeMsg: '',
      form:{
        telephone:'',
        code:'',
        password:''
      }
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.me.userInfo
    }
  },
  methods:{
    getCode(){
      if(!this.canGetCode || !verifyPhone(this.form.telephone)) return
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
      this.$api.login.sendCode({telephone:this.form.telephone})
        .then(res => {
          if(res.data.error == 0){
            this.$Toast({
              message: '验证码已发送',
              position: 'bottom',
              duration: 3000
            });
          }
        })
    },
    submit(){
      if(!verifyPhone(this.form.telephone) || !verifyCode(this.form.code) || !verifyPassword(this.form.password)){
        return
      }
      this.$Indicator.open();
      this.$api.me.editPassword(this.form)
        .then(res => {
          this.$Indicator.close();
          if(res.data.error == 0){
            this.$Toast({
              message: '修改成功',
              position: 'bottom',
              duration: 3000
            });
            this.$router.go(-1)
          }
        })
        .catch(err => {
          this.$Indicator.close();
        })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.reset-password
  padding 0.5rem 0.15rem 0
  .tips
    line-height 0.24rem
    color #999
  .form
    padding 0.1rem 0
</style>
