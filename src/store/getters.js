export const getters = {
// 如果本地的vuex的state没了，先从localStorage获取
  getUserToken: (state) => {
    // console.log('TEST')
    if (!state.token) {
      state.token = localStorage.token
    }
    return state.token
  },
  getUserIdentity: (state) => {
    if (!state.user.token) {
      state.user = {

        token: localStorage.token
      }
    }
    return state.user.identity
  },
  getUser: (state) => {
    if (!state.user.token) {
      state.user = {

        token: localStorage.token
      }
    }
    return state.user
  }

}
export default getters
