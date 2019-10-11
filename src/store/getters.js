export const getters = {
// 如果本地的vuex的state没了，先从localStorage获取
  getUserToken: (state) => {
    // console.log('TEST')
    if (!state.token) {
      state.token = localStorage.token
    }
    return state.token
  },
  // 这里的user是一个字典
  getUser: (state) => {
    return state.user
  }

}
export default getters
