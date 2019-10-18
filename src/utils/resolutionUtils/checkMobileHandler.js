export default {
  computed: {
    // 啊这样组件判断起来真是容易多了
    // 提供了一個判斷是不是Mobile的方法，其實只有Header裏面用到了，因爲Header用到了就可以設置全局的loading
    // 如果有什么组件需要进行isMobile的判断
    // 然后用一个v-if控制隐藏什么的
    // 那么就可以加入这个mixin
    isMobile () {
      if (this.$store.state.device === 'mobile') {
        // this.$message({
        //   type: 'error',
        //   message: '请调至能用的分辨率！！！/PC端访问！！！',
        //   duration: 2000
        // })   要不要加奇怪的信息就看情况好了

        return true
      } else {
        return false
      }
    }

  }
}
