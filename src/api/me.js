import axios from './interceptors'
import {API_ROOT} from './config'


/**
 * 修改手机号
 * @param {*手机信息} info 
 */
export const editMobile = info => axios.post(API_ROOT + 'appuser/update_mobile',info)

/**
 * 获取用户信息
 */
export const getUserInfo = () => axios.get(API_ROOT + 'appuser/view')

/**
 * 修改密码
 * @param {*密码信息} info 
 */
export const editPassword = info => axios.post(API_ROOT + 'appuser/update_password',info)

/**
 * 创建、修改工作经历
 * @param {*工作经历} info 
 */
export const editExp = info => axios.post(API_ROOT + 'workexperience/create',info)

/**
 * 创建、修改教育经历
 * @param {*教育经历} info 
 */
export const editEdu = info => axios.post(API_ROOT + 'educational/create',info)

/**
 * 更新简历
 * @param {*resume} resume 
 */
export const editResume = resume => axios.post(API_ROOT + 'appresume/update',resume)

/**
 * 上传头像
 * @param {*头像表单} formData 
 * @param {*进度条} onUploadProgress 
 */
export const updateAvatar = (formData,onUploadProgress) => axios({
  url:API_ROOT + 'appresume/update_avatar',
  method:'post',
  data:formData,
  headers: {'Content-Type': 'multipart/form-data'},
  onUploadProgress
})

/**
 * 绑定邮箱
 * @param {*邮箱地址} email 
 */
export const bindEmail = email => axios.post(API_ROOT + 'appuser/update_email',email)