<template>
  <div class="radio">
    <goback-nav :submit="submit">{{label}}</goback-nav>
    <div class="content">
      <mt-radio
        title="单选框列表"
        v-model="newValue"
        :options="option">
      </mt-radio>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {INIT_FORM_DATA} from '@/vuex/mutations_types'
export default {
  data () {
    return {
      newForm:{},
      newValue:''
    }
  },
  computed:mapState({
    label:state => state.form.label,
    value:state => state.form.value,
    name:state => state.form.name,
    form:state => state.form.form,
    vm:state => state.form.vm,
    option:state => state.form.option,
  }),
  methods:{
    submit(){
      this.newForm[this.name] = this.newValue
      this.$store.commit(INIT_FORM_DATA,this.newForm)
      this.$router.go(-1)
    }
  },
  activated(){
    this.newForm = JSON.parse(JSON.stringify(this.form))
    this.newValue = this.value
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.content
  padding-top 0.5rem
</style>
