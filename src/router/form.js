import formInput from '@/modules/form/components/input'
import formRadio from '@/modules/form/components/radio'
import formMonth from '@/modules/form/components/month'
import formJob from '@/modules/form/components/job'
import formCheckbox from '@/modules/form/components/checkbox'
import formSalary from '@/modules/form/components/salary'
import formTextarea from '@/modules/form/components/textarea'
import formCity from '@/modules/form/components/city'


export default [{
  path: '/form/input',
  name: 'formInput',
  component: formInput
},{
  path: '/form/radio',
  name: 'formRadio',
  component: formRadio
},{
  path: '/form/month',
  name: 'formMonth',
  component: formMonth
},{
  path: '/form/job',
  name: 'formJob',
  component: formJob
},{
  path: '/form/checkbox',
  name: 'formCheckbox',
  component: formCheckbox
},{
  path: '/form/salary',
  name: 'formSalary',
  component: formSalary
},{
  path: '/form/textarea',
  name: 'formTextarea',
  component: formTextarea
},{
  path: '/form/city',
  name: 'city',
  component: formCity
}]