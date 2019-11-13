import { myPost } from '@/utils/requestFunc.js'
import { resolve } from 'path'

export default {
  computed: {
    sessions () {
      return this.$store.state.chatSystem.sessions
    },
    currentSessionId () {
      return this.$store.state.chatSystem.currentSessionId
    },
    currentSession () {
      return this.$store.state.chatSystem.currentSession.msgList
    },
    myAvatarUrl () {
      return '/api/file/avatar/get' + '?token=' + this.$store.getters.getUserToken + '&username=' + this.$store.getters.getUser
    },
    chatUserUrl () {
      return '/api/file/avatar/get' + '?token=' + this.$store.getters.getUserToken + '&username=' + this.$store.getters.getUserNameFromSessionId
    }
  },
  methods: {
    // 获取聊天列表和未读消息的信息
    getChatList () {
      return new Promise(resolve => {
        let queryJson = {
          token: this.$store.getters.getUserToken
        }
        myPost(
          '/api/message/chat/list',
          queryJson,
          res => {
            if (res.data.status === 1) {
              this.$store.dispatch('initData', res.data.data)
              // this.changeCurrentSessionId(this.currentSessionId)
              resolve(true)
            }
          },
          err => {
            this.$message({
              type: 'error',
              message: err,
              duration: 1000
            })
            resolve(false)
          }
        )
      })
    },
    // 最新逻辑：先发送消息，然后获取聊天列表，把当前的currentSessionId设置为0就可以了
    sendMessage (username, msg) {
      var _ = require('lodash')
      msg = _.trim(msg)
      if (msg.length === 0 || msg.length > 50) {
        this.$message.error('请发送长度有效的消息奥(0~50字)')
        return
      } // Using Lodash here to trim msg

      let queryJson = {
        token: this.$store.getters.getUserToken,
        username: username,
        content: msg
      }
      myPost(
        '/api/message/message/send',
        queryJson,
        res => {
          if (res.data.status === 1) {
            this.$message.success('发送成功！')
            var queryJson = {
              token: this.$store.getters.getUserToken,
              username: this.$store.getters.getUserNameFromSessionId,
              page: 1
            }
            myPost(
              '/api/message/message/list',
              queryJson,
              res => {
                if (res.data.status === 1) {
                // setCurrentSessionData
                  this.$store.dispatch('setCurrentSessionData', res.data.data)
                  this.$store.dispatch('setUnreadToZero')
                  this.getChatList().then(
                    res => {
                      console.log(res)
                      this.$store.dispatch('changeCurrentSessionId', 0)
                    }
                  )
                }
              },
              err => {
                this.$message({
                  type: 'error',
                  message: err,
                  duration: 1000

                })
              }

            )
          } else {
            this.$message.error('这个同学可能不存在喔')
          }
        },
        err => {
          this.$message({
            type: 'error',
            message: err,
            duration: 1000
          })
        }
      )
    },
    // 改变当前的CurrentSessionId，然后将vuex里面的CurrentSession的信息更新一下
    changeCurrentSessionId: function (id) {
      return new Promise(resolve => {
        console.log('ChangeSession ID: ', id)
        // 这里需要通过点击的东西获取到需要聊天的用户名然后前往对话
        this.$store.dispatch('changeCurrentSessionId', id)
        var queryJson = {
          token: this.$store.getters.getUserToken,
          username: this.$store.getters.getUserNameFromSessionId,
          page: 1
        }
        myPost(
          '/api/message/message/list',
          queryJson,
          res => {
            if (res.data.status === 1) {
            // setCurrentSessionData
              this.$store.dispatch('setCurrentSessionData', res.data.data)
              this.$store.dispatch('setUnreadToZero')
              this.getChatList()
              resolve(true)
            }
          },
          err => {
            this.$message({
              type: 'error',
              message: err,
              duration: 1000

            })
            resolve(false)
          }

        )
      })
    }
  }
}
