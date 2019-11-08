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

  getPermission_Public: (state) => {
    if (!state.permission_public) {
      if (localStorage.getItem('permission_public') != null) {
        state.permission_public = localStorage['permission_public']
      }
    }
    return state.permission_public
  },
  getPermission_Private: (state) => {
    if (!state.permission_private) {
      if (localStorage.getItem('permission_private') != null) {
        state.permission_private = localStorage['permission_private']
      }
    }
    return state.permission_private
  },

  getSchool_Name: (state) => {
    if (!state.school_name) {
      if (localStorage.getItem('school_name') != null) {
        state.school_name = localStorage['school_name']
      }
    }
    return state.school_name
  },

  getSchool_Id: (state) => {
    if (!state.school_id) {
      if (localStorage.getItem('school_id') != null) {
        state.school_id = localStorage['school_id']
      }
    }
    return state.school_id
  },

  getUserNameFromSessionId: (state) => {
    return state.chatSystem.sessions[state.chatSystem.currentSessionId].user // 通过sessionid返回用户名
  },
  sidebar: state => state.sidebar,
  device: state => state.device

}
export default getters
