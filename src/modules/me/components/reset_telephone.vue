<template>
  <div class="reset-telephone">
    <goback-nav>修改手机号</goback-nav>
    <div class="header">当前绑定手机号</div>
    <div class="current-telephone">{{userInfo.mobile.slice(0,3) + '****' + userInfo.mobile.slice(7,11)}}</div>
    <div class="telephone-tips">修改手机号后可以用新的手机号码登陆有豆APP</div>
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
      <!-- 提交按钮 -->
      <div class="submit-box">
        <mt-button class="form-button" @click="submit" type="primary" size="large">下一步</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { verifyPhone,verifyCode } from '@/assets/js/form_verification'
import { GET_GLOBAL_USER_INFO } from '@/vuex/actions_types'

export default {
  data () {
    return {
      canGetCode: true,
      codeMsg: '',
      form:{
        telephone:'',
        code:''
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
      if(!verifyPhone(this.form.telephone) || !verifyCode(this.form.code)){
        return
      }
      this.$Indicator.open();
      this.$api.me.editMobile(this.form)
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
.reset-telephone
  padding 0.5rem 0.15rem 0
  .header
    line-height 0.2rem
  .current-telephone
    font-size 0.24rem
    line-height 0.3rem
  .telephone-tips
    line-height 0.24rem
    color #999
  .form
    padding 0.1rem 0
</style>
