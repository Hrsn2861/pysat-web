import {checkSession, logout} from './sessionFunc.js'
// autoJumpToInfoHandler在navi，signup，login界面被调用，提供了一个logout方法，其实没什么用...

export default{
  beforeCreate () {
    checkSession(this, '/overview', '') // 不跳到info了跳到主页
    // 混入对象的钩子将在组件自身钩子之前调用。
    // 钩子都会被调用
    // 这里只可以处理myinfo的跳转
  },
  methods: {
    async logOut () {
      await logout(this)
      this.$router.go(0) // 刷新页面
    }
  }
}
