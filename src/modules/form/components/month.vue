<template>
  <div class="month">
        <goback-nav :submit="submit">{{label}}</goback-nav>
    <div class="content">
      <mt-picker ref="picker" :slots="slots" @change="onValuesChange"></mt-picker>
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
      newValue:'',
      slots: [
        {
          flex: 1,
          values: ["1950", "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010"],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    }
  },
  computed:mapState({
    label:state => state.form.label,
    value:state => state.form.value,
    name:state => state.form.name,
    form:state => state.form.form,
    vm:state => state.form.vm,
  }),
  methods:{
    submit(){
      this.newForm[this.name] = this.newValue
      this.$store.commit(INIT_FORM_DATA,this.newForm)
      this.$router.go(-1)
    },
    onValuesChange(picker, values) {
      this.newValue = values[0] + '/' + values[1]
    }
  },
  activated(){
    this.newForm = JSON.parse(JSON.stringify(this.form))
    this.newValue = this.value || '1980/01'
    this.$refs.picker.setValues(this.newValue.split('/'))
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
