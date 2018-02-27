import login from '@/modules/login/components/login'
import agreement from '@/modules/login/components/agreement'
import mobileLogin from '@/modules/login/components/mobile_login'
import passwordLogin from '@/modules/login/components/password_login'
import guess from '@/modules/login/components/guess'
import knowYou from '@/modules/login/components/know_you'
import intention from '@/modules/login/components/intention'

export default [{
  path: '/login',
  component: login,
  children:[{
    path: '',
    redirect:'mobile_login',
  },{
    path: 'mobile_login',
    name: 'mobileLogin',
    component: mobileLogin,
  },{
    path: 'password_login',
    name: 'passwordLogin',
    component: passwordLogin,
  }]
},{
  path:'/login/agreement',
  name:'agreement',
  component:agreement
},{
  path:'/login/guess',
  name:'guess',
  component:guess
},{
  path:'/login/know_you',
  name:'knowYou',
  component:knowYou
},{
  path:'/login/intention',
  name:'intention',
  component:intention
}]