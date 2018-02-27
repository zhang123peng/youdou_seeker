import axios from './interceptors'
import {API_ROOT} from './config'


/**
 * 获取行业选项
 */
export const getIndustryOptions = () => axios.get(API_ROOT + 'industry/index')

/**
 * 获取城市列表
 */
export const getCityOptions = () => axios.get(API_ROOT + 'nearby/city')

/**
 * 根据坐标获取城市
 */
export const getCurrentCity = position => axios.post(API_ROOT + 'nearby/location',position)