<template>
  <div class="job">
    <goback-nav :submit="submit">{{label}}</goback-nav>
    <div class="content">
      <div class="selected-box" v-show="selectedJob.length">
        <span class="selected-item" v-for="(item,index) in selectedJob" :key="index">
          {{item.industry_name}}
          <i class="iconfont icon-LC_icon_close_fill_circle" @click="deleteJob(item)"></i>
        </span>
      </div>
      <div class="group" v-if="option.length" v-for="(group,groupIndex) in option" :key="groupIndex">
        <div class="group-name">
          <img :src="group.industry_icon" alt="">
          <span>{{group.industry_name}}</span>
        </div>
        <div class="industry">
          <span @click="showJobList(industry.sub)" v-for="(industry,industryIndex) in group.sub" :key="industryIndex" class="industry-item">{{industry.industry_name}}</span>
        </div>
      </div>
    </div>
    <div v-show="jobListShow" class="job-selecter" @click.self="hideJobList">
      <div class="selecter-main">
        <div class="job-list">
          <span class="job-item" :class="selectedJob.indexOf(item) == -1 ? '' : 'selected'" @click="selectJob(item)" v-for="(item,index) in jobList" :key="index">{{item.industry_name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {INIT_FORM_DATA} from '@/vuex/mutations_types'
import {GET_INDUSTRY_OPTION} from '@/vuex/actions_types'
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      selectedJob:[],
      newForm:{},
      newValue:'',
      jobList:[],
      jobListShow:false,
      count:3
    }
  },
  computed:mapState({
    label:state => state.form.label,
    value:state => state.form.value,
    name:state => state.form.name,
    form:state => state.form.form,
    vm:state => state.form.vm,
    maxCount:state => state.form.option,
    option:state => state.option.industryOption,
  }),
  methods:{
    showJobList(list){
      this.jobList = list
      this.jobListShow = true
      let body = document.querySelector('body')
      let html = document.querySelector('html')
      html.style.overflow="hidden"
      html.style.height="100%"
      body.style.overflow="hidden"
      body.style.height="100%"
    },
    hideJobList(){
      this.jobListShow = false
      let body = document.querySelector('body')
      let html = document.querySelector('html')
      html.style.overflow=""
      html.style.height=""
      body.style.overflow=""
      body.style.height=""
    },
    selectJob(job){
      let index = this.selectedJob.indexOf(job)
      if(index != -1){
        this.selectedJob.splice(index,1)
      } else {
        if(this.selectedJob.length < this.count){
          this.selectedJob.push(job)
        } else {
          Toast({
            message: '最多只能选'+this.count+'项',
            position: 'bottom',
            duration: 3000
          });
        }
      }
    },
    deleteJob(job){
      let index = this.selectedJob.indexOf(job)
      this.selectedJob.splice(index,1)
    },
    submit(){
      this.jobListShow = false
      this.newForm[this.name] = this.selectedJob
      this.$store.commit(INIT_FORM_DATA,this.newForm)
      this.$router.go(-1)
    }
  },
  activated(){
    if(!this.option.length){
      this.$store.dispatch(GET_INDUSTRY_OPTION)
    }
    if(this.maxCount.length){
      this.count = this.maxCount[0]
    }
    // this.newForm = JSON.parse(JSON.stringify(this.form))
    this.newForm = this.form
    this.selectedJob = this.value || []
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.content
  padding 0.5rem 0.15rem 
  .selected-box
    padding 0.1rem 0
    .selected-item
      position relative
      display inline-block
      margin 0.05rem 0.1rem 0.05rem 0
      padding 0.08rem 0.06rem
      border-radius 3px
      color #fff
      background-color #e75f15
      i
        position absolute
        right -0.1rem
        top -0.08rem
        text-align center
        line-height 0.2rem
        color #333
        font-size 0.14rem
        width 0.2rem
        height 0.2rem
  .group
    .group-name
      position relative
      padding-left 0.4rem
      line-height 0.4rem
      img
        position absolute
        left 0
        top 0.08rem
        height 0.24rem
        width 0.24rem
    .industry
      .industry-item
        display inline-block
        margin 0.05rem 0.1rem 0.05rem 0
        padding 0.08rem 0.06rem
        background-color #eee
        border-radius 3px
.job-selecter
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index 2
  background-color rgba(0,0,0,0.3)
  .selecter-main
    text-align left 
    position absolute
    box-sizing border-box
    padding 0.2rem 0
    bottom 0
    left 0
    width 100%
    height 4.5rem
    background-color #fff
    .job-list
      overflow auto
      height 100%
      padding 0 0.2rem
      .job-item
        display inline-block
        margin 0.05rem 0.1rem 0.05rem 0
        padding 0.08rem 0.06rem
        background-color #eee
        border-radius 3px
        &.selected
          color #fff
          background-color #e75f15
</style>
