import * as types from './mutation-types'
export const mutations = {
  // 这里的data指提交时：
  // 从/api/login传回的user对象，其中包含name,messeage等信息
  [types.SETUSER] (state, identity) {
    state.user = identity
    localStorage.setItem('identity', identity) // identity：强调其唯一性、主键性
    // update: 一开始这里在Login.vue被建立，但是这不是一个好的做法
    // 现在我们dispatch一个action去完成这些事情
  },

  [types.LOGIN] (state, data) {
    state.token = data.token // TODO: 姑且认为这里有token
    localStorage.setItem('token', data.token)
    // localStorage.setItem('session', data.session.user) //另一种写法
  },
  [types.DELSESSION] (state) {
    state.token = ''
    localStorage.removeItem('token')
  }, // 我暂时不知道deleteSession是用来干什么的，可能是用户超时之后清空用的

  // CHECKSESSION实际上用来设置用户数据
  [types.CHECKSESSION] (state, data) {
    // CheckSession获取过来的东西包含很多用户其它信息
    if (!data.user === null) {
      state.user = data.user.username
      localStorage.setItem('identity', data.user.username)
    }
  },

  [types.LOGOUT] (state) {
    state.user = null
    localStorage.removeItem('identity')
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
  },

  // Chat-system mutations
  [types.CHANGE_CURRENT_SESSION_ID] (state, id) {
    state.chatSystem.currentSessionId = id
    state.chatSystem.currentSession.chatUser = state.chatSystem.sessions[id].user
  },
  [types.SET_CURRENT_SESSION_DATA] (state, data) {
    state.chatSystem.currentSession.totCount = data.tot_count
    state.chatSystem.currentSession.nowCount = data.now_count
    state.chatSystem.currentSession.msgList = []
    for (var i = data.msg_list.length - 1; i >= 0; i--) {
      let isSelf = (data.msg_list[i].username === localStorage['identity'])
      state.user = localStorage['identity']
      // 这里没有用getUser，因为调用这个方法的时候页面可能会被刷新，然后vuex的东西没了
      // 也没有调用getUser，因为getUser会重新赋予vuex数据
      state.chatSystem.currentSession.msgList.push(
        {
          self: isSelf,
          content: data.msg_list[i].content,
          date: data.msg_list[i].send_time
        }
      )
    }
  },
  [types.ADD_MESSAGE_TO_CURRENT_SESSION] (state, msg) {
    // state.chatSystem.sessions[state.chatSystem.currentSessionId - 1].messages.push({
    //   content: msg,
    //   date: new Date(),
    //   self: true // Self = true看起来是在向外发送消息
    // })
    // 我们暂时不需要这个东西，添加信息后需要添加界面
  },
  [types.ADD_MESSAGE_OPPOSITE] (state, msg) {
    state.chatSystem.sessions[state.chatSystem.currentSessionId - 1].messages.push({
      content: msg,
      date: new Date(),
      self: false // Self = true看起来是在向外发送消息
    })
  },
  [types.INIT_DATA] (state, data) {
    state.chatSystem.sessions = []
    // console.log('From Mutations INIT_DATA', data.chat_list)
    // console.log(state.user)
    state.chatSystem.msgCount = data.msg_count
    state.chatSystem.sessions.push(
      {
        id: 0,
        user: '官方小助手',
        avatar: ''
      }
    )

    var index = 1
    for (var i = 0; i < data.chat_list.length; ++i) {
      var chat = data.chat_list[i]
      state.chatSystem.sessions.push(
        {
          id: index,
          user: chat.user.username, // 目前的接口
          // 这里chat的user有一些杂七杂八的信息
          // 需要用chat.user过滤
          avatar: ''
        }
      )
      index += 1
    }
  }
}

export default mutations
