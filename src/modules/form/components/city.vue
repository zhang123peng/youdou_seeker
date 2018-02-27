<template>
  <div class="form-city">
    <goback-nav>选择城市</goback-nav>
    <div class="curren-city clearfix">
      <div @click="selectCity(currentCity)" class="current-city-item fl">{{currentCity.name}}</div>
      <div class="get-position fl" @click="getPosition()">
        <i class="iconfont icon-position"></i>
        <span>重新定位</span>
      </div>
    </div>
    <div class="hot-city">
      <div class="title">热门城市</div>
      <div class="city-box clearfix">
        <div v-for="(item,index) in cityOption.hot_city" :key="index" @click="selectCity(item)" class="city-item fl">{{item.name}}</div>
      </div>
    </div>
    <div class="city-list" v-for="(group,groupName) in cityOption.areaall" :key="groupName">
      <div class="title">{{groupName}}</div>
      <div class="city-box clearfix">
        <div v-for="(item,index) in group" :key="index" @click="selectCity(item)" class="city-item fl">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_CITY_OPTION } from '@/vuex/actions_types'
import { SET_FORM_CITY } from '@/vuex/mutations_types'
import { mapState } from 'vuex'
import { Toast,Indicator } from 'mint-ui';
export default {
  data () {
    return {
      currentCity:{}
    }
  },
  computed:mapState({
    cityOption:state => state.option.cityOption
  }),
  methods:{
    getOptions(){
      if(!this.cityOption.areaall){
        this.$store.dispatch(GET_CITY_OPTION)
      }
    },
    selectCity(city){
      this.$store.commit('SET_FORM_CITY',city)
      this.$router.go(-1)
    },
    getPosition(){
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          this.$api.option.getCurrentCity({longitude:position.coords.longitude,latitude:position.coords.latitude})
            .then(res => {
              if(res.data.error == 0){
                this.selectCity(this.res.data.data)
              }
            })
            .catch(err => {
            })
        },err => {
          this.$Toast({
            message: '获取定位失败',
            position: 'bottom',
            duration: 3000
          })
        },{
            enableHighAcuracy:true,
            timeout: 5000
          });
      }else{
        this.$Toast({
          message: '无法获取定位',
          position: 'bottom',
          duration: 3000
        })
      }
    }
  },
  activated(){
    this.getOptions()
    this.currentCity = this.$route.query
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.form-city
  padding-top 0.4rem
  .curren-city
    height 0.4rem
    border-bottom 1px solid #eee
    padding 0.2rem 0.15rem 0
    line-height 0.26rem 
    .current-city-item
    .get-position
      padding 0 0.1rem
      margin-right 0.2rem
      border-radius 2px
    .current-city-item
      background-color rgb(231, 95, 21)
      color #fff
    .get-position
      border 1px solid  rgb(231, 95, 21)
      color rgb(231, 95, 21)
  .hot-city
  .city-list
    padding 0  0.15rem
    border-bottom 1px solid #eee
    .title
      line-height 0.3rem
    .city-box
      .city-item
        line-height 0.26rem
        padding 0 0.29rem
        margin-right 0.15rem
        margin-bottom 0.15rem
        border-radius 2px
        background-color #eee
</style>
