import { Toast  } from 'mint-ui';

//手机号验证
export const verifyPhone = phone => {
  if(!/^1\d{10}$/.test(phone)){
    Toast({
      message: '手机号为空或格式不正确',
      position: 'bottom',
      duration: 3000
    })
    return false
  } else {
    return true
  }
}

//验证码验证
export const verifyCode = code => {
  if(!/^[0-9]{4}$/.test(code)){
    Toast({
      message: '验证码为空或格式不正确',
      position: 'bottom',
      duration: 3000
    })
    return false
  } else {
    return true
  }
}

//密码验证
export const verifyPassword = password => {
  if(!/^[a-zA-Z\d_]{8,16}$/.test(password)){
    Toast({
      message: '密码格式不正确',
      position: 'bottom',
      duration: 3000
    })
    return false
  } else {
    return true
  }
}