<template>
  <div class="update-resume">
    <goback-nav>完善简历</goback-nav>
    <div class="header">
      <div class="avatar" :style="'background-image:url('+userInfo.header_url+')'">
        <i v-show="userInfo.sex == '女'" class="iconfont icon-icfemale"></i>
        <i v-show="userInfo.sex == '男'" class="iconfont icon-icmale"></i>
      </div>
      <router-link tag="div" to="/me/update_userinfo" class="edit-userinfo">
        <span>个人信息</span>
        <i class="iconfont icon-xiangyou"></i>
      </router-link>
    </div>
    <div class="intention">
      <ul class="cells">
        <li class="cell" @click="editForm('职业状态',form.job_status,'job_status','radio',options.job_status)">
          <div class="cell-label">
            <span>职业状态</span>
          </div>
          <div class="cell-ft">
            <span>{{form.job_status ? options.job_status[form.job_status].label : '请填写职业状态'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell" @click="editForm('意向职位',form.intent_job,'intent_job','job')">
          <div class="cell-label">
            <span>意向职位</span>
          </div>
          <div class="cell-ft">
            <span v-for="(item,index) in form.intent_job" :key="index">{{item.industry_name}}</span>
            <span v-show="!form.intent_job.length">请选择意向职位</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell"  @click="selectCity">
          <div class="cell-label">
            <span>意向城市</span>
          </div>
          <div class="cell-ft">
            <span>{{form.intent_address || '请选择意向城市'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell"  @click="editForm('意向行业',form.intent_industry,'intent_industry','checkbox',options.industry)">
          <div class="cell-label">
            <span>意向行业</span>
          </div>
          <div class="cell-ft">
            <span v-for="(item,index) in form.intent_industry" :key="index">{{item.name}}</span>
            <span v-show="!form.intent_industry.length">请选择意向行业</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell"  @click="editForm('期望薪资',form,'salary','salary')">
          <div class="cell-label">
            <span>期望薪资</span>
          </div>
          <div class="cell-ft">
            <span>{{form.intent_min_salary && form.intent_max_salary ? form.intent_min_salary + '-' + form.intent_max_salary : '请选择期望薪资'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell" @click="editForm('自我描述',form.self_desc,'self_desc','textarea')">
          <div class="cell-label">
            <span>自我描述</span>
          </div>
          <div class="cell-ft">
            <span>{{form.self_desc || '请填写自我描述'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="detail-title">简历详情</div>
    <div class="work-exp">
      <ul class="cells">
        <router-link tag="li" v-for="(item,index) in userInfo.experience" :key="index" class="cell" :to="{path:'/me/work_exp',query:{resume_id:userInfo.resume_id,index}}">
          <div class="cell-label">
            <span>{{item.company_name}}</span>
          </div>
          <div class="cell-ft">
            <span>{{item.start_time}}-{{item.end_time}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </router-link>
      </ul>
      <div v-if="userInfo" class="add-button-box">
        <router-link tag="div" :to="{path:'/me/work_exp',query:{resume_id:userInfo.resume_id}}" class="add-button">
          <i class="iconfont icon-add"></i>
          <span>工作经历</span>
        </router-link>
      </div>
    </div>
    <div class="line"></div>
    <div class="edu-exp">
      <ul class="cells">
        <router-link tag="li" v-for="(item,index) in userInfo.educational" :key="index" class="cell" :to="{path:'/me/edu_exp',query:{resume_id:userInfo.resume_id,index}}">
          <div class="cell-label">
            <span>{{item.school_name}}</span>
          </div>
          <div class="cell-ft">
            <span>{{item.edu_time}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </router-link>
      </ul>
      <div class="add-button-box">
        <router-link tag="div" :to="{path:'/me/edu_exp',query:{resume_id:userInfo.resume_id}}" class="add-button">
          <i class="iconfont icon-add"></i>
          <span>教育经历</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {INIT_FORM_INFO,GET_INDUSTRY_OPTION,GET_GLOBAL_USER_INFO} from '@/vuex/actions_types'
import {INIT_FORM_DATA,SET_FORM_CITY} from '@/vuex/mutations_types'
import { mapState } from 'vuex'
import { Toast,Indicator } from 'mint-ui';
export default {
  data () {
    return {
      currentName:'',
      form:{
        resume_id:'',
        formid:'updateResume',
        job_status:'',
        intent_address:'',
        intent_job:[],
        intent_industry:[],
        intent_min_salary:'',
        intent_max_salary:'',
        self_desc:''
      },
      options:{
        job_status:[{label:'离职-随时到岗',value:'0'},{label:'在职-暂不考虑',value:'1'},{label:'在职-考虑机会',value:'2'},{label:'在职-月内到岗',value:'3'}],
        industry:[]
      }
    }
  },
  computed:mapState({
    industryOption:state => state.option.industryOption,
    userInfo:state => state.me.userInfo,
    selectedCity:state => state.form.city
  }),
  methods:{
    /**
     * 编辑表单项
     */
    editForm(label,value,name,type,option){
      this.currentName = name == 'salary' ? 'intent_salary' : name
      this.$router.push({ path: '/form/'+type})
      this.$store.dispatch(INIT_FORM_INFO,{label,value,name,vm:this,form:this.form,option})
    },
    /**
     * 初始化行业选择
     */
    initOption(){
      this.industryOption.forEach(item => {
        this.options.industry.push({label:item.industry_name,value:{
          name:item.industry_name,
          value:item.industry_id
        }})
      })
    },
    /**
     * 初始化表单项
     */
    initForm(){
      if(this.$store.state.form.form && this.$store.state.form.form.formid == this.form.formid){
        this.form = this.$store.state.form.form
        this.$store.commit(INIT_FORM_DATA)
        this.submit()
      }else{
        let info = JSON.parse(JSON.stringify(this.userInfo))
        for(let key in this.form){
          //特殊处理job_status
          if(key == 'job_status'){
            this.options.job_status.forEach(item => {
              if(item.label == info[key]){
                this.form.job_status = item.value
              }
            })
          } else if (key == 'intent_industry'){
            //特殊处理intent_industry
            let arr = []
            info[key].forEach(item => {
              arr.push({name:item.industry_name,value:item.industry_id})
            })
            this.form[key] = arr
          } else if (key == 'intent_max_salary' || key == 'intent_min_salary'){
            //特殊处理salary
           this.form[key] = info['app'+key.slice(6)] ?　info['app'+key.slice(6)]　:this.form[key]
          } else {
          //正常处理
            this.form[key] = info[key] ?　info[key]　:this.form[key]
          }
          
        }
      }
    },
    selectCity(){
      this.$router.push({path:'/form/city'})
    },
    getSelectCity(){
      if(this.selectedCity){
        let city = this.selectedCity
        this.$store.commit(SET_FORM_CITY,null)
        this.$api.me.editResume({name:'intent_city',value:city.value})
          .then(res => {
            if(res.data.error == 0){
              this.$store.dispatch(GET_GLOBAL_USER_INFO)
              this.form.intent_address = city.name
            }
          })
      } 
    },
    submit(){
      let form = {
        resume_id:this.form.resume_id,
        job_status:this.form.job_status,
        self_desc:this.form.self_desc,
        intent_salary:this.form.intent_min_salary + '-' + this.form.intent_max_salary,
        intent_job:[],
        intent_industry:[]
      }
      this.form.intent_job.forEach(item => {
        form.intent_job.push(item.industry_id)
      })
      this.form.intent_industry.forEach(item => {
        form.intent_industry.push(item.value)
      })
      let value = form[this.currentName] instanceof Array ? JSON.stringify(form[this.currentName]) : form[this.currentName]
      this.$api.me.editResume({name:this.currentName,value})
    }
  },
  activated(){
    this.$store.dispatch(GET_GLOBAL_USER_INFO)
    if(!this.industryOption.length){
      this.$store.dispatch(GET_INDUSTRY_OPTION)
        .then(data => {
          this.initOption()
        })
    } else if(!this.options.industry.length) {
      this.initOption()
    }
    setTimeout(() => {
      this.getSelectCity()
      this.initForm()
    })
    
    //resumeid
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.update-resume
  padding-top 0.5rem
  .line
    height 0.1rem
    background-color #eee
  .header
    position relative
    padding 0.15rem 0
    .avatar
      position relative
      width 0.8rem
      height 0.8rem
      margin 0 auto
      border-radius 50%
      background-color #eee
      background-size cover
      background-position center
      i
        position absolute
        font-size 0.2rem
        bottom 0
        right 0
        &.icon-icfemale
          color pink
        &.icon-icmale
          color skyblue
    .edit-userinfo
      position absolute
      top 0.5rem
      right 0.15rem
      i
        font-size 0.12rem
  .detail-title
    line-height 0.3rem
    background-color #eee
    color #333
    padding 0 0.1rem
  .work-exp
  .edu-exp
    .cells
      margin 0
    .add-button-box
      padding 0 0.15rem
      .add-button
        border-top 1px solid #eee
        text-align center
        line-height 0.46rem
        color #e75f15
</style>  
