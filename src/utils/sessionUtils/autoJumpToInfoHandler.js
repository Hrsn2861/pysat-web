import {checkSession, logout} from './sessionFunc.js'
// autoJumpToInfoHandler在navi，signup，login界面被调用，提供了一个logout方法，其实没什么用...

export default{
  beforeCreate () {
    checkSession(this, 'myinfo', '')
    // 混入对象的钩子将在组件自身钩子之前调用。
    // 钩子都会被调用
  },
  methods: {
    async logOut () {
      await logout(this)
      this.$router.go(0) // 刷新页面
    }
  }
}
