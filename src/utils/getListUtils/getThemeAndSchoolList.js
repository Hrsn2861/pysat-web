import { myGet } from '@/utils/requestFunc.js'
export default {
  computed: {
    // 这里暂时好像没有用
    isPrivateAdmin () {
      return (
        localStorage['permission_private'] >= 2
      )
    },
    isPublicAdmin () {
      return (
        localStorage['permission_public'] >= 2
      )
    },
    isGreatAdmin () {
      return localStorage['permission_public'] >= 8
    },
    isHeadmasterOrGreater () {
      // return localStorage['permission_private'] >= 4 || localStorage['permission_public'] >= 4
      if (this.currentSchoolId === 0) {
        return localStorage['permission_public'] >= 4
      } else {
        return localStorage['permission_private'] >= 4
      }
    }
  },
  methods: {
    GetThemeListFromMixin (tmpData) {
      myGet(
        '/api/school/theme/list',
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.themeList = res.data.data.theme_list
            console.log(res.data.data)
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    GetSchoolListFromMixin (tmpData) {
      return new Promise(resolve => {
        myGet(
          '/api/school/school/get_list',
          tmpData,
          res => {
            if (res.data.status === 1) {
              this.$message.success(`${res.data.msg}`)
              this.schoolList = res.data.data.school_list
              resolve(true)
            } else {
              this.$message.error(`${res.data.msg}`)
              resolve(false)
            }
          },
          err => {
            this.$message.error(`${err.message}`, 'ERROR!')
          }
        )
      })
    }
  }
}
