import request from '../utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data
  })
}

export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/user/profile'
  })
}
// 编辑用户资料
export const editUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/user/profile',
    data
  })
}

export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/user/photo',
    data
  })
}