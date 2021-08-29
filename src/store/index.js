import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { login } from '@/api/user'
import { Message } from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.user || '{}')
  },
  mutations: {
    getUser(state, payload) {
      state.user = payload
      localStorage.user = JSON.stringify(payload)
    }
  },
  actions: {
    login({ commit }, payload) {
      login(payload)
        .then(res => {
          commit('getUser', res.data.data)
          Message({
            type: 'success',
            message: '登录成功'
          })
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          Message({
            type: 'warning',
            message: '手机号或验证码错误'
          })
        })
    }
  },
  modules: {
  }
})
