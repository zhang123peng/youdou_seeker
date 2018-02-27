<template>
  <div class="work-manage">
    <goback-nav>工作管理</goback-nav>
    <div class="nav-bar">
      <ul>
        <li @click="changeStatus(1)" :class="status == 1 ? 'active' : ''">投递</li>
        <li @click="changeStatus(2)" :class="status == 2 ? 'active' : ''">邀约</li>
        <li @click="changeStatus(3)" :class="status == 3 ? 'active' : ''">面试</li>
        <li @click="changeStatus(4)" :class="status == 4 ? 'active' : ''">OFFER</li>
      </ul>
    </div>
    <div class="job-list">
      <div class="empty" v-show="!jobList.length">暂无符合条件的项目</div>
      <ul>
        <router-link tag="li" :to="'/chat/'+item.chat_theme.theme_id" v-for="(item,index) in jobList" :key="index">
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
            <div class="is-read" v-show="item.tag[0].code == 1">已读</div>
            <div class="not-read" v-show="item.tag[0].code == 0">未读</div>
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
      status:1
    }
  },
  methods:{
    getList(){
      this.$api.message.getWorkList({status:this.status})
        .then(res => {
          if(res.data.error == 0){
            this.jobList = res.data.data
          }
        })
    },
    changeStatus(status){
      this.status = status
      this.getList()
    }
  },
  activated(){
    this.getList()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.work-manage
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
        .is-read
        .not-read
          display inline-block
          border-radius 2px
          line-height 0.2rem
          color #fff
          padding 0 0.05rem
        .is-read
          background-color green
        .not-read
          background-color #666
</style>
