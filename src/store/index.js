import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const now = new Date()

const state = {
  token: '',
  user: null,

  // view-related
  sidebar: {
    opened: !+localStorage.getItem('sidebarStatus')
  },
  device: 'desktop',

  chatSystem: {
    sessions: [{
      id: 1,
      user: {
        name: '陈旭',
        img: '../../assets/cx.png'
      },
      messages: [{
        content: '我明天都是课',
        date: now
      }, {
        content: '不过也无所谓',
        date: now
      }, {
        content: '有人出来学习吗',
        date: now
      }]
    }, {
      id: 2,
      user: {
        name: 'PYSAT官方',
        img: '../../assets/logo.png'
      },
      messages: [{
        content: 'Hi，我是webpack哦',
        date: now
      }]
    }],
    currentSessionId: 1,
    filterKey: ''
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
