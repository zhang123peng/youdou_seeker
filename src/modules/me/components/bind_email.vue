<template>
  <div class="bind-email">
    <goback-nav :submit="submit">绑定邮箱</goback-nav>
    <div class="content">
      <input v-model="email" placeholder="请输入邮箱地址" type="text">
    </div>
  </div>
  
</template>
<script>
export default {
  data () {
    return {
      email:''
    }
  },
  methods:{
    submit(){
      this.$api.me.bindEmail({email:this.email})
        .then(res => {
          if(res.data.error == 0){
            this.$router.go(-1)
          }
        })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.bind-email
  padding-top 0.5rem
  background-color #eee
  input
    width 100%
    padding 0 0.1rem
    height 0.36rem
    line-height 0.36rem
</style>
