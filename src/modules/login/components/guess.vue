<template>
  <div class="guess">
    <goback-nav>我猜您是</goback-nav>
    <div class="guess-content">
      <p class="text">我猜您是</p>
      <p class="name">{{resumeInfo.name}}</p>
      <p class="info">
        <span>
          <i class="iconfont icon-position"></i>
          {{resumeInfo.address}}
        </span>
        <span>
          <i class="iconfont icon-gongzuojingyan"></i>
          {{resumeInfo.job_age}}年
        </span>
        <span>
          <i class="iconfont icon-education"></i>
          {{resumeInfo.education}}
        </span>
      </p>
      <mt-button class="form-button mgt20" @click="submit" type="primary" size="large">答对了</mt-button>
      <mt-button class="form-button mgt10" @click="$router.push('/login/know_you')" type="default" size="large">不是</mt-button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed:mapState({
    resumeInfo:state => state.login.userInfo.resumeInfo,
  }),
  methods:{
    submit(){
      this.$router.push({ 
        path: '/login/know_you', query: {
          isGuess:1
        }
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.guess-content
  padding 0.1rem
  padding-top 0.5rem
  .text
  .info 
    line-height 0.24rem
    font-size 0.14rem
  .name
    font-size 0.24rem
    line-height 0.32rem
  .info 
    color #999

</style>
