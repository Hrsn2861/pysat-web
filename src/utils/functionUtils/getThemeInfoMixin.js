import { myGet } from '@/utils/requestFunc.js'
export default {
  data () {
    return {
      // TODO:通过某种形式把这里的主题信息显示出来
      themeInfo: {
        title: '',
        create_time: '',
        deadline: '',
        description: '',
        count: 0
      }
    }
  },
  methods: {
    GetThemeInfo () {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        theme_id: this.currentThemeId
      }
      myGet(
        '/api/school/theme/info',
        tmpData,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            this.themeInfo = res.data.data
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    }
  }
}
