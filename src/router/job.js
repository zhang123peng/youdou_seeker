import job from '@/modules/job/components/job'
import jobDetail from '@/modules/job/components/job_detail'
import companyDetail from '@/modules/job/components/company_detail'

export default [{
  path:'/job',
  name:'job',
  component:job
},{
  path:'/job/job_detail/:id',
  name:'jobDetail',
  component:jobDetail
},{
  path:'/job/company_detail/:id',
  name:'companyDetail',
  component:companyDetail
}]