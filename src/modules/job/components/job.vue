<template>
  <div class="job"   v-infinite-scroll="loadMore">

    <div class="filter-dialog" v-show="filterShowed" @click.self="hideFilter">
      <div class="filter-box">
        <div class="filter-city" v-show="filterType=='city'">
          <div class="filter-area-list">
            <ul>
              <li @click="selectArea(city)" :class="{active:city.value == options.currentArea.value}">{{city.name}}</li>
              <li @click="selectArea(item)" v-for="(item,index) in options.area" :class="{active:item.area_code == options.currentArea.area_code}" :key="index">{{item.area_name}}</li>
            </ul>
          </div>
          <div class="filter-business-list">
            <ul>
              <li class="checked" v-show="!options.currentArea.business_list">
                <span>不限</span>
                <i class="iconfont icon-success"></i>
              </li>
              <li :class="{checked:item.checked}" v-for="(item,index) in options.currentArea.business_list" @click="selectBusiness(item,index)" :key="index">
                <span>{{item.area_name}}</span>
                <i v-show="item.checked" class="iconfont icon-success"></i>
              </li>
            </ul>
          </div>
          <div class="filter-city-buttons">
            <div class="select-city" @click="$router.push({path:'/form/city',query:city})">切换城市</div>
            <div class="city-submit" @click="hideFilter">确定</div>
          </div>
        </div>
        <div class="filter-job" v-show="filterType=='job'">
          <div class="filter-job-list">
            <div class="empty" v-show="!options.job.length">请先添加岗位</div>
            <ul>
              <li @click="selectFilterJob(item)" :class="{checked:item.checked}" v-for="(item,index) in options.job" :key="index">
                <span>{{item.industry_name}}</span>
                <i v-show="item.checked" class="iconfont icon-success"></i>
              </li>
            </ul>
          </div>
          <div class="filter-job-buttons">
            <div class="select-job" @click="selectJobList">添加</div>
            <div class="job-submit" @click="hideFilter">确定</div>
          </div>
        </div>
        <div class="filter-option" v-show="filterType=='option'">
          <div class="filter-option-item">
            <div class="option-item-title">
              <i class="iconfont icon-education"></i>
              <span>学历</span>
            </div>
            <div class="option-item-tags">
              <ul class="clearfix">
                <li :class="{checked:item.value == filter.education}"  @click="selectFilterOption('education',item.value)" v-for="(item,index) in options.education" :key="index">{{item.name}}</li>
              </ul>
            </div>
          </div>
          <div class="filter-option-item">
            <div class="option-item-title">
              <i class="iconfont icon-gongzuojingyan"></i>
              <span>经验</span>
            </div>
            <div class="option-item-tags">
              <ul class="clearfix">
                <li :class="{checked:item.value == filter.job_age}"  @click="selectFilterOption('job_age',item.value)" v-for="(item,index) in options.job_age" :key="index">{{item.name}}</li>
              </ul>
            </div>
          </div>
          <div class="filter-option-item">
            <div class="option-item-title">
              <i class="iconfont icon-money"></i>
              <span>薪资</span>
            </div>
            <div class="option-item-tags">
              <ul class="clearfix">
                <li :class="{checked:item.value == filter.salary}" @click="selectFilterOption('salary',item.value)" v-for="(item,index) in options.salary" :key="index">{{item.name}}</li>
              </ul>
            </div>
          </div>
          <div class="filter-option-buttons">
            <div @click="resetFilterOption" class="reset-option">重置</div>
            <div @click="hideFilter" class="option-submit">确定</div>
          </div>
        </div>
        <div class="filter-sort" v-show="filterType=='sort'">
          <ul>
            <li :class="{checked:filter.order == item.value}" v-for="(item,index) in options.order" :key="index" @click="selectOrder(item.value)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="job-list">
      <ul>
        <router-link  :to="'/job/job_detail/'+item.job_id" tag="li" v-for="(item,index) in jobList" :key="index">
          <div class="job-avatar" :style="'background-image:url('+item.companyInfo.logo+')'"></div>
          <div class="job-info">
            <div class="job-name">{{item.job_name}}</div>
            <div class="job-source">{{item.companyInfo.business_short_name}}</div>
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
    <div class="header">
      <div class="search-bar">
        <div class="me-button" @click="$router.push('/me')">
          <i class="iconfont icon-me1"></i>
        </div>
        <div class="search-input-box">
          <i class="iconfont icon-search1187938easyiconnet"></i>
          <input type="text" v-model="filter.search" @change="getNewJobList" placeholder="请输入职位、公司、地址">
        </div>
        <div class="message-button" @click="$router.push('/message')">
          <i class="iconfont icon-msg1"></i>
        </div>
      </div>
      <div class="filter-bar clearfix">
        <div class="filter-item" @click="showFilter('city')">
          <span>{{city.name}}</span>
          <i class="iconfont icon-down"></i>
        </div>
        <div class="filter-item" @click="showFilter('job')">
          <span>岗位</span>
          <i class="iconfont icon-down"></i>
        </div>
        <div class="filter-item" @click="showFilter('option')">
          <span>条件</span>
          <i class="iconfont icon-down"></i>
        </div>
        <div class="filter-item" @click="showFilter('sort')">
          <span>排序</span>
          <i class="iconfont icon-down"></i>
        </div>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import { SET_FORM_CITY,INIT_FORM_DATA } from '@/vuex/mutations_types'
import { INIT_FORM_INFO } from '@/vuex/actions_types'
export default {
  data () {
    return {
      canGetMoreJob:false,
      jobList:[],
      filterShowed:false,
      filterType:'',
      filterOptions:{},
      filter:{
        search:'',
        education:'0',
        job_age:'0',
        salary:'0',
        order:'0',
        areaType:'',
        areaCode:[],
        longitude:'',
        latitude:'',
        job:[],
        page:1
      },
      city:{
        name:'北京市',
        value:'131'
      },
      options:{
        formid:'jobOptions',
        area:[],
        currentArea:{
          name:'北京市',
          value:'131'
        },
        job:[],
        salary:[{name:'不限',value:'0'},{name:'	2k以下',value:'1'},{name:'2k-5k',value:'2'},{name:'5k-10k',value:'3'},{name:'10k-15k',value:'4'},{name:'15k-25k',value:'5'},{name:'25k-50k',value:'6'},{name:'50k以上',value:'7'}],
        job_age:[{name:'不限',value:'0'},{name:'应届生',value:'1'},{name:'1年以内',value:'2'},{name:'	1-3年',value:'3'},{name:'3-5年',value:'4'},{name:'5-10年',value:'5'},{name:'10年以上',value:'6'}],
        education:[{name:'不限',value:'0'},{name:'中专',value:'1'},{name:'高中',value:'2'},{name:'大专',value:'3'},{name:'本科',value:'4'},{name:'硕士',value:'5'},{name:'博士',value:'6'}],
        order:[{name:'推荐排序',value:'0'},{name:'离我最近',value:'1'},{name:'最新发布',value:'2'}]
      }
    }
  },
  computed:{
    selectedCity(){
      return this.$store.state.form.city
    }
  },
  methods:{
    //显示筛选器
    showFilter(type){
      this.filterType = type
      this.filterShowed = true
    },
    //隐藏筛选器
    hideFilter(){
      this.filterShowed = false
      this.getNewJobList()
    },
    // 选择地区
    selectArea(area){
      this.options.currentArea = area
      if(this.options.currentArea.business_list){
        this.options.currentArea.business_list.forEach(item => {
          this.$set(item,'checked',true)
        })
      }
      this.handleCityFilter()
    },
    // 选择商圈
    selectBusiness(business,index){
      business.checked= !business.checked
      this.handleCityFilter()
    },
    // 获取城市地区列表
    getArea(){
      this.$api.job.getArea({cityCode:this.city.value})
        .then(res => {
          if(res.data.error == 0){
            this.options.area = res.data.data
          }
        })
    },
    // 获取切换城市后的城市信息
    getSelectCity(){
      if(this.selectedCity){
        this.city = this.selectedCity
        this.options.currentArea = this.city
        // this.$store.commit(SET_FORM_CITY,null)
        this.handleCityFilter()
      }
      this.handleCityFilter()
      this.getArea()
    },
    //地区筛选条件处理
    handleCityFilter(){
      if(this.city.value == this.options.currentArea.value){
        this.filter.areaType = 1
        this.filter.areaCode = [this.city.value]
      } else if(!this.options.currentArea.business_list) {
        this.filter.areaType = 2
        this.filter.areaCode = [this.options.currentArea.area_code]
      } else {
        let arr = []
        this.options.currentArea.business_list.forEach(item => {
          if(item.checked){
            arr.push(item.area_code)
          }
        })
        this.filter.areaType = 3
        this.filter.areaCode = arr
        // this.getNewJobList()
      }
    },
    //选择筛选条件
    selectFilterOption(name,value){
      this.filter[name] = value
    },
    //选择排序
    selectOrder(value){
      this.filter.order = value
      this.hideFilter()
    },
    //筛选条件重置
    resetFilterOption(){
      this.filter.education = '0'
      this.filter.job_age = '0'
      this.filter.salary = '0'
    },
    //添加职位
    selectJobList(){
      this.$router.push({ path: '/form/job'})
      this.$store.dispatch(INIT_FORM_INFO,{label:'选择职位',value:this.options.job,name:'job',vm:this,form:this.options})
    },
    //选择职位
    selectFilterJob(item){
      item.checked = !item.checked
      this.handleJobSelect()
    },
    //处理职位选择
    handleJobSelect(){
      let arr = []
      this.options.job.forEach(item => {
        if(item.checked){
          arr.push(item.industry_id)
        }
      })
      this.filter.job = arr
      this.getNewJobList()
    },
    //初始化职位
    initJobList(){
      if(this.$store.state.form.form && this.$store.state.form.form.formid == this.options.formid){
        this.options = this.$store.state.form.form
        this.$store.commit(INIT_FORM_DATA)
        this.options.job.forEach(item => {
          this.$set(item,'checked',true)
        })
        this.handleJobSelect()
      } else {
        this.getNewJobList()
      }
    },
    //获取新列表
    getNewJobList(){
      this.filter.page = 1
      this.canGetMoreJob = true
      this.$api.job.getJobList(this.filter)
        .then(res => {
          if(res.data.error == 0){
            this.jobList = res.data.data
          }
        })
    },
    //加载更多
    loadMore(){
      if(!this.canGetMoreJob) return
      this.canGetMoreJob = false
      this.filter.page ++
      this.$api.job.getJobList(this.filter)
        .then(res => {
          if(res.data.error == 0){
            if(res.data.data.length){
              this.canGetMoreJob = true
            }
            this.jobList.concat(res.data.data)
          }
        })
    }
  },
  activated(){
    this.getSelectCity()
    this.initJobList()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.job
  padding 0 0 0.6rem
  .header
    position absolute
    top 0
    left 0
    width 100%
    .search-bar
      position relative
      box-sizing border-box
      height 0.46rem
      line-height 0.34rem
      background-color rgb(231, 95, 21)
      padding 0.06rem 0.45rem 0 0.55rem
      .me-button
        position absolute
        top 0.06rem
        left 0.1rem
        background-color #fff
        text-align center
        border-radius 50%
        width 0.34rem
        height 0.34rem
        color rgb(231, 95, 21)
        i
          font-size 0.24rem
      .search-input-box
        position relative
        height 0.34rem
        i
          position absolute
          left 0.08rem
          top 0.01rem
          color #999
        input
          border-radius 2px
          box-sizing border-box
          padding-left 0.3rem
          width 100%
          height 100%
      .message-button
        position absolute
        top 0.06rem
        right 0.05rem
        color #fff
        width 0.34rem
        height 0.34rem
        text-align center
        i
          font-size 0.24rem
    .filter-bar
      background-color #fff
      padding 0.1rem 0
      border-bottom 1px solid #eee
      .filter-item
        box-sizing border-box
        border-right 1px solid #eee
        line-height 0.26rem
        width 25%
        text-align center
        float left
        i
          font-size 0.12rem
  .filter-dialog
    z-index 9
    background-color rgba(0,0,0,0.5)
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    .filter-box
      position absolute
      background-color #fff
      left 0
      top 0.94rem
      width 100%
      .filter-city
        position relative
        line-height 0.36rem
        .filter-area-list
          padding-right 50%
          text-align center
          ul
            max-height: 2.16rem;
            min-height: 1.08rem;
            overflow: auto;
            li.active
              background-color #eee
        .filter-business-list
          position absolute
          top 0
          right 0
          width 50%
          height 100%
          box-sizing border-box
          text-align center
          overflow auto
          background-color #eee
          li
            position relative
            &.checked
              color rgb(231,95,21)
            i 
              right 0.15rem
              position absolute
        .filter-city-buttons
          .select-city
          .city-submit
            float left
            width 50%
            text-align center
          .select-city
            background-color #eee
          .city-submit
            background-color rgb(231, 95, 21)
            color #fff
      .filter-job
        position relative
        line-height 0.36rem
        text-align center
        .empty
          line-height 1.18rem
          color #999
        li.checked
          color rgb(231, 95, 21)
        .filter-job-buttons
          .select-job
          .job-submit
            float left
            width 50%
            text-align center
          .select-job
            background-color #eee
          .job-submit
            background-color rgb(231, 95, 21)
            color #fff
      .filter-option
        position relative
        .filter-option-item
          .option-item-title
            padding 0 0.1rem
            line-height 0.36rem
          .option-item-tags
            padding 0 0.1rem
            li
              float left
              line-height 0.26rem
              padding 0 0.1rem
              border-radius 2px
              background-color #eee
              margin-right 0.1rem
              margin-bottom 0.1rem
              &.checked
                background-color rgb(231, 95, 21)
                color #fff
        .filter-option-buttons
          line-height 0.36rem
          .reset-option
          .option-submit
            float left
            width 50%
            text-align center
          .reset-option
            background-color #eee
          .option-submit
            background-color rgb(231, 95, 21)
            color #fff
      .filter-sort
        line-height 0.36rem
        text-align center
        li.checked
          background-color #eee
  .job-list
    position absolute
    left 0
    top 0
    overflow-y auto
    -webkit-overflow-scrolling: touch
    padding 1rem 0.15rem 0.6rem
    height 100%
    width 100%
    box-sizing border-box
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
