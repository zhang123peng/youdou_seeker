import axios from './interceptors'
import {API_ROOT} from './config'
import qs from 'qs'

function paramsFormat(obj){
  let result = {}
  for(let key in obj){
    if(obj[key].length!== undefined){
      result[key] =obj[key].length ? JSON.stringify(obj[key]) : ''
    } else {
      result[key] = obj[key]
    }
  }
  return result
}


/**
 * 获取岗位列表
 * @param {*筛选条件} filter 
 */
export const getJobList = filter => axios.get(API_ROOT + 'business/nearby_company',{params:paramsFormat(filter)})


/**
 * 获取岗位详情
 * @param {*岗位id} id 
 */
export const getJobDetail = id => axios.get(API_ROOT + 'businessjob/details',{params:id})

/**
 * 获取城市地区商圈
 * @param {*城市} city 
 */
export const getArea = city => axios.get(API_ROOT + 'area/business_district',{params:city})

/**
 * 投递简历
 * @param {*投递信息} info 
 */
export const creatChat = info => axios.post(API_ROOT + 'invitation/create',info)

/**
 * 获取公司详情
 * @param {*公司id} id 
 */
export const getCompanyDetail = id => axios.get(API_ROOT + 'business/company_view',{params:id})