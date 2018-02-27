import axios from './interceptors'
import {API_ROOT} from './config'
import qs from 'qs'

/**
 * 手机快捷登陆
 * @param {*登陆信息} info 
 */
export const mobileLogin = info => axios.post(API_ROOT + 'appuser/register',info)
// export const mobileLogin = info => axios.post(API_ROOT + 'companyuser/register',qs.stringify(info),{header:{'Content-Type':'application/x-www-form-urlencoded'}})

/**
 * 密码登陆
 * @param {*登陆信息} info 
 */
export const passwordLogin = info => axios.post(API_ROOT + 'appuser/login', info)


/**
 * 上传头像
 * @param {*发送参数} formData 
 * @param {*进度条回调} onUploadProgress 
 */
export const uploadAvatar = (formData,onUploadProgress) => axios({
  url:API_ROOT + 'appresume/update_avatar',
  method:'post',
  data:formData,
  headers: {'Content-Type': 'multipart/form-data'},
  onUploadProgress
})

/**
 * 创建简历
 * @param {*简历信息} info 
 */
// export const updateResume = info => axios.post(API_ROOT + 'appresume/update',info)
export const createResume = formData => axios({
  url:API_ROOT + 'appresume/create',
  method:'post',
  data:formData,
  headers: {'Content-Type': 'multipart/form-data'}
})

/**
 * 更新简历
 * @param {*简历信息} info 
 */
export const updateResume = info => axios.post(API_ROOT + 'appresume/update',info)

/**
 * 获取用户信息
 * @param {*简历id} id 
 */
export const getUserInfo = () => axios.get(API_ROOT + 'appuser/view')

/**
 * 获取手机验证码
 * @param {*手机号码} phone 
 */
export const sendCode = phone => axios.post(API_ROOT + 'companyuser/verifycode',phone)

/**
 * 登出
 */
export const logout = () => axios.post(API_ROOT + 'appuser/logout')