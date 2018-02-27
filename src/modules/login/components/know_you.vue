<template>
  <div class="know-you">
    <goback-nav>让大家认识你</goback-nav>
    <div class="content">
      <div class="avatar" :style="avatarUrl ? {'background-image':'url('+avatarUrl+')'} : ''">
        <input type="file" accept="image/*" @change="uploadAvatar"/>
      </div>
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
            <span>{{form.education ? options.education[form.education-1].label : '请选择学历'}}</span>
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
      </ul>
      <div class="submit-box">
        <mt-button class="form-button" @click="submit" type="primary" size="large">下一步</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import {INIT_FORM_INFO} from '@/vuex/actions_types'
import {INIT_FORM_DATA,UPDATA_RESUME_INFO} from '@/vuex/mutations_types'
import { Toast,Indicator  } from 'mint-ui';
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isInit:false,
      avatarUrl:'',
      form:{
        header_url:null,
        formid:'knowyou',
        name:'',
        sex:'',
        birth:'',
        education:'',
        work_join_date:''
      },
      options:{
        sex:[{label:'男',value:'男'},{label:'女',value:'女'}],
        education:[{label:'中专',value:'1'},{label:'高中',value:'2'},{label:'大专',value:'3'},{label:'本科',value:'4'},{label:'硕士',value:'5'},{label:'博士',value:'6'}]
      }
    }
  },
  computed:mapState({
    resumeInfo:state => state.login.userInfo.resumeInfo,
  }),
  methods:{
    /**
     * 提交
     */
    submit(){
      let formData = new FormData();
      try{
        this.form.header_url = this.avatarToBlob(this.avatarUrl)
      } catch(err) {
        return    Toast({
          message: '请上传头像',
          position: 'bottom',
          duration: 3000
        })
      }
      
      for(let key in this.form){
      
      // !!
        if(key == 'header_url'){
          formData.append(key,this.form[key],'blob.jpg');
          continue 
        }


        if(!this.form[key]){
          return    Toast({
            message: '请先完善信息',
            position: 'bottom',
            duration: 3000
          })
        }
        formData.append(key,this.form[key])
      }
      formData.append('mobile',this.$store.state.login.userInfo.telephone)
      Indicator.open()
      this.$api.login.createResume(formData)
        .then(res => {
          Indicator.close();
          if(res.data.error == 0){
            this.$store.commit(UPDATA_RESUME_INFO,res.data.data)
            this.$router.push('/login/intention')
          }
        })
        .catch(err => {
          Indicator.close()
        })
    },
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
     * url转blob
     */
    avatarToBlob(dataurl){
      let arr = dataurl.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      let blob = new Blob([u8arr], {type:mime});
      return blob
    },
    /**
     * 获取头像
     */
    uploadAvatar(e){
      let file = e.target.files[0] || e.dataTransfer.files[0];
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = readerEvent => {
        this.avatarUrl = readerEvent.target.result;
      }
      this.form.header_url = file

      // let formData = new FormData();

      // formData.append('header_url',file);
      // this.$api.login.uploadAvatar(formData,progressEvent => {
      //   console.log(progressEvent)
      // })
      //   .then(res => {
      //     this.avatarUrl = res.data.data.header_url
      //     this.form.header_url = res.data.data.header_url
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    initData(){
      if(!this.isInit && this.$route.query.isGuess){
        this.form.name = this.resumeInfo.name
        this.form.sex = this.resumeInfo.sex
        this.form.birth = this.resumeInfo.birth
        this.form.sex = this.resumeInfo.sex
        this.form.work_join_date = this.resumeInfo.work_join_date
        this.options.education.forEach(item => {
          if(item.label == this.resumeInfo.education){
            this.form.education = item.value
          }
        })
        this.isInit = true
      }
    }
  },
  activated(){
    this.initForm()
    this.initData()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.content
  padding-top 0.5rem
  .avatar
    border-radius 50%
    background-color #ccc
    width 0.72rem
    height 0.72rem
    margin 0.15rem auto 0.2rem
    overflow hidden
    background-size cover
    background-image url('../static/imgs/photo.png')
    input
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      opacity: 0
  .submit-box
    padding 0.1rem
</style>
