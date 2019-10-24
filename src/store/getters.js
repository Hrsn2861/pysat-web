export const getters = {
// 如果本地的vuex的state没了，先从localStorage获取
  getUserToken: (state) => {
    if (!state.token) {
      if (localStorage.getItem('token') != null) {
        state.token = localStorage.token
      } else {
        return state.token
      }
    }
    return state.token
  },
  // 这里的user是一个字典
  getUser: (state) => {
    if (!state.user) {
      if (localStorage.getItem('identity') != null) {
        state.user = localStorage['identity']
        // 这里的user都只是一个名字
      }
    }
    return state.user
  },
  getUserNameFromSessionId: (state) => {
    return state.chatSystem.sessions[state.chatSystem.currentSessionId].user // 通过sessionid返回用户名
  },
  sidebar: state => state.sidebar,
  device: state => state.device

}
export default getters
