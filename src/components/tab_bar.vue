<template>
  <div class="tab-bar">
    <ul>
      <router-link tag="li" to="/home">
        <i class="iconfont icon-home"></i>
        <div>首页</div>
      </router-link>
      <router-link tag="li" to="/job">
        <i class="iconfont icon-gongzuojingyan"></i>
        <div>职位</div>
      </router-link>
      <router-link tag="li" to="/message">
        <i class="iconfont icon-msg1"></i>
        <div>消息</div>
      </router-link>
      <router-link tag="li" to="/me">
        <i class="iconfont icon-me1"></i>
        <div>我的</div>
      </router-link>
    </ul>
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
.tab-bar
  position fixed
  z-index 4
  bottom 0
  left 0
  width 100%
  height 0.5rem
  border-top 1px solid #eee
  background-color #fff
  ul
    display flex
    li
      flex 1
      text-align center
      height 0.5rem
      line-height 0.2rem
      color #666
      i
        font-size 0.24rem
        line-height 0.3rem
      &.router-link-active
        color rgb(231, 95, 21)
</style>
