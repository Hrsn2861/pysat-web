import {checkSession, logout} from './sessionFunc.js'

export default{
  beforeCreate () {
    checkSession(this, 'myinfo', '')
  },
  methods: {
    async logOut () {
      console.log('Test')
      await logout(this)
      this.$router.go(0) // 刷新页面
    }
  }
}
