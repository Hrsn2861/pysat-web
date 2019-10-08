import * as types from './mutation-types'

export const mutations = {
  // 这里的data指提交时：
  // 从/api/login传回的user对象，其中包含name,messeage等信息
  [types.LOGIN] (state, data) {
    state.user.name = data.name
    state.user.token = data.token // TODO: 姑且认为这里有token
    localStorage.setItem('user', data.name)
    // localStorage
    // localStorage.setItem('session', data.session.user)
  },
  [types.DELSESSION] (state) {
    localStorage.removeItem('session')
  },
  [types.LOGINOUT] (state) {
    state.user = {}
    localStorage.removeItem('user')
  },
  [types.TESTFUNC] (state) { // For test only
    state.user = {
      name: 'ADMIN',
      token: '000000'
    }
    console.log('Hello World')
  }
}

export default mutations
