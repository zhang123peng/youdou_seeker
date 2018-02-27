<template>
  <div class="login">
    <div class="header">
      <p>"离你最近的工作管家"</p>
      <div class="logo"></div>
    </div>
    <router-view class="login-main" />
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.header
  position relative
  height 1.6rem
  line-height 1.2rem
  text-align center
  font-size 0.28rem
  color #fff
  background-color rgb(231, 95, 21);
  .logo
    position absolute
    top 1.2rem
    left 50%
    transform translateX(-50%)
    border-radius 50%
    width 0.8rem
    height 0.8rem
    background-image url('../static/imgs/logo.png')
    background-size cover
    background-color #fff
    background-position center
.login-main
  padding 0.1rem
  padding-top 0.5rem
</style>
