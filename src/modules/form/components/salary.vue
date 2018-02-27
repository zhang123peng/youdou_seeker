<template>
  <div class="salary">
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
      intent_min_salary:'1000',
      intent_max_salary:'1000',
      slots: [
        {
          flex: 1,
          values: ["1000","2000","3000","4000","5000","6000","7000","8000","9000","10000","11000","12000","13000","14000","15000","16000","17000","18000","19000","20000","21000","22000","23000","24000","25000","26000","27000","28000","29000","30000","31000","32000","33000","34000","35000","36000","37000","38000","39000","40000","41000","42000","43000","44000","45000","46000","47000","48000","49000","50000","51000","52000","53000","54000","55000","56000","57000","58000","59000","60000","61000","62000","63000","64000","65000","66000","67000","68000","69000","70000","71000","72000","73000","74000","75000","76000","77000","78000","79000","80000","81000","82000","83000","84000","85000","86000","87000","88000","89000","90000","91000","92000","93000","94000","95000","96000","97000","98000","99000","100000","110000","120000","130000","140000","150000","160000","170000","180000","190000","200000","210000","220000","230000","240000","250000","260000"],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ["1000","2000","3000","4000","5000","6000","7000","8000","9000","10000","11000","12000","13000","14000","15000","16000","17000","18000","19000","20000","21000","22000","23000","24000","25000","26000","27000","28000","29000","30000","31000","32000","33000","34000","35000","36000","37000","38000","39000","40000","41000","42000","43000","44000","45000","46000","47000","48000","49000","50000","51000","52000","53000","54000","55000","56000","57000","58000","59000","60000","61000","62000","63000","64000","65000","66000","67000","68000","69000","70000","71000","72000","73000","74000","75000","76000","77000","78000","79000","80000","81000","82000","83000","84000","85000","86000","87000","88000","89000","90000","91000","92000","93000","94000","95000","96000","97000","98000","99000","100000","110000","120000","130000","140000","150000","160000","170000","180000","190000","200000","210000","220000","230000","240000","250000","260000"],
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
      this.newForm.intent_min_salary = this.intent_min_salary
      this.newForm.intent_max_salary = this.intent_max_salary
      this.$store.commit(INIT_FORM_DATA,this.newForm)
      this.$router.go(-1)
    },
    onValuesChange(picker, values) {
      if (+values[0] > +values[1]) {
        picker.setSlotValue(1, values[0]);
      }
      this.intent_min_salary = values[0]
      this.intent_max_salary = values[1]
    }
  },
  activated(){
    this.newForm = JSON.parse(JSON.stringify(this.form))
    this.$refs.picker.setValues(this.newForm.intent_min_salary && this.newForm.intent_max_salary ? [this.newForm.intent_min_salary,this.newForm.intent_max_salary] : ['1000','1000'])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
