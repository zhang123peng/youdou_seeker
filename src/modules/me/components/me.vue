<template>
  <div class="me">
    <div class="header">
      <span class="title">我的</span>
      <span class="logout" @click="logout">退出</span>
    </div>
    <div v-if="userInfo" class="user-info">
      <div class="avatar" :style="'background-image:url('+userInfo.header_url+')'"></div>
      <div class="username">{{userInfo.username}}</div>
      <div class="e-mail">{{userInfo.email}}</div>
      <router-link to="/me/update_resume" class="complete-resume">
        <span>完善简历</span>
        <i class="iconfont icon-xiangyou"></i>
      </router-link>
      <div class="info-count">
        <div class="deliver">
          <div class="count">{{userInfo.delivery_count}}</div>
          <div class="label">投递</div>
        </div>
        <div class="invite">
          <div class="count">{{userInfo.borwse_count}}</div>
          <div class="label">邀约</div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="manage">
      <ul class="cells">
        <router-link tag="li" to="/me/collection" class="cell">
          <div class="cell-label">
            <span>收藏管理</span>
          </div>
          <div class="cell-ft">
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </router-link>
        <router-link tag="li" to="/message/work_manage" class="cell">
          <div class="cell-label">
            <span>工作管理</span>
          </div>
          <div class="cell-ft">
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </router-link>
      </ul>
    </div>
    <div class="line"></div>
    <div class="edit-info">
      <ul class="cells">
        <router-link to="/me/reset_telephone" tag="li" class="cell">
          <div class="cell-label">
            <span>修改手机号</span>
          </div>
          <div class="cell-ft">
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </router-link>
        <router-link to='/me/reset_password' tag="li" class="cell">
          <div class="cell-label">
            <span>修改密码</span>
          </div>
          <div class="cell-ft">
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </router-link>
      </ul>
    </div>
    <div class="line"></div>
    <div class="help">
      <ul class="cells">
        <li class="cell">
          <div class="cell-label">
            <span>下载app</span>
          </div>
          <div class="cell-ft">
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
        <li class="cell">
          <div class="cell-label">
            <span>帮助与反馈</span>
          </div>
          <div class="cell-ft">
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </li>
      </ul>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import { GET_GLOBAL_USER_INFO,LOG_OUT } from '@/vuex/actions_types'
export default {
  data () {
    return {
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.me.userInfo
    },
  },
  methods:{
    logout(){
      this.$store.dispatch(LOG_OUT)
    }
  },
  activated(){
    if(!this.$store.state.login.loginState){
      return this.$router.replace('/login')
    }
    if(!this.userInfo){
      this.$store.dispatch(GET_GLOBAL_USER_INFO)
    }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.me
  padding-bottom 0.5rem
  .line
    background-color #eee
    height 0.1rem
  .header
    position relative
    background-color rgb(231, 95, 21);
    line-height 0.46rem
    text-align center
    color #fff
    .title
      font-size 0.16rem
    .logout
      position absolute
      padding 0 0.15rem
      right 0
      top 0
  .user-info
    position relative
    padding 0.25rem 0 0
    text-align center
    line-height 0.26rem
    .avatar
      width 0.82rem
      height 0.82rem
      border-radius 50%
      background-size cover
      background-color #eee
      background-position center
      margin 0 auto
    .complete-resume
      position absolute
      top 0.5rem
      right 0.15rem
      i
        font-size 0.12rem
    .info-count
      border-top 1px solid #eee
      padding 0.15rem 0
      display flex
      .deliver
      .invite
        flex 1
        .count
          color rgb(231, 95, 21);
          font-size 0.24rem
          line-height 0.3rem
        .label
          line-height 0.2rem
      .deliver
        border-right 1px solid #eee
  .cells
    margin-top 0
    .cell-label
      line-height 0.44rem
    .cell-ft
      line-height 0.44rem
      height 0.44rem

</style>
