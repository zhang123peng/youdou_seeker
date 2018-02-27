<template>
  <div class="update-userinfo">
    <goback-nav>个人信息</goback-nav>
    <div class="header">
      <div v-if="userInfo" class="avatar" :style="'background-image:url('+userInfo.header_url+')'">
        <input type="file" accept="image/*" @change="uploadAvatar"/>
      </div>
    </div>
    <div class="form">
      <ul class="cells">
        <li class="cell" @click="editForm('姓名',form.name,'name','input')">
          <div class="cell-label">
            <span>姓名</span>
          </div>
          <div class="cell-ft">
            <span>{{form.name || '请填写真实姓名'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell" @click="editForm('性别',form.sex,'sex','radio',options.sex)">
          <div class="cell-label">
            <span>性别</span>
          </div>
          <div class="cell-ft">
            <span>{{form.sex || '请选择性别'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell"  @click="editForm('出生年月',form.birth,'birth','month')">
          <div class="cell-label">
            <span>出生年月</span>
          </div>
          <div class="cell-ft">
            <span>{{form.birth || '请选择出生日期'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell"  @click="editForm('学历',form.education,'education','radio',options.education)">
          <div class="cell-label">
            <span>学历</span>
          </div>
          <div class="cell-ft">
            <span>{{form.education&&form.education>0 ? options.education[form.education-1].label : '请选择学历'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell" @click="editForm('参加工作时间',form.work_join_date,'work_join_date','month')">
          <div class="cell-label">
            <span>参加工作时间</span>
          </div>
          <div class="cell-ft">
            <span>{{form.work_join_date || '请选择参加工作时间'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <router-link tag="li" to="/me/bind_email" class="cell">
          <div class="cell-label">
            <span>绑定邮箱</span>
          </div>
          <div class="cell-ft">
            <span>{{form.email || '未绑定邮箱'}}</span>
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import {INIT_FORM_INFO,GET_GLOBAL_USER_INFO} from '@/vuex/actions_types'
import {INIT_FORM_DATA} from '@/vuex/mutations_types'
import { mapState } from 'vuex'
import { Toast,Indicator } from 'mint-ui';
export default {
  data () {
    return {
      currentName:'',
      form:{
        formid:'updateUserInfo',
        name:'',
        sex:'',
        birth:'',
        education:'',
        work_join_date:'',
        email:''
      },
      
      options:{
        sex:[{label:'男',value:'男'},{label:'女',value:'女'}],
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
        this.submit()
      }else{
        let info = JSON.parse(JSON.stringify(this.userInfo))
        for(let key in this.form){
          //正常处理
          if(key == 'education'){
            this.options.education.forEach(item => {
              if(item.label == info[key]){
                this.form.education = item.value
              }
            })
          } else if (key == 'name'){
            this.form['name'] = info['username'] ?　info['username']　:this.form['name']
          } else if (key == 'birth'){
            this.form['birth'] = info['birth_date'] ?　info['birth_date']　:this.form['birth']
          } else {
            this.form[key] = info[key] ?　info[key]　:this.form[key]
          }
          
        }
      }
    },
    uploadAvatar(e){
      let file = e.target.files[0] || e.dataTransfer.files[0];
      let formData = new FormData();
      formData.append('header_url',file);
      this.$api.me.updateAvatar(formData,progressEvent => {
        console.log(progressEvent)
      })
        .then(res => {
          this.$store.dispatch(GET_GLOBAL_USER_INFO)
        })
        .catch(err => {
          console.log(err)
        })
    },
    submit(){
      let form = {
        name:this.form.name,
        sex:this.form.sex,
        birth:this.form.birth,
        education:this.form.education,
        work_join_date:this.form.work_join_date
      }
      let value = form[this.currentName]
      this.$api.me.editResume({name:this.currentName,value})
    }
  },
  activated(){
    this.$store.dispatch(GET_GLOBAL_USER_INFO)
    this.initForm()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.update-userinfo
  padding-top 0.5rem
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
      input
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        opacity: 0
</style>
