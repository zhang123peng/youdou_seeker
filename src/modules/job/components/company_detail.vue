<template>
  <div class="company-detail">
    <div class="header" :style="companyInfo.businfo_img&&companyInfo.businfo_img[0] ? 'background-image:url('+companyInfo.businfo_img[0].file_path+')':''">
      <div class="goback-button" @click.stop="goback">
        <span>&lt;</span>
      </div>
      <div class="right-button">
        <div class="collect-button fl">
          <i class="iconfont icon-heart"></i>
        </div>
        <div class="share-button fl">
          <i class="iconfont icon-share"></i>
        </div>
      </div>
    </div>
    <div class="scroll-view">
      <div  class="company">
        <div class="company-box">
          <div class="company-avatar" :style="'background-image:url('+companyInfo.logo_url+')'"></div>
          <div class="company-name">{{companyInfo.business_name}}</div>
          <div v-if="companyInfo.industry" class="company-info">
            <span>{{companyInfo.industry[0].slice(0,10)}} </span>
            <span v-if="companyInfo.businfo_scale">{{scaleOption[companyInfo.businfo_scale]}}</span>
          </div>
        </div>
      </div>
      <div class="banner">
        <div class="company-address">
          <span>{{companyInfo.address}}</span>
          <i class="iconfont icon-position"></i>
        </div>
        <!-- <div class="banner-box">
          <div class="banner-title">2018北京春季招聘会</div>
          <div class="job-count">5个职位</div>
          <i class="iconfont icon-xiangyou"></i>
        </div> -->
      </div>
      <div class="company-desc" v-if="companyInfo.introduction">
        <div class="item-title-box">
          <div class="item-title">
            <i class="iconfont icon-xinxixiangqing"></i>
            <span>公司介绍</span>
          </div>
        </div>
        <div class="item-content">
          <div class="company-desc-content">
            <p v-for="(item,index) in companyInfo.introduction.split('\n')" :key="index">{{item}}</p>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="hot-job" v-if="companyInfo.hotJobs && companyInfo.hotJobs.length">
        <div class="item-title-box">
          <div class="item-title">
            <i class="iconfont icon-xinxixiangqing"></i>
            <span>热招职位</span>
          </div>
        </div>
        <div class="item-content">
          <div class="hot-job-content">
            <ul>
              <li v-for="(item,index) in companyInfo.hotJobs" :key="index">
                <div class="job-avatar" :style="'background-image:url('+companyInfo.logo_url+')'"></div>
                <div class="job-info">
                  <div class="job-name">{{item.job_name}}</div>
                  <div class="job-source">{{companyInfo.business_short_name}}</div>
                  <div class="job-info-detail">
                    <span v-if="item.job_address">{{item.job_address.slice(0,5)}}</span>
                    &nbsp;
                    <span>{{educationOption[item.education]}}</span>
                    &nbsp;
                    <span>{{experienceOption[item.experience]}}</span>
                  </div>
                </div>
                <div class="job-info-ft">
                  <div class="job-salary" v-show="item.job_min_salary != 0">{{item.job_min_salary+'-'+item.job_max_salary}}</div>
                  <div class="job-salary" v-show="item.job_min_salary == 0">面议</div>
                  <div class="job-distance">
                    <i class="iconfont icon-position"></i>
                    <span>{{companyInfo.distance}}</span>
                  </div>
                </div>
                <div class="tags">
                  <span class="tag-item" v-for="(tag,index) in companyInfo.businfo_welfare" :key="index">{{tag}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      businessId:'',
      companyInfo:{},
      scaleOption:['少于50人','50-100人','100-150人','	500-1000人','1000-5000人','5000-10000人','10000人以上'],
      educationOption:['不限','中专','高中','大专','本科','硕士','博士'],
      experienceOption:['不限','应届生','1年以内','1-3年','3-5年','5-10年','10年以上']
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
      this.$api.job.getCompanyDetail({businessId:this.businessId})
        .then(res => {
          this.$Indicator.close();
          if(res.data.error == 0){
            this.companyInfo = res.data.data
          } else {
            this.$router.go(-1)
          }
        })
        .catch(err => {
          this.$Indicator.close();
          console.log(err)
        })
    }
  },
  activated(){
    this.businessId = this.$route.params.id
    this.getInfo()
    window.scrollTo(0,0)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.company-detail
  .header
    position fixed
    z-index 4
    height 1.7rem
    width 100%
    background-color #ccc
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
          background-color #ccc
          background-size cover
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
    .hot-job
    .company-desc
      .item-title-box
        padding 0 0.15rem 
        .item-title
          color rgb(231, 95, 21)
          line-height 0.4rem
          border-bottom 1px solid #eee
    .company-desc
      .item-content
        padding 0.1rem 0.15rem
        .company-desc-content
          line-height 0.2rem
    .hot-job
      .item-content
        padding 0.1rem 0.15rem
        .hot-job-content  
          ul
            li
              position relative
              padding 0.1rem 0
              height 0.9rem
              border-bottom 1px solid #eee
              .job-avatar
                position absolute
                left 0
                top 0.1rem
                width 0.6rem
                height 0.6rem
                background-size cover
                background-color #ccc
                background-position center
              .job-info
                padding 0 0.7rem
                height 0.6rem
                line-height 0.2rem
                .job-name
                  color #333
                .job-source
                  color #666
                .job-info-detail
                  color #999
              .job-info-ft
                position absolute
                top 0.1rem
                right 0
                text-align right
                .job-salary
                  font-size 0.16rem
                  color rgb(231, 95, 21)
                  line-height 0.3rem
                .job-distance
                  line-height 0.2rem
                  color #999
              .tags
                position absolute
                line-height 0.2rem
                font-size 0.12rem 
                bottom 0.15rem
                left 0
                .tag-item
                  padding 0.02rem 0.1rem
                  border-radius 0.02rem
                  background-color rgb(247, 248, 253)
                  color rgb(158, 167, 184)
                  margin-right 0.08rem

</style>
