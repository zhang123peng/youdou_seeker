<template>
  <div class="collection">
    <goback-nav>收藏管理</goback-nav>
    <div class="nav-bar">
      <ul>
        <li @click="changeStatus(1)" :class="status == 1 ? 'active' : ''">职位</li>
        <li @click="changeStatus(2)" :class="status == 2 ? 'active' : ''">公司</li>
      </ul>
    </div>
    <div class="job-list" v-show="status == 1">
      <div class="empty" v-show="!jobList.length">暂无符合条件的项目</div>
      <ul>
        <router-link tag="li" :to="'/job/job_detail/'+item.jobInfo.job_id" v-for="(item,index) in jobList" :key="index">
          <div class="job-name">{{item.jobInfo.name}}</div>
          <div class="companay-info">
            <span>{{item.companyInfo.business_name}}</span>
            <span>{{item.companyInfo.business_industry[0]}}</span>
          </div>
          <div class="job-info">
            <span>
              <i class="iconfont icon-position"></i>
              <span>{{item.jobInfo.address.slice(0,5)}}</span>
            </span>
            <span>  
              <i class="iconfont icon-gongzuojingyan"></i>
              <span>{{item.jobInfo.experience}}</span>
            </span>
            <span>  
              <i class="iconfont icon-education"></i>
              <span>{{item.jobInfo.education}}</span>
            </span>
          </div>
          <div class="item-ft">
            <div class="distance">{{item.jobInfo.distance}}</div>
            <div class="salary">{{item.jobInfo.salary}}</div>
          </div>
        </router-link>
      </ul>
    </div>
    <div class="company-list" v-show="status == 2">
      <div class="empty" v-show="!jobList.length">暂无符合条件的项目</div>
      <ul>
        <router-link tag="li" :to="'/job/company_detail/'+item.companyInfo.business_id" v-for="(item,index) in companyList" :key="index">
          <div class="job-name">{{item.companyInfo.business_name}}</div>
          <div class="companay-info">
            <span>{{item.companyInfo.business_industry[0]}}</span>
            <span>{{item.companyInfo.businfo_scale}}</span>
          </div>
          <div class="job-info">
            <span>
              <i class="iconfont icon-position"></i>
              <span>{{item.companyInfo.address}}</span>
            </span>
          </div>
          <div class="item-ft">
            <div class="distance">{{item.companyInfo.distance}}</div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      jobList:[],
      companyList:[],
      status:1
    }
  },
  methods:{
    changeStatus(status){
      this.status = status
    },
    getJobList(){
      this.$api.me.getCollectedJobs()
        .then(res => {
          if(res.data.error == 0) {
            this.jobList = res.data.data
          }
        })
    },
    getCompanyList(){
      this.$api.me.getCollectedCompanys()
        .then(res => {
          if(res.data.error == 0) {
            this.companyList = res.data.data
          }
        })
    }
  },
  activated(){
    this.getJobList()
    this.getCompanyList()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.collection
  padding-top 0.9rem
  box-sizing border-box
  height 100%
  .nav-bar
    position absolute
    width 100%
    top 0.4rem
    left 0
    ul
      padding 0.1rem 0
      display flex
      li
        flex 1
        line-height 0.3rem
        text-align center
        border-right 1px solid #eee
        &:last-of-type
          border-right none
        &.active
          color #e75f15
  .job-list
    height 100%
    overflow-y auto
    background-color #eee
    box-sizing border-box
    padding 0.1rem
    .empty
      line-height 1rem
      color #666
      text-align center
    li
      position relative
      background-color #fff
      padding 0.1rem
      line-height 0.3rem
      margin-bottom 0.1rem
      .job-name
        font-size 0.18rem
      .companay-info
      .job-info
      .item-ft
        color #999
      .item-ft
        position absolute
        top 0.1rem
        right 0.1rem
        text-align right
        .salary
          font-size 0.18rem
          color #e75f15
  .company-list
    height 100%
    overflow-y auto
    background-color #eee
    box-sizing border-box
    padding 0.1rem
    .empty
      line-height 1rem
      color #666
      text-align center
    li
      position relative
      background-color #fff
      padding 0.1rem
      line-height 0.3rem
      margin-bottom 0.1rem
      .job-name
        font-size 0.18rem
      .companay-info
      .job-info
      .item-ft
        color #999
      .item-ft
        position absolute
        top 0.1rem
        right 0.1rem
        text-align right
        .salary
          font-size 0.18rem
          color #e75f15
</style>
