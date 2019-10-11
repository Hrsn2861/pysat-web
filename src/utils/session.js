import {myPost, myGet} from './request.js'

export async function checkSession (context, loggedUrl, unloggedUrl) {
  let toStart = false
  let logged = false
  console.log('hello')
  console.log(context.$store.getters.getUserToken)
  await myGet('api/session/check', {token: context.$store.getters.getUserToken},
    res => {
      if (res.data.status === 1) {
        if (res.data.data.user) {
          // 已登陆
          context.$message.success('已登陆！')
          logged = true
        } else {
          // 未登录
          context.$message.success('未登录！')
        }
        console.log('index: ' + res.data.data.user)

        context.$store.dispatch('checkSession', {user: res.data.data.user})
      } else {
        // 建立会话
        toStart = true
      }
    },
    err => {
      context.$message.error(`${err.message}`)
    }
  )
  if (toStart) {
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
    if (loggedUrl !== '') { context.$router.push(loggedUrl) }
  } else {
    if (unloggedUrl !== '') { context.$router.push(unloggedUrl) }
  }
}

export async function logout (context) {
  await myPost('api/user/sign/logout', {token: context.$store.getters.getUserToken},
    res => {
      // context.$router.go()
    },
    err => {
      context.$message.error(`${err.message}`)
    }
  )
}
