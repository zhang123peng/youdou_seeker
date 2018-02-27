<template>
  <div class="success">
    <goback-nav>{{interviewInfo.interview_status == 3 ? '同意面试' : '同意OFFER'}}</goback-nav >
    <div class="success-icon">
      <i class="iconfont icon-success"></i>
    </div>
    <div class="success-info">
      <div class="success-info-item">
        <span class="label">距离面试时间约</span>
        <span>{{interviewInfo.deadline_time}}</span>
      </div>
      <div class="success-info-item">
        <span class="label">距离面试地点</span>
        <span>{{interviewInfo.distance}}</span>
      </div>
    <div class="submit-box">
      <mt-button class="form-button" @click="$router.go(-2)" type="primary" size="large">确认</mt-button>
    </div>
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
    userInfo:state => state.me.userInfo,
    interviewInfo: state => state.message.interviewInfo,
    jobInfo:state => state.message.jobInfo
  })
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.success
  padding-top 0.4rem
  .success-icon
    padding 0.4rem 0
    text-align center
    i
      font-size 0.8rem
      color green
  .success-info
    .success-info-item
      position relative
      padding-left 2rem
      font-size 0.2rem
      height 0.4rem
      line-height 0.4rem
      .label
        position absolute
        left 0
        top 0
        width 1.8rem
        text-align right
        font-size 0.16rem
  .submit-box
    padding 0.2rem 0.15rem
</style>
