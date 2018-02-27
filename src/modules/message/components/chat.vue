<template>
  <div ref="chat" class="chat" :style="'padding-bottom:' + (quickReplyVisble ? '1.6rem':'0.5rem')">
    <goback-nav>{{isDoudou ? '有豆小助手' : companyInfo.business_name}}</goback-nav>
    <div class="chat-list">
      <mt-loadmore :top-method="getOldChats" ref="loadmore">
      <ul class="chat-list-container">
        <router-link tag="li" :to="'/job/job_detail/'+jobInfo.job_id" class="job-info" v-if="!isDoudou">
          <div class="job-name">{{jobInfo.job_name}}</div>
          <div class="job-detail">
            <span>  
              <i class="iconfont icon-position"></i>
              <span v-if="jobInfo.job_address">{{jobInfo.job_address.slice(0,5)}}</span>
            </span>
            <span>  
              <i class="iconfont icon-gongzuojingyan"></i>
              <span>{{jobInfo.experience}}</span>
            </span>
            <span>  
              <i class="iconfont icon-education"></i>
              <span>{{jobInfo.education}}</span>
            </span>
          </div>
          <div class="welfare">
            <ul class="clearfix">
              <li v-for="(item,index) in companyInfo.businfo_welfare" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="salary">
            {{jobInfo.job_min_salary == jobInfo.job_max_salary ? 
              jobInfo.job_min_salary == 0 ? '面议':jobInfo.job_min_salary  
              : jobInfo.job_min_salary + '-' + jobInfo.job_max_salary}}
          </div>
          <div class="distance">{{jobInfo.distance}}</div>
        </router-link>

        <li v-for="(item,index) in chats" :key="index" :class="item.send_role == 1 ? 'right' : 'left'" class="chat-item clearfix">
          <div class="avatar" v-show="item.send_role != 3" :style="'background-image:url('+item.sender_header_url+')'"></div>
          <div class="avatar doudou"  v-show="item.send_role == 3"></div>
          <div class="chat-item-content" @click="handleChatTap(item)">
            <i class="arrow"></i>
            <span>{{item.chat_content}}</span>
            <span v-show="item.is_read == '1'" class="is-read">已读</span>
            <span v-show="item.is_read == '0'" class="not-read">未读</span>
          </div>
          <div class="chat-time">{{item.create_at}}</div>
        </li>

        <li class="end-item" ref="end"></li>
      </ul>
      </mt-loadmore>
    </div>
    <div ref="inputbar" class="input-bar">
      <div class="input-container">
        <form @submit.prevent="sendMessage">
          <input ref="input" type="text" v-model="inputValue" @focus="handleInputFocus(true)" @blur="handleInputFocus(false)" placeholder="请输入需要回复的内容">
        </form>
      </div>
      <div class="add-button" @click="showQuickReply">
        <i v-show="!quickReplyVisble" class="iconfont icon-msg1"></i>
        <i v-show="quickReplyVisble" class="iconfont icon-keyboard"></i>
      </div>
      <div  class="mark"></div>
      <div class="quick-reply-container" v-show="quickReplyVisble">
        <div class="quick-reply">
          <ul>
            <li @click="handleQuickReplyTap(item.value)" v-for="(item,index) in quickReply" :key="index">{{item.value}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SET_MESSAGE_INTERVIEW_INFO,SET_MESSAGE_JOB_INFO } from '@/vuex/mutations_types'
export default {
  data () {
    return {
      inputFocus:false,
      isDoudou:false,
      inputValue:'',
      theme_id:'',
      companyInfo:{},
      jobInfo:{},
      chats:[],
      user_id:'',
      canGetNewChats:true,
      timer:null,
      quickReplyVisble:false,
      quickReply:[{value:'可以把我的简历发给您看看吗？'},{value:'我可以去贵公司面试吗？'},{value:'对不起，该职位不太适合我，祝您早日找到满意的人选'}]
    }
  },
  methods:{
    handleInputFocus(isFocus){
      this.inputFocus = isFocus
      if(isFocus){
        this.$refs.chat.style.height = 'auto'
      } else {
        this.$refs.chat.style.height = ''
      }


    },
    //初始化对话框
    initChat(){
      this.$api.message.getChat({
        theme_id:this.theme_id
      })
        .then(res => {
          if(res.data.error == 0) {
            if(res.data.data.business_id == 0){
              this.isDoudou = true
            } else {
              this.companyInfo = res.data.data.businessInfo
              this.jobInfo = res.data.data.jobInfo
            }
            this.chats = res.data.data.chats
            this.user_id = res.data.data.user_id
            this.$nextTick(() => {
              this.$refs.end.scrollIntoView()
            })
            this.getNewChats()
          }
        })
    },
    showQuickReply(){
      if(!this.quickReplyVisble && this.inputValue) {
        this.sendMessage()
      } else {
        this.quickReplyVisble = !this.quickReplyVisble
      }
    },
    sendMessage(){
      if(!this.inputValue) return
      this.$api.message.sendMessage({
        theme_id:this.theme_id,
        type:1,
        content:this.inputValue,
        receive_role: this.isDoudou ? 3 : 1 ,
        receive_id:this.user_id
      })
      
      this.$refs.input.blur()
      this.inputValue = ''
    },
    getNewChats(){
      if(!this.canGetNewChats){
        return this.timer = setTimeout(() => {
          this.getNewChats()
        },3000)
      }
      let arr = []
      if(!this.chats[0]){
        return this.timer = setTimeout(() => {
          this.initChat()
        },3000)
      }
      let chatId = this.chats[0].chat_id
      for(let item of this.chats){
        if(item.is_read == 1){
          chatId = item.chat_id
          arr.push(item)
        } else {
          break
        }
      }
      if(!arr.length){
        return this.timer = setTimeout(() => {
          this.initChat()
        },3000)
      }
      let long = this.chats.length
      this.$api.message.getChat({
        theme_id:this.theme_id,
        pull_way:1,
        chat_id:chatId
      })
        .then(res => {
          if(res.data.error == 0) {
            if(!this.canGetNewChats){
              return this.timer = setTimeout(() => {
                this.getNewChats()
              },3000)
            }
            this.chats = arr.concat(res.data.data.chats)
            //有新消息则跳到底部
            if(this.chats.length > long){
              this.$nextTick(() => {
                this.$refs.end.scrollIntoView()
              })
            }
            this.timer = setTimeout(() => {
              this.getNewChats()
            },2000)
          }
        })
    },
    getOldChats(){
      this.canGetNewChats = false
      this.$api.message.getChat({
        theme_id:this.theme_id,
        pull_way:0,
        chat_id:this.chats[0].chat_id
      })
        .then(res => {
          this.canGetNewChats = true
          this.$refs.loadmore.onTopLoaded();
          if(res.data.error == 0){
            this.chats = res.data.data.chats.concat(this.chats)
          }
        })
        .catch(err => {
          this.canGetNewChats = true
          this.$refs.loadmore.onTopLoaded();
        })
    },
    handleChatTap(info){
      if(info.chat_type == 1) return
      this.$store.commit(SET_MESSAGE_INTERVIEW_INFO,info.interview.interviewInfo)
      this.$store.commit(SET_MESSAGE_JOB_INFO,info.interview.jobInfo)
      this.$router.push('/message/interview')
    },
    handleQuickReplyTap(value){
      this.quickReplyVisble = false
      this.$api.message.sendMessage({
        theme_id:this.theme_id,
        type:1,
        content:value,
        receive_role: this.isDoudou ? 3 : 1 ,
        receive_id:this.user_id
      })
    }
  },
  activated(){
    this.theme_id = this.$route.params.id
    this.initChat()
  },
  deactivated(){
    clearTimeout(this.timer)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.chat
  padding-top 0.4rem
  padding-bottom 0.5rem
  box-sizing border-box
  height 100%
  bottom 0
  .chat-list
    height 100%
    overflow-y auto
    background-color #f2f2f2
    -webkit-overflow-scrolling: touch
    .chat-list-container
      padding 0.15rem 0.2rem
      .job-info 
        position relative
        background-color #fff
        padding 0.1rem
        margin-bottom 0.1rem
        .job-name
          line-height 0.3rem
          font-size 0.2rem
        .job-detail
          line-height 0.3rem
          color #999
        .salary
          position absolute
          right 0.1rem
          top 0.1rem
          line-height 0.3rem
          font-size 0.2rem
          color #e75f15
        .distance
          position absolute
          right 0.1rem
          top 0.4rem
          line-height 0.3rem
          color #999
        .welfare
          ul
            padding 0.05rem 0
            li
              float left
              background-color #e75f15
              color #fff
              border-radius 2px
              line-height 0.24rem
              padding 0 0.08rem
              margin-right 0.1rem
      .chat-item
        position relative
        min-height 0.5rem
        margin-bottom 0.3rem
        .avatar
          position absolute
          top 0
          height 0.5rem
          width 0.5rem
          background-color #aaa
          border-radius 50%
          background-size cover
          background-position center
          overflow hidden
          &.doudou
            background-image url('../static/imgs/doudouavatar.png')
        .chat-item-content
          position relative
          word-break break-all
          padding 0.1rem
          line-height 0.2rem
          border-radius 3px
          max-width 2.1rem
          .arrow
            position absolute
            top 0.1rem
            border 8px solid transparent
          .is-read
          .not-read
            position absolute
            top 0
            line-height 0.2rem
            font-size 0.12rem
            color #fff
            border-radius 2px
            padding 0 0.05rem
          .is-read
            background-color green
          .not-read
            background-color #999
        .chat-time
          position absolute
          left 0
          bottom -0.3rem
          width 100%
          text-align center
          color #999
          line-height 0.3rem
      .chat-item.left
        padding-left 0.6rem
        .avatar
          left 0
        .chat-item-content
          float left
          background-color #fff
          color #333
          .arrow
            left 0rem
            margin-left -14px
            border-right-color #fff
          .is-read
          .not-read
            right -0.45rem
      .chat-item.right
        padding-right 0.6rem
        .avatar
          right 0
        .chat-item-content
          float right
          background-color #e75f15
          color #fff
          .arrow
            right 0rem
            margin-right -14px
            border-left-color #e75f15
          .is-read
          .not-read
            left -0.45rem


  .input-bar
    position absolute
    background-color #fff
    left 0
    bottom 0
    width 100%
    box-sizing border-box
    .input-container
      position relative
      height 0.5rem
      padding-left 0.1rem
      padding-right 0.5rem
      input
        position relative
        display block
        padding 0 0.1rem
        top 0.08rem
        left 0
        height 0.34rem
        width 100%
        box-sizing border-box
        border 1px solid #ddd
    .add-button
      position absolute
      top 0
      right 0
      line-height 0.5rem
      width 0.5rem
      height 0.5rem
      text-align center
      i
        font-size 0.24rem
        color #e75f15
    .quick-reply-container
      .quick-reply
        padding 0 0.1rem
        li
          font-size 0.13rem
          line-height 0.36rem
          border-bottom 1px solid #eee
          &:last-of-type
            border-bottom none
</style>
