<template>
  <div class="intention">
    <goback-nav>求职意向</goback-nav>
    <div class="content">
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
      <div class="submit-box">
        <mt-button class="form-button" @click="submit" type="primary" size="large">下一步</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import {INIT_FORM_INFO,GET_INDUSTRY_OPTION} from '@/vuex/actions_types'
import {INIT_FORM_DATA} from '@/vuex/mutations_types'
import { mapState } from 'vuex'
import { Toast,Indicator } from 'mint-ui';
export default {
  data () {
    return {
      form:{
        resume_id:'',
        formid:'intention',
        job_status:'',
        intent_job:[],
        intent_industry:[],
        intent_min_salary:'',
        intent_max_salary:'',
        self_desc:''
      },
      options:{
        job_status:[{label:'离职-随时到岗',value:'0'},{label:'在职-暂不考虑',value:'1'},{label:'在职-考虑机会',value:'2'},{label:'在职-月内到岗',value:'3'}],
        industry:[]
      },
      valueLabel:{
        job:''
      }
    }
  },
  computed:mapState({
    industryOption:state => state.option.industryOption,
    resumeInfo: state => state.login.resumeInfo
  }),
  methods:{
    /**
     * 编辑表单项
     */
    editForm(label,value,name,type,option){
      this.$router.push({ path: '/form/'+type})
      this.$store.dispatch(INIT_FORM_INFO,{label,value,name,vm:this,form:this.form,option})
    },
    /**
     * 初始化表单项
     */
    initForm(){
      if(this.$store.state.form.form && this.$store.state.form.form.formid == this.form.formid){
        this.form = this.$store.state.form.form
        this.$store.commit(INIT_FORM_DATA)
      }
    },
    /**
     * 提交
     */
    submit(){
      let form = JSON.parse(JSON.stringify(this.form))
      let intent_industry = []
      let intent_job = []
      this.form.intent_industry.forEach(item => {
        intent_industry.push(item.value)
      })
      form.intent_industry = JSON.stringify(intent_industry)
      this.form.intent_job.forEach(item => {
        intent_job.push(item.industry_id)
      })
      form.intent_job = JSON.stringify(intent_job)


      for(let key in form) {
        if(form[key].length < 1) {
          return     Toast({
            message: '请填写完整信息',
            position: 'bottom',
            duration: 3000
          });
        }
      }
      Indicator.open()
      
      // this.$api.login.updateResume(form)
      this.$api.login.createResume(this.formatFormData(form))
        .then(res => {
          Indicator.close();
          if(res.data.error == 0){
            this.$router.push('/home')
          }
        })
        .catch(err => {
          Indicator.close()
        })
    },
    /**
     * 格式化为formdata
     */
    formatFormData(form){
      let formData = new FormData();
      for(let key in form){
        formData.append(key,form[key]);
      }
      return formData
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
     * 获取简历id
     */
    getResumeId(){
      this.$api.login.getUserInfo()
        .then(res => {
          this.form.resume_id = res.data.data.resume_id
        })
    }
  },
  activated(){
    this.initForm()
    if(!this.industryOption.length){
      this.$store.dispatch(GET_INDUSTRY_OPTION)
        .then(data => {
          this.initOption()
        })
    } else if(!this.options.industry.length) {
      this.initOption()
    }

    if(this.resumeInfo.resume){
      this.form.resume_id = this.resumeInfo.resume. resume_id
    } else {
      this.getResumeId()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.content
  padding-top 0.5rem
  .submit-box
    padding 0.1rem
</style>
