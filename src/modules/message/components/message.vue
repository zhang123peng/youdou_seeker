<template>
  <div class="message">
    <div class="header">
      <span class="title">消息</span>
      <span @click="$router.push('/message/work_manage')" class="work-manage">工作管理</span>
    </div>
    <div class="doudou-box">
      <div class="doudou">
        <router-link tag="div" :to="'/chat/'+doudou.theme_id" class="doudou-item">
          <div class="avatar"></div>
          <div class="message-info">
            <div class="job-name">有豆小助手</div>
            <div class="job-info">求职中遇到任何问题都可以问我哟</div>
            <div class="job-info">帮助&反馈</div>
          </div>
          <div class="message-ft">
            <div class="message-time">
              <span>{{doudou.update_at}}</span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="line"></div>
    </div>
    <div class="message-list">
      <ul>
        <router-link tag="li" :to="'/chat/'+item.theme_id" v-for="(item,index) in messageList" :key="index">
          <div class="avatar" :style="'background-image:url('+item.business_logo+')'"></div>
          <div class="message-info">
            <div class="job-name">{{item.job_name}}</div>
            <div class="job-info">{{item.business_name}}</div>
            <div class="job-info">{{item.business_address.slice(0,5)}}</div>
          </div>
          <div class="message-ft">
            <div class="message-time">
              <span>{{item.update_at}}</span>
            </div>
            <div v-show="item.is_read == 1" class="is-read">已读</div>
            <div v-show="item.is_read == 0" class="not-read">未读</div>
          </div>
        </router-link>
      </ul>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      doudou:{},
      messageList:[],
      timer:null
    }
  },
  methods:{
    getList(){
      this.$api.message.getMessaheList()
        .then(res => {
          if(res.data.error == 0) {
            this.doudou = res.data.data.splice(0,1)[0]
            this.messageList = res.data.data
          }
        })
    }
  },
  activated(){
    if(!this.$store.state.login.loginState){
      return this.$router.replace('/login')
      clearInterval(this.timer)
    }
    this.getList()
    this.timer = setInterval(() => {
      this.getList()
    },3000)
  },
  deactivated(){
    clearInterval(this.timer)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.message
  padding-top 1.36rem
  padding-bottom 0.5rem
  box-sizing border-box
  height 100%
  .line
    background-color #eee
    height 0.1rem
  .header
    position absolute
    top 0
    left 0
    width 100%
    background-color rgb(231, 95, 21);
    line-height 0.46rem
    text-align center
    color #fff
    .title
      font-size 0.16rem
    .work-manage
      position absolute
      padding 0 0.15rem
      right 0
      top 0
  .doudou-box
    position absolute
    box-sizing border-box
    padding 0 
    top 0.46rem
    left 0
    width 100%
    .doudou
      height 0.8rem
      .avatar
        background-image url('../static/imgs/doudouavatar.png')
  .message-list
    height 100%
    overflow-y auto
  .message-list
  .doudou-box
    ul
    .doudou
      padding 0 0.15rem
    li
    .doudou-item
      position relative
      padding 0.15rem 0.6rem
      height 0.5rem
      border-bottom 1px solid #eee
      .avatar
        position absolute
        top 0.15rem
        left 0
        width 0.5rem
        height 0.5rem
        border-radius 50%
        background-color #eee
        background-size cover
        background-position center
      .message-info
        .job-name
          line-height 0.18rem
        .job-info
          line-height 0.16rem
          color #999
      .message-ft
        position absolute
        right 0
        top 0.15rem
        text-align right
        .message-time
          color #999
          padding-bottom 0.2rem
        .is-read
        .not-read
          display inline-block
          line-height 0.18rem
          height 0.18rem
          font-size 0.12rem
          padding 0 0.05rem
          border-radius 2px
          color #fff
        .is-read
          background-color green
        .not-read
          background-color #999


</style>
