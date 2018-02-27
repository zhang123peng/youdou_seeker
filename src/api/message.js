import axios from './interceptors'
import {API_ROOT} from './config'

/**
 * 获取消息列表
 */
export const getMessaheList = () => axios.get(API_ROOT + 'chat/index')

/**
 * 创建消息
 * @param {*信息} info 
 */
export const sendMessage = info => axios.post(API_ROOT + 'chat/create',info)

/**
 * 获取消息详情
 * @param {*条件} option 
 */
export const getChat = option => axios.get(API_ROOT + 'chat/view',{params:option})

/**
 * 答复面试或offer
 * @param {*答复信息} info 
 */
export const replyInterview = info => axios.post(API_ROOT + 'interview/update_status',info)

/**
 * 获取工作管理列表
 * @param {*过滤条件} filter 
 */
export const getWorkList = filter => axios.get(API_ROOT + 'invitation/index',{params:filter})