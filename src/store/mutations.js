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
  }
}

export default mutations
