import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}
// 获取文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/channels'
  })
}
// 根据id删除文章
export const deleteArticle = target => {
  return request({
    method: 'DELETE',
    url: '/articles/' + target
  })
}
// 发表文章add
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/articles',
    params: {
      draft
    },
    data
  })
}

// 修改文章的评论状态
export const putCommentsStatus = ({ id, status }) => {
  return request({
    method: 'PUT',
    url: 'comments/status',
    params: {
      article_id: id
    },
    data: {
      allow_comment: status
    }
  })
}

// 根据id获取文章
export const getArticleById = target => {
  return request({
    method: 'GET',
    url: '/articles/' + target
  })
}

// 编辑文章
export const editArticle = (target, data, draft = false) => {
  return request({
    method: 'PUT',
    url: '/articles/' + target,
    data,
    params: {
      draft
    }
  })
}