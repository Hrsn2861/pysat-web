import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
// const now = new Date()

const state = {
  token: '',
  user: null,

  // view-related
  sidebar: {
    opened: !+localStorage.getItem('sidebarStatus')
  },
  device: 'desktop',

  chatSystem: {
    sessions: [],
    msgCount: 0, // 未读消息总数
    currentSessionId: 0,
    filterKey: '',
    currentSession: {
      chatUser: '',
      totCount: 0,
      nowCount: 0,
      msgList: []
    }
  }
}

// state.watch(function (state) {
//   return state.sessions
// }, function (val) {
//   console.log('CHANGE: ', val)
//   localStorage.setItem('vue-chat-session', JSON.stringify(val))
// }, {
//   deep: true/* 这个貌似是开启watch监测的判断,官方说明也比较模糊*/
// })

export default new Vuex.Store({

  state,
  mutations,
  actions,
  getters
})
