import {myPost, myGet} from '../requestFunc.js'

// async 和 await保证在同一线程内执行（本来axios.get会跑到新的线程里面执行）
// 在外面如果用 async await可以保证同步执行
// 在外面如果直接调用checkSession会异步执行
// 函数可以设置 如果登陆跳转的url，未登录的话想跳转的url
export async function checkSession (context, loggedUrl, unloggedUrl) {
  let toStart = false
  let logged = false
  // console.log('hello')
  // console.log(context.$store.getters.getUserToken)
  await myGet('api/session/check', {token: context.$store.getters.getUserToken},
    res => {
      if (res.data.status === 1) {
        if (res.data.data.user) {
          // 已登陆
          context.$message.success('已登陆！')
          logged = true
          console.log(res.data.data.user)
          context.$store.dispatch('checkSession', {user: res.data.data.user}) // 不管登陆还是没有登陆都要将改变user，（没有登陆，vuex的user的状态空）
        } else {
          // 未登录
          context.$message.success('未登录！')
          context.$store.dispatch('userLogOut')
        }
        // console.log('index: ' + res.data.data.user)
      } else {
        // 建立会话
        toStart = true
      }
    },
    err => {
      context.$message.error(`${err.message}`)
    }
  )
  if (toStart) { // Token无效的时候，建立会话
    await myPost('api/session/start', {},
      res => {
        let data = {
          token: res.data.data.token
        }
        context.$store.dispatch('setToken', data)
        context.$message.success('建立会话！')
      },

      err => {
        context.$message.error(`${err.message}`)
      }
    )
  }
  if (logged) {
    // 检查消息数目
    // 在调用之前，如果登陆的话全局检查消息数目
    let queryJson = {
      token: context.$store.getters.getUserToken
    }
    myPost(
      '/api/message/chat/list',
      queryJson,
      res => {
        if (res.data.status === 1) {
          context.$store.dispatch('initData', res.data.data)
          // this.changeCurrentSessionId(this.currentSessionId)
        }
      },
      err => {
        context.$message({
          type: 'error',
          message: err,
          duration: 1000
        })
      }
    )
    if (loggedUrl !== '') {
      console.log('sessionFunc.js Jumpto: ', loggedUrl)
      if (loggedUrl === 'myinfo') {
        context.$router.push({name: loggedUrl, params: {username: '___default'}})
      } else {
        context.$router.push(loggedUrl)
      }
    }
  } else {
    if (unloggedUrl !== '') { context.$router.push(unloggedUrl) }
  }
}

export async function logout (context) {
  await myPost('api/user/sign/logout', {token: context.$store.getters.getUserToken},
    res => {
      context.$store.dispatch('userLogOut') // userlogout不删除会话,只删除用户
    },
    err => {
      context.$message.error(`${err.message}`)
    }
  )
}

// 类似于这样的东西保证同步
// async beforeCreate () {
//   await checkSession(this, 'myinfo', '')
//   console.log('hello')
// }
