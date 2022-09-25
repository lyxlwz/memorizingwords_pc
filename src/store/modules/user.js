import Vue from 'vue'
import { resetRouter } from '@/router/index'
import { getUserInfo } from '@/api/url'
import Cookies from 'js-cookie'

const userInfoString = localStorage.getItem('userInfo')
const userInfo = JSON.parse(userInfoString || '{}')
const state = {
  userInfo: userInfo || {},
  userId: userInfo.userId || '',
  userName: userInfo.userName || '',
  userNickName: userInfo.userNickName || '',
  roleId: userInfo.userId || '',
  roles: userInfo.roles || [],
  avatar: userInfo.avatar || '',
  token: userInfo.token || ''
}

const getters = {
  getAvatar(state) {
    return state.avatar
    // return state.avatar || require('@/assets/img_avatar_example.gif')
  },
  getUserName(state) {
    return state.userName
  },
  getNickName(state) {
    return state.userNickName
  },
  getRoles(state) {
    return state.roles
  },
  getUserInfo(state) {
    return state.userInfo
  }
}

const actions = {
  saveUserInfo({ commit }, userInfo) {
    Vue.prototype.$get({
      url: getUserInfo,
      data: {
        date: new Date().format('yyyy-MM-dd')
      }
    }).then((res) => {
      const obj = { ...userInfo, ...res }
      commit('SAVE_USER_INFO', obj)
    })
  },
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        dispatch('router/delAllRoute', null, { root: true })
        commit('LOGOUT')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

const mutations = {
  SAVE_USER_INFO(state, userInfo) {
    state.userId = userInfo.userId
    state.userName = userInfo.userName
    state.userNickName = userInfo.userNickName
    state.avatar = userInfo.avatar
    state.roleId = userInfo.roleId
    state.roles = userInfo.roles
    state.token = userInfo.token
    state.userInfo = userInfo
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  },
  LOGOUT(state) {
    // 这里只是在本地模拟删除了用户信息，在真实场景下需要 调后台登出接口 来真正实现登出功能
    state.userId = ''
    state.userName = ''
    state.userNickName = ''
    state.roleId = ''
    state.roles = []
    state.avatar = ''
    state.token = ''
    resetRouter()
    Cookies.remove('x-token')
    localStorage.removeItem('userInfo')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
