<template>
  <div class="goback-nav">
    <div class="goback-button" @click.stop="goback">
      <span>&lt;</span>
    </div>
    <div class="title">
      <slot></slot>
    </div>
    <div v-if="submit" @click="submit" class="submit">完成</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props:['url','submit'],
  methods:{
    goback(){
      if(this.url){
        return this.$router.push(this.url)
      }
      if(this.$store.state.transition.routeChain.length <=2 ) {
        this.$router.push('/')
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.goback-nav
  position absolute
  background-color rgb(231, 95, 21);
  z-index 9
  top 0
  left 0
  width 100%
  height 0.4rem
  .goback-button
    position absolute
    top 0
    left 0
    padding 0.1rem 0.15rem
    span
      font-size 0.18rem
      color #fff
  .title
    font-size 0.16rem
    line-height 0.4rem
    text-align center
    color #fff
  .submit
    position absolute
    line-height 0.3rem
    background-color #fff
    border 1px solid rgb(231, 95, 21)
    border-radius 4px
    top 0.05rem
    right 0.05rem
    padding 0 0.1rem
    font-size 0.16rem
    color rgb(231, 95, 21)
</style>
