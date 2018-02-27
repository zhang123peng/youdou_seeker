<template>
  <div class="home">
    <div class="header">
      <div class="position" @click="selectCity">
        <span>{{city.name}}</span>
        <i class="iconfont icon-down"></i>
      </div>
      <div class="result-count">
        <span  v-if="jobList[0]">附近共查询到 {{jobList[0].job_count}} 个职位</span>
      </div>
      <div class="search-box">
        <input type="text" v-model="searchValue" @change="searchChange" placeholder="请输入职位、公司、地址">
        <i class="iconfont icon-search1187938easyiconnet"></i>
      </div>
      <div class="search-button">
        <mt-button class="form-button"  @click="$router.push('/job')" type="primary" size="large">查看职位</mt-button>
      </div>
    </div>
    <!-- <div class="subject"></div> -->
    <div class="job-list">
      <div class="empty" v-show="!jobList.length">没有搜索相关职位</div>
      <ul>
        <router-link :to="'/job/job_detail/'+item.job_id" tag="li" v-for="(item,index) in jobList" :key="index">
          <div class="job-avatar" :style="'background-image:url('+item.companyInfo.logo+')'"></div>
          <div class="job-info">
            <div class="job-name">{{item.job_name}}</div>
            <div class="job-source">{{item.companyInfo.business_short_name}} {{item.companyInfo.companyIndustry[0]}}</div>
            <div class="job-info-detail">
              <span v-if="item.job_address">{{item.job_address.slice(0,5)}}</span>
              &nbsp;
              <span>{{item.job_education}}</span>
              &nbsp;
              <span>{{item.job_experience}}</span>
            </div>
          </div>
          <div class="job-info-ft">
            <div class="job-salary">{{item.show_salary}}</div>
            <div class="job-distance">
              <i class="iconfont icon-position"></i>
              <span>{{item.distance}}</span>
            </div>
          </div>
          <div class="tags">
            <span class="tag-item" v-for="(tag,index) in item.job_welfare.slice(0,4)" :key="index">{{tag}}</span>
          </div>
        </router-link>
      </ul>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import { GET_JOB_LIST } from '@/vuex/actions_types'
import { SET_FORM_CITY } from '@/vuex/mutations_types'
export default {
  data () {
    return {
      loading:false,
      position:{
        // longitude:'113.3228100',
        longitude:'',
        // latitude:'22.9690000'
        latitude:''
      },
      city:{
        name: '北京市',
        value: 131
      },
      searchValue:'',
    }
  },
  computed:{
    jobList () {
      return this.$store.state.home.jobList
    },
    selectedCity(){
      return this.$store.state.form.city
    },
    loginState(){
      return this.$store.state.login.loginState
    }
  },
  methods:{
    getJobList(){
      this.$Indicator.open()
      this.$store.dispatch(GET_JOB_LIST,{...this.position,areaType:1,areaCode:[this.city.value],search:this.searchValue})
      // this.$store.dispatch(GET_JOB_LIST,{...{longitude:+'113.3228100',latitude:+'22.9690000'},areaType:1,areaCode:[this.city.value],search:this.searchValue})
        .then(res => {
          this.$Indicator.close()
        })
        .catch(err => {
          this.$Indicator.close()
        })
    },
    searchChange(){
      this.getJobList()
    },
    getLocation(){
      if (navigator.geolocation && this.loginState){
        this.$Indicator.open()
        navigator.geolocation.getCurrentPosition(position => {
          this.position.longitude = +position.coords.longitude;  
          this.position.latitude = +position.coords.latitude;  
          this.$api.option.getCurrentCity(this.position)
            .then(res => {
              this.$Indicator.close()
              if(res.data.error == 0 && res.data.data.name){
                this.city = res.data.data
                this.$Indicator.close()
                this.getJobList()
              } else {
                this.city = {name:'北京市',value:'131'}
                this.position.longitude = '' 
                this.position.latitude = ''
                this.$store.commit(SET_FORM_CITY,this.city)
                this.getJobList()
              }
            })
            .catch(err => {
              this.$Indicator.close()
              this.$Toast({
                message: '获取定位失败,'+err,
                position: 'bottom',
                duration: 3000
              })
              this.city = {name:'北京市',value:'131'}
              this.$store.commit(SET_FORM_CITY,this.city)
            })
        },err => {
          console.log(err)
          this.$Toast({
            message: '获取定位失败',
            position: 'bottom',
            duration: 3000
          })
          this.getJobList()
          this.$Indicator.close()
        },{
            enableHighAcuracy:true,
            timeout: 5000
          });
      }else if (this.loginState){
        this.getJobList()
        this.$Toast({
          message: '无法获取定位',
          position: 'bottom',
          duration: 3000
        })
      } else {
        this.getJobList()
      }
    },
    selectCity(){
      this.$router.push({path:'/form/city',query:this.city})
    },
    getSelectCity(){
      if(this.selectedCity){
        this.city = this.selectedCity
        // this.$store.commit(SET_FORM_CITY,null)
        this.getJobList()
      } 
    }
  },
  activated(){
    this.getSelectCity()
  },
  created(){
    if(!this.selectedCity){
      this.getLocation()
    }
    
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.home
  padding 0 0.1rem 0.5rem
  .header
    position relative
    .position
      position absolute
      top 0
      left 0
      line-height 0.4rem
      height 0.4rem
    .result-count
      line-height 0.4rem
      height 0.4rem
      text-align right
    .search-box
      position relative
      i
        position absolute
        left 0.08rem
        top 0
        color #666
        line-height 0.36rem
        font-size 0.16rem
      input
        width 100%
        height 0.36rem
        box-sizing border-box
        line-height 0.36rem
        padding 0 0.1rem 0 0.3rem
        font-size 0.14rem
        background-color #eee
    .search-button
      padding 0.1rem 0
  .subject
    height 0.6rem
    width 100%
    background-size cover
    background-color #ccc
    background-position center
  .job-list
    .empty
      line-height 1rem
      color #999
      text-align center
    ul
      margin-top 0.1rem
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
          background-size contain
          background-repeat no-repeat
          background-color #fff
          background-position center
        .job-info
          padding 0 0.7rem
          height 0.6rem
          line-height 0.2rem
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
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
