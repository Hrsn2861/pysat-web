import { myPost } from '@/utils/requestFunc.js'

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
    }
  },
  methods: {
    changeCurrentSessionId: function (id) {
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
      this.$store.dispatch('changeCurrentSessionId', id)
    }
  }
}
