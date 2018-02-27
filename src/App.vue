<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {SET_TOUCH_BACK_STATUS} from '@/vuex/mutations_types'
export default {
  name: 'App',
  computed:{
    ...mapState({
      transitionName: state => state.transition.routeTransitionName
    })
  },
  methods:{
    // init(){
    //   preventTouchBack()
    //   let _this = this
    //   function preventTouchBack(){
    //     let startX = 0
    //     let distance = 0
    //     document.querySelector('body').addEventListener('touchstart', event => {
    //       startX = event.touches[0].screenX
    //     })
    //     document.querySelector('body').addEventListener('touchmove', event => {
    //       distance = event.touches[0].screenX - startX
    //     })
    //     document.querySelector('body').addEventListener('touchend', event => {
    //       console.log(distance,'distance')
    //       if(distance > 100){
    //         _this.$store.commit(SET_TOUCH_BACK_STATUS,true)
    //         _this.$Toast({
    //           message: true,
    //           position: 'bottom',
    //           duration: 3000
    //         })

    //         setTimeout(()=>{
    //           _this.$store.commit(SET_TOUCH_BACK_STATUS,false)
    //           _this.$Toast({
    //             message: false,
    //             position: 'bottom',
    //             duration: 3000
    //           })
    //         },300)
    //       }
    //       startX = distance = 0
    //     })
    //   }
    // }
  },
  mounted(){
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
html
  font-size  calc(100vw/3.75);
.app
  position absolute
  width 100%
  height 100%
.child-view {
  position absolute
  background-color #fff
  top 0
  // bottom 0
  left 0
  width 100%
  min-height 100%
  box-sizing border-box
  transition: transform .3s;
}
.slide-left-enter, .slide-right-leave-active {
  // opacity: 0;
  -webkit-transform: translate(3.75rem, 0);
  transform: translate(3.75rem, 0);
}
.slide-left-leave-active, .slide-right-enter {
  // opacity: 0;
  -webkit-transform: translate(-3.75rem, 0);
  transform: translate(-3.75rem, 0);
}
</style>
