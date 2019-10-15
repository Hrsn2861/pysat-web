import * as types from './mutation-types'

export const mutations = {
  // 这里的data指提交时：
  // 从/api/login传回的user对象，其中包含name,messeage等信息
  [types.LOGIN] (state, data) {
    state.token = data.token // TODO: 姑且认为这里有token
    localStorage.setItem('token', data.token)
    // console.log(state.user)

    // localStorage.setItem('session', data.session.user) //另一种写法
  },
  [types.DELSESSION] (state) {
    state.token = ''
    localStorage.removeItem('token')
  }, // 我暂时不知道deleteSession是用来干什么的，可能是用户超时之后清空用的

  // CHECKSESSION实际上用来设置用户数据
  [types.CHECKSESSION] (state, data) {
    state.user = data.user
    localStorage.setItem('user', data.user)
  },

  [types.LOGOUT] (state) {
    state.user = null
  },
  [types.TESTFUNC] (state) { // For test only
    state.user = {
      name: 'ADMIN',
      token: '000000'
    }
    console.log('A test func in mutations.js')
  },

  // for view change
  [types.TOGGLE_SIDEBAR] (state) {
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarStatus', 1)
    } else {
      localStorage.setItem('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
  },
  [types.CLOSE_SIDEBAR] (state) {
    localStorage.setItem('sidebarStatus', 1)
    state.sidebar.opened = false
  },
  [types.TOGGLE_DEVICE] (state, device) {
    state.device = device
  }
}

export default mutations
