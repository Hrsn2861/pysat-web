import { myGet } from '@/utils/requestFunc.js'
export default {
  methods: {
    GetThemeListFromMixin (tmpData) {
      return new Promise(resolve => {
        myGet(
          '/api/school/theme/list',
          tmpData,
          res => {
            if (res.data.status === 1) {
              this.$message.success(`${res.data.msg}`)
              this.themeList = res.data.data.theme_list
              resolve(true)
            } else {
              this.$message.error(`${res.data.msg}`)
              resolve(false)
            }
          },
          err => {
            this.$message.error(`${err.message}`, 'ERROR!')
            resolve(false)
          }
        )
      })
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
            resolve(false)
          }
        )
      })
    }
  }
}
