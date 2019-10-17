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
    return state.user
  },
  sidebar: state => state.sidebar,
  device: state => state.device

}
export default getters
