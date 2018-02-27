<template>
  <div class="work-exp">
    <goback-nav :submit="submit">工作经验</goback-nav >
    <div class="form">
      <ul class="cells">
        <li class="cell" @click="editForm('职位类型',form.job_type,'job_type','job',[1])">
          <div class="cell-label">
            <span>职位类型</span>
          </div>
          <div class="cell-ft">
            <span v-for="(item,index) in form.job_type" :key="index">{{item.industry_name}}</span>
            <span v-show="!form.job_type.length">请选择职位类型</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell" @click="editForm('职位名称',form.job_name,'job_name','input')">
          <div class="cell-label">
            <span>职位名称</span>
          </div>
          <div class="cell-ft">
            <span>{{form.job_name || '请填写职位名称'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell" @click="editForm('公司名称',form.company_name,'company_name','input')">
          <div class="cell-label">
            <span>公司名称</span>
          </div>
          <div class="cell-ft">
            <span>{{form.company_name || '请填写公司名称'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell"  @click="editForm('开始时间',form.work_start_time,'work_start_time','month')">
          <div class="cell-label">
            <span>开始时间</span>
          </div>
          <div class="cell-ft">
            <span>{{form.work_start_time || '请选择开始时间'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell"  @click="editForm('结束时间',form.work_end_time,'work_end_time','month')">
          <div class="cell-label">
            <span>结束时间</span>
          </div>
          <div class="cell-ft">
            <span>{{form.work_end_time || '请选择结束时间'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell" @click="editForm('工作内容',form.work_content,'work_content','textarea')">
          <div class="cell-label">
            <span>工作内容</span>
          </div>
          <div class="cell-ft">
            <span>{{form.work_content || '请填写工作内容'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
      </ul>
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
      hasInit:false,
      form:{
        resume_id:'',
        work_id:0,
        job_type:'',
        job_name:'',
        company_name:'',
        work_start_time:'',
        work_end_time:'',
        work_content:'',
        is_show:1
      },
      options:{
        industry:[]
      }
    }
  },
  computed:mapState({
    industryOption:state => state.option.industryOption,
    userInfo:state => state.me.userInfo
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
        this.hasInit = true
      } else {
        this.hasInit = false
      }
    },
    submit(){

      for(let key in this.form){
        if(this.form[key] === ''){
          return this.$Toast({
            message: '请填写完整信息',
            position: 'bottom',
            duration: 3000
          })
        }
      }
      let form = JSON.parse(JSON.stringify(this.form))
      form.job_type = form.job_type[0].industry_id
      form.work_end_time = form.work_end_time.replace('/','-')
      form.work_start_time = form.work_start_time.replace('/','-')
      this.$api.me.editExp(form)
        .then(res => {
          if(res.data.error == 0){
            this.$Toast({
              message: '提交成功',
              position: 'bottom',
              duration: 1500
            })
            this.$router.go(-1)
          }
        })
    }
  },
  activated(){
    // 行业选项初始化
    if(!this.industryOption.length){
      this.$store.dispatch(GET_INDUSTRY_OPTION)
        .then(data => {
          this.initOption()
        })
    } else if(!this.options.industry.length) {
      this.initOption()
    }
    // 获取表单数据
    this.initForm()
    // 判断修改与否
    if(/^\d+$/.test(this.$route.query.index) && !this.hasInit){
      let obj = this.userInfo.experience[this.$route.query.index]
      for(let key in obj){
        if(key == 'job_type'){
          this.form[key] = [obj[key]]
        } else if( key == 'end_time' || key == 'start_time' ){
          this.form['work_'+key] = obj[key]
        } else {
          this.form[key] = obj[key]
        }
      }
    } else if(!this.hasInit){
      this.form = {
        resume_id:'',
        work_id:0,
        job_type:'',
        job_name:'',
        company_name:'',
        work_start_time:'',
        work_end_time:'',
        work_content:'',
        is_show:1
      }
    }
    
    this.form.resume_id = this.$route.query.resume_id
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.work-exp
  padding-top 0.4rem
</style>
