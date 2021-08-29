import request from '../utils/request'

export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/user/images',
    /*
        一般文件上传的接口都要求把请求头中的Content-Type
        设置为 multipart/form-data，但是我们使用axios
        上传文件的话不需要手动设置，你只要给data一个FormData 对象即可。
        new FormData()
    */
    data
  })
}

/**
 * 获取素材列表
 */
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/user/images',
    params
  })
}

/**
 * 收藏/取消收藏素材
 */
export const collectImage = (imageId, collect) => {
  return request({
    method: 'PUT',
    url: `/user/images/${imageId}`,
    data: {
      collect
    }
  })
}

/**
 * 删除素材
 */
export const deleteImage = imageId => {
  return request({
    method: 'DELETE',
    url: `/user/images/${imageId}`
  })
}