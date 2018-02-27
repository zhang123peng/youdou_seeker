<template>
  <div class="edu-exp">
    <goback-nav :submit="submit">教育经历</goback-nav >
    <div class="form">
      <ul class="cells">
        <li class="cell" @click="editForm('学校名称',form.school_name,'school_name','input')">
          <div class="cell-label">
            <span>学校名称</span>
          </div>
          <div class="cell-ft">
            <span>{{form.school_name || '请填写学校名称'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell" @click="editForm('专业名称',form.professional,'professional','input')">
          <div class="cell-label">
            <span>专业名称</span>
          </div>
          <div class="cell-ft">
            <span>{{form.professional || '请填写专业名称'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell"  @click="editForm('学历',form.education,'education','radio',options.education)">
          <div class="cell-label">
            <span>学历</span>
          </div>
          <div class="cell-ft">
            <span>{{form.education&&form.education>0 ? options.education[form.education - 1].label : '请选择学历'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell"  @click="editForm('开始时间',form.edu_start_time,'edu_start_time','month')">
          <div class="cell-label">
            <span>开始时间</span>
          </div>
          <div class="cell-ft">
            <span>{{form.edu_start_time || '请选择开始时间'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell"  @click="editForm('结束时间',form.edu_end_time,'edu_end_time','month')">
          <div class="cell-label">
            <span>结束时间</span>
          </div>
          <div class="cell-ft">
            <span>{{form.edu_end_time || '请选择结束时间'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell" @click="editForm('在校经历',form.schoole_experience,'schoole_experience','textarea')">
          <div class="cell-label">
            <span>在校经历</span>
          </div>
          <div class="cell-ft">
            <span>{{form.schoole_experience || '请填写在校经历'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {INIT_FORM_INFO} from '@/vuex/actions_types'
import {INIT_FORM_DATA} from '@/vuex/mutations_types'
import { mapState } from 'vuex'
import { Toast,Indicator } from 'mint-ui';
export default {
  data () {
    return {
      hasInit:false,
      form:{
        resume_id:'',
        edu_id:0,
        school_name:'',
        professional:'',
        education:'',
        edu_start_time:'',
        edu_end_time:'',
        schoole_experience:''
      },
      options:{
        education:[{label:'中专',value:'1'},{label:'高中',value:'2'},{label:'大专',value:'3'},{label:'本科',value:'4'},{label:'硕士',value:'5'},{label:'博士',value:'6'}]
      }
    }
  },
  computed:mapState({
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
      form.edu_end_time = form.edu_end_time.replace('/','-')
      form.edu_start_time = form.edu_start_time.replace('/','-')
      this.$api.me.editEdu(form)
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
    // 获取表单数据
    this.initForm()
    // 判断修改与否
    if(/^\d+$/.test(this.$route.query.index) && !this.hasInit){
      let obj = this.userInfo.educational[this.$route.query.index]
      for(let key in obj){
        if( key == 'end_time' || key == 'start_time' ){
          this.form['edu_'+key] = obj[key]
        } else if (key == 'education'){
          this.options.education.forEach(item => {
            if(item.label == obj[key]){
              this.form.education = item.value
            }
          })
        } else {
          this.form[key] = obj[key]
          // this.$set(this.form,key,obj[key])
        }
      }
    } else if(!this.hasInit){
      this.form = {
        resume_id:'',
        edu_id:0,
        school_name:'',
        professional:'',
        education:'',
        edu_start_time:'',
        edu_end_time:'',
        schoole_experience:''
      }
    }
    this.form.resume_id = this.$route.query.resume_id
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.edu-exp
  padding-top 0.4rem
</style>
