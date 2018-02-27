import message from '@/modules/message/components/message'
import chat from '@/modules/message/components/chat'
import interview from '@/modules/message/components/interview'
import refuse from '@/modules/message/components/refuse'
import success from '@/modules/message/components/success'
import workManage from '@/modules/message/components/work_manage'

export default [{
  path: '/message',
  name:'message',
  component: message
},{
  path: '/chat/:id',
  name:'chat',
  component: chat
},{
  path: '/message/interview',
  name:'interview',
  component: interview
},{
  path: '/message/refuse',
  name:'refuse',
  component: refuse
},{
  path: '/message/success',
  name:'success',
  component: success
},{
  path: '/message/work_manage',
  name:'work_manage',
  component: workManage
}]