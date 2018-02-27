<template>
  <div class="interview">
    <goback-nav>{{interviewInfo.interview_status == 3 ? '面试邀请' : '发放OFFER'}}</goback-nav >
    <div class="title">职位信息</div>
    <div class="job-info">
      <ul class="job-info-list">
        <li>
          <span>薪资：</span>
          <span class="salary">{{jobInfo.show_salary}}</span>
        </li>
        <li>
          <span>职位：</span>
          <span>{{jobInfo.jobName}}</span>
        </li>
        <li>
          <span>公司：</span>
          <span>{{jobInfo.companyName}}</span>
        </li>
      </ul>
    </div>
    <div class="title" v-show="interviewInfo.interview_status == 3">面试信息</div>
    <div class="title" v-show="interviewInfo.interview_status == 4">入职信息</div>
    <div class="interview-info">
      <ul v-show="interviewInfo.interview_status == 3" class="interview-info-list">
        <li>
          <span>联系人：</span>
          <span>{{interviewInfo.interview_person}}</span>
        </li>
        <li>
          <span>联系电话：</span>
          <span>{{interviewInfo.interview_number}}</span>
        </li>
        <li>
          <span>面试地点：</span>
          <span>{{interviewInfo.interview_address}}</span>
        </li>
        <li>
          <span>面试时间：</span>
          <span>{{interviewInfo.interview_time}}</span>
        </li>
      </ul>
      <ul  v-show="interviewInfo.interview_status == 4" class="offer-info-list">
        <li>
          <span>联系人：</span>
          <span class="salary"></span>
        </li>
        <li>
          <span>联系电话：</span>
          <span></span>
        </li>
        <li>
          <span>入职地点：</span>
          <span></span>
        </li>
        <li>
          <span>入职时间：</span>
          <span></span>
        </li>
      </ul>
    </div>
    <div class="submit-box">
      <mt-button class="form-button" @click="submit(true)" type="primary" size="large">同意</mt-button>
      <mt-button class="form-button mgt10" @click="submit(false)" type="default" size="large">拒绝</mt-button>
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
  }),
  methods:{
    submit(isAccept){
      if(isAccept){
        this.$api.message.replyInterview({
          interview_id:this.interviewInfo.interview_id,
          is_reject:2
        })
          .then(res => {
            console.log(res)
            if(res.data.error == 0){
              this.$router.push('/message/success')
            }
          })
      } else {
        this.$router.push('/message/refuse')
      }
      
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.interview
  padding-top 0.4rem
  background-color #eee
  .title
    line-height 0.34rem
    padding-left 0.1rem
  .job-info
  .interview-info
    background-color #fff
    padding-left 0.15rem
    line-height 0.4rem
    ul
      li
        border-bottom 1px solid #eee
        &:last-of-type
          border-bottom none
      .salary
        color #e75f15
  .submit-box
    padding 0.2rem 0.15rem
</style>
