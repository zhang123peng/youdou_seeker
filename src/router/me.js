import me from '@/modules/me/components/me'
import resetTelephone from '@/modules/me/components/reset_telephone'
import resetPassword from '@/modules/me/components/reset_password'
import updateResume from '@/modules/me/components/update_resume'
import updateUserinfo from '@/modules/me/components/update_userinfo'
import workExp from '@/modules/me/components/work_exp'
import eduExp from '@/modules/me/components/edu_exp'
import bindEmail from '@/modules/me/components/bind_email'

export default [{
  path: '/me',
  name:'me',
  component: me
},{
  path: '/me/reset_telephone',
  name:'resetTelephone',
  component: resetTelephone
},{
  path: '/me/reset_password',
  name:'resetPassword',
  component: resetPassword
},{
  path: '/me/update_resume',
  name:'updateResume',
  component: updateResume
},{
  path: '/me/update_userinfo',
  name:'updateUserinfo',
  component: updateUserinfo
},{
  path: '/me/work_exp',
  name:'workExp',
  component: workExp
},{
  path: '/me/edu_exp',
  name:'eduExp',
  component: eduExp
},{
  path: '/me/bind_email',
  name:'bindEmail',
  component: bindEmail
}]