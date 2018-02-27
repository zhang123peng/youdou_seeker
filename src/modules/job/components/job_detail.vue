<template>
  <div class="job-detail">
    <div class="header" :style="jobInfo.companyImages&&jobInfo.companyImages[0] ? 'background-image:url('+jobInfo.companyImages[0].file_path+')':''">
      <div class="goback-button" @click.stop="goback">
        <i class="iconfont icon-xiangzuo"></i>
      </div>
      <div class="right-button" @click="addToCollection">
        <div class="collect-button fl">
          <i class="iconfont icon-heart" v-show="jobInfo.is_collection == 0"></i>
          <i class="iconfont icon-heart1" v-show="jobInfo.is_collection == 1"></i>
          
        </div>
        <div class="share-button fl">
          <i class="iconfont icon-share"></i>
        </div>
      </div>
    </div>
    <div class="scroll-view">
      <div class="overview">
        <div class="overview-name">{{jobInfo.jobName}}</div>
        <div class="overview-salary">{{jobInfo.show_salary}}</div>
        <ul class="overview-info clearfix">
          <li class="fl" v-if="jobInfo.workAddress">
            <i class="iconfont icon-position"></i>
            <span>{{jobInfo.workAddress.slice(0,5)}}</span>
          </li>
          <li class="fl">
            <i class="iconfont icon-gongzuojingyan"></i>
            <span>{{jobInfo.experience}}</span>
          </li>
          <li class="fl">
            <i class="iconfont icon-education"></i>
            <span>{{jobInfo.education}}</span>
          </li>
        </ul>
      </div>
      <router-link tag="div" :to="'/job/company_detail/'+jobInfo.companyId" class="company">
        <div class="company-box">
          <div class="company-avatar" :style="'background-image:url('+jobInfo.logoUrl+')'"></div>
          <div class="company-name">{{jobInfo.companyName}}</div>
          <div v-if="jobInfo.companyIndustry" class="company-info">{{jobInfo.companyIndustry[0].slice(0,10)}}  {{jobInfo.companyNumber}}</div>
          <i class="iconfont icon-xiangyou"></i>
        </div>
      </router-link>
      <div class="banner">
        <div class="company-address">
          <span>{{jobInfo.companyAddress}}</span>
          <i class="iconfont icon-position"></i>
        </div>
        <!-- <div class="banner-box">
          <div class="banner-title">2018北京春季招聘会</div>
          <div class="job-count">5个职位</div>
          <i class="iconfont icon-xiangyou"></i>
        </div> -->
      </div>
      <div class="job-info">
        <div class="item-title-box">
          <div class="item-title">
            <i class="iconfont icon-xinxixiangqing"></i>
            <span>职位信息</span>
          </div>
        </div>
        <div class="item-content clearfix">
          <div class="info-single-item">
            <div class="info-single-label">工作地点：</div>
            <div class="info-single-value">{{jobInfo.workAddress}}</div>
            <i class="iconfont icon-position"></i>
          </div>
          <!-- <div class="info-single-item">
            <div class="info-single-label">交通线路：</div>
            <div class="info-single-value">地铁三号线汉溪长隆转10B、番15、番100</div>
          </div> -->
          <div class="info-double-item">
            <div class="info-double-label">职位类型：</div>
            <div class="info-double-value">{{jobInfo.job_type}}</div>
          </div>
          <!-- <div class="info-double-item">
            <div class="info-double-label">工作时间：</div>
            <div class="info-double-value">09:00-18:00</div>
          </div>
          <div class="info-double-item">
            <div class="info-double-label">工作时长：</div>
            <div class="info-double-value">8小时</div>
          </div>
          <div class="info-double-item">
            <div class="info-double-label">是否双休：</div>
            <div class="info-double-value">双休</div>
          </div>
          <div class="info-double-item">
            <div class="info-double-label">试用工资：</div>
            <div class="info-double-value">100%</div>
          </div>
          <div class="info-double-item">
            <div class="info-double-label">薪资水平：</div>
            <div class="info-double-value">13月</div>
          </div>
          <div class="info-double-item">
            <div class="info-double-label">试用时长：</div>
            <div class="info-double-value">3个月</div>
          </div>
          <div class="info-double-item">
            <div class="info-double-label">实习生</div>
            <div class="info-double-value">不接受</div>
          </div>
          <div class="info-double-item">
            <div class="info-double-label">应届生：</div>
            <div class="info-double-value">接受</div>
          </div> -->
        </div>
      </div>
      <div class="line"></div>
      <div class="salary">
        <div class="item-title-box">
          <div class="item-title">
            <i class="iconfont icon-xinxixiangqing"></i>
            <span>薪资福利</span>
          </div>
        </div>
        <div class="item-content">
          <div class="tags">
            <div class="tag-item" v-for="(item,index) in jobInfo.companyWelfare" :key="index">{{item}}</div>
          </div>
          <div class="salary-desc" v-show="false">
            <p>1、的点点滴滴多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多</p>
            <p>2、的点点滴滴多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多</p>
            <p>3、的点点滴滴多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多</p>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="job-desc" v-if="jobInfo.jobDesc">
        <div class="item-title-box">
          <div class="item-title">
            <i class="iconfont icon-xinxixiangqing"></i>
            <span>职位说明</span>
          </div>
        </div>
        <div class="item-content">
          <div class="job-desc-content">
            <p v-for="(item,index) in jobInfo.jobDesc.split('\n')" :key="index">{{item}}</p>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="other">
        <div class="item-title-box">
          <div class="item-title">
            <i class="iconfont icon-xinxixiangqing"></i>
            <span>其他要求</span>
          </div>
        </div>
        <div class="item-content">
          <div class="other-content">
            <p>无</p>
          </div>
        </div>
      </div>
    </div>
    <div class="communicating">
      <div class="communicating-button" @click="communicate">立即沟通</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      job_id:'',
      jobInfo:{}
    }
  },
  methods:{
    goback(){
      if(this.$store.state.transition.routeChain.length <=2 ) {
        this.$router.push('/')
      } else {
        this.$router.go(-1)
      }
    },
    getInfo(){
      this.$Indicator.open()
      this.$api.job.getJobDetail({jobId:this.job_id})
        .then(res => {
          this.$Indicator.close();
          if(res.data.error == 0){
            this.jobInfo = res.data.data
          } else {
            this.$router.go(-1)
          }
        })
        .catch(err => {
          this.$Indicator.close();
          console.log(err)
        })
    },
    communicate(){
    if(!this.$store.state.login.loginState){
      return this.$router.push('/login')
    }
      this.$api.job.creatChat({
        job_id:this.job_id,
        status:1,
        greeting:"希望得到贵公司的垂青，感谢！"
      })
        .then(res => {
          if(res.data.error == 0) {
            this.$router.push('/chat/'+res.data.data.chatTheme.theme_id)
            // res.data.data.chatTheme.theme_id
            // res.data.data.chatTheme.job_id
            // res.data.data.chatTheme.business_id
            // res.data.data.chatTheme.theme_status
          }
        })
    },
    addToCollection(){
      if(this.jobInfo.is_collection == 0){
        this.$api.me.createCollection({
          markId:this.job_id,
          role:2
        })
          .then(res => {
            if(res.data.error == 0){
              this.getInfo()
              this.$Toast({
                message: '收藏成功',
                position: 'bottom',
                duration: 3000
              })
            }
          })
          
      } else {
        this.$api.me.cancelCollection({
          collectionId:this.jobInfo.collectionInfo.collection_id,
        })
          .then(res => {
            this.getInfo()
            if(res.data.error == 0){
              this.$Toast({
                message: '已取消收藏',
                position: 'bottom',
                duration: 3000
              })
            }
          })
      }
    }
  },
  activated(){
    this.job_id = this.$route.params.id
    this.getInfo()
    window.scrollTo(0,0)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.job-detail
  .header
    position fixed
    z-index 4
    height 1.7rem
    width 100%
    background-color #ccc
    background-repeat no-repeat
    background-size cover
    background-position center
    .goback-button
      position absolute
      top 0
      left 0
      padding 0.1rem 0.15rem
      span
        font-size 0.18rem
        color #fff
      i
        font-size 0.16rem
        line-height 0.2rem
        color #fff
    .right-button
      position absolute
      right 0
      top 0
      padding 0.1rem 0.05rem
      .collect-button
      .share-button
        padding 0.05rem 0.08rem
        i
          font-size 0.18rem
          color #fff
  .scroll-view
    padding-top 1.7rem
    padding-bottom 0.6rem
    .overview
      position relative
      padding 0 0.1rem
      .overview-name
        font-size 0.18rem
        line-height 0.36rem
      .overview-salary
        position absolute
        right 0.1rem
        top 0
        font-size 0.18rem
        line-height 0.36rem
        color rgb(231, 95, 21)
      .overview-info
        border-bottom 1px solid #eee
        li
          font-size 0.14rem
          line-height 0.3rem
          color #999
          padding-right 0.1rem
    .company
      padding 0 0.1rem
      .company-box
        position relative
        padding 0.1rem 0.7rem
        border-bottom 1px solid #eee
        .company-avatar
          position absolute
          top 0.1rem
          left 0
          width 0.6rem
          height 0.6rem
          background-color #fff
          background-repeat no-repeat
          background-size contain
          background-position center
        .company-name
          line-height 0.3rem
        .company-info
          line-height 0.3rem
          color #999
        i
          color #ccc
          position absolute
          line-height 0.6rem
          right 0
          top 0.1rem
    .banner
      .company-address
        position relative
        line-height 0.34rem 
        padding 0 0.1rem
        color #666
        i
          position absolute
          bottom 0
          right 0.1rem
          color rgb(231, 95, 21)
      .banner-box
        position relative
        background-color #ff9800
        line-height 0.4rem
        padding 0 0.15rem
        color #fff
        .job-count
          position absolute
          right 0.5rem
          top 0
        i
          position absolute
          top 0
          right 0.1rem
          font-size 0.12rem
    .line
      height 0.1rem
      background-color #ddd
    .job-info
    .salary
    .job-desc
    .other
      .item-title-box
        padding 0 0.15rem 
        .item-title
          color rgb(231, 95, 21)
          line-height 0.4rem
          border-bottom 1px solid #eee
    .job-info
      .item-content
        line-height 0.34rem
        .info-single-item
          position relative
          width 100%
          .info-single-label
            position absolute
            color #999
            left 0
            top 0
            padding-left 0.15rem
          .info-single-value
            padding-left 0.9rem
            padding-right 0.3rem
          i
            position absolute
            right 0.15rem
            top 0
            color rgb(231, 95, 21)
        .info-double-item
          position relative
          float left
          width 50%
          .info-double-label
            position absolute
            color #999
            left 0
            top 0
            padding-left 0.15rem
          .info-double-value
            padding-left 0.9rem
            padding-right 0.15rem
    .salary
      .item-content
        padding 0.1rem 0.15rem
        .tags
          .tag-item
            display inline-block
            background-color rgb(231, 95, 21)
            line-height 0.26rem
            padding 0 0.08rem
            color #fff
            margin-right 0.1rem
            margin-bottom 0.1rem
            border-radius 4px
        .salary-desc
          line-height 0.2rem
    .job-desc
      .item-content
        padding 0.1rem 0.15rem
        .job-desc-content
          line-height 0.2rem
    .other
      .item-content
        padding 0.1rem 0.15rem
        .other-content
          line-height 0.2rem
  .communicating
    position fixed
    background-color #fff
    bottom 0
    left 0
    width 100%
    box-sizing border-box
    padding 0.1rem 0.15rem
    .communicating-button
      text-align center
      border-radius 3px
      background-color rgb(231, 95, 21)
      color #fff
      line-height 0.4rem
</style>
