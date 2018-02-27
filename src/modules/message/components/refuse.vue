<template>
  <div class="refuse">
    <goback-nav>{{interviewInfo.interview_status == 3 ? '拒绝面试' : '拒绝OFFER'}}</goback-nav >
    <div class="form">
      <ul class="cells">
        <li class="cell" @click="editForm('拒绝理由',form.refuseType,'refuseType','radio',options.refuseType)">
          <div class="cell-label">
            <span>拒绝理由</span>
          </div>
          <div class="cell-ft">
            <span>{{form.refuseType == 3 ? '其他' : form.refuseReason || '请选择拒绝理由'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell" v-show="form.refuseType == 3" @click="editForm('拒绝理由',form.refuseReason,'refuseReason','input')">
          <div class="cell-label">
            <span>内容</span>
          </div>
          <div class="cell-ft">
            <span>{{form.refuseReason || '请填写拒绝理由'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="submit-box">
      <mt-button class="form-button" @click="submit(true)" type="primary" size="large">确认</mt-button>
      <mt-button class="form-button mgt10" @click="submit(false)" type="default" size="large">取消</mt-button>
    </div>
  </div>
</template>
<script>
import {INIT_FORM_INFO} from '@/vuex/actions_types'
import {INIT_FORM_DATA} from '@/vuex/mutations_types'
import { Toast,Indicator  } from 'mint-ui';
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form:{
        refuseType:'',
        refuseReason:'',
        currentName:'',
      },
      options:{
        refuseType:[{label:'已经找到工作了',value:'0'},{label:'地点离得太远',value:'1'},{label:'薪酬待遇不合适',value:'2'},{label:'其他',value:'3'}]
      }
    }
  },
  computed:mapState({
    userInfo:state => state.me.userInfo,
    interviewInfo: state => state.message.interviewInfo,
    jobInfo:state => state.message.jobInfo
  }),
  methods:{
    /**
     * 编辑表单项
     */
    editForm(label,value,name,type,option){
      this.currentName = name
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
        if(this.form.refuseType && this.form.refuseType != 3){
          this.form.refuseReason = this.options.refuseType[this.form.refuseType].label
        } else if(this.currentName == 'refuseType'){
          this.form.refuseReason = ''
        }
      }
    },
    submit(isRefuse){
      if(isRefuse){
        this.$api.message.replyInterview({
          interview_id:this.interviewInfo.interview_id,
          is_reject:1,
          reject_remark:this.form.refuseReason
        })
          .then(res => {
            if(res.data.error == 0){
              this.$router.go(-2)
              Toast({
                message: '已拒绝邀请',
                position: 'bottom',
                duration: 3000
              });
            }
          })
      } else {
        this.$router.go(-1)
      }
    }
  },
  activated(){
    this.initForm()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.refuse
  padding-top 0.4rem
  .submit-box
    padding 0.2rem 0.15rem
</style>
