import { myGet } from '@/utils/requestFunc.js'
export default {
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
      myGet(
        '/api/school/school/get_list',
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.schoolList = res.data.data.school_list
            console.log(this.schoolList)
            this.currentSchoolId = this.schoolList[0].id
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
