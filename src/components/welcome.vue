<template>
  <div class="welcome">

  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      
    }
  },
  computed:{
    isLogin(){
      return this.$store.state.login.loginState
    }
  },
  created(){
    if(this.isLogin){
      this.$router.push('/home')
    } else {
      this.$router.push('/home')
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
