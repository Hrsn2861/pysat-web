import { myGet } from '@/utils/requestFunc.js'
export default {
  data () {
    return {
      currentSchoolId: 0,
      schoolList: [
        {
          id: 0,
          name: '在野',
          disabled: false
        },
        {
          id: Number(localStorage.getItem('school_id')) === 0 ? -1 : Number(localStorage.getItem('school_id')),
          name: '校内',
          disabled: Number(localStorage.getItem('school_id')) === 0
        }
      ],
      schoolPageCnt: 100,
      schoolPageIndex: 1,

      // currentThemeId: -1, // 暂时没用了
      themeList: [
        {
          id: 0,
          name: 'BUG!!!',
          release_date: '9999-12-31',
          deadline: '9999-12-31',
          description: 'There is a bug',
          count: 9999
        }
      ],
      themePageCnt: 100,
      themePageIndex: 1
    }
  },
  methods: {
    GetSchoolListNoPublic (index) {
      // 真香
      return new Promise(resolve => {
        let tmpData = {
          token: this.$store.getters.getUserToken
        }
        if (index) { // 这样对应了后端默认获取第一页的语义
          tmpData['page'] = index
        }
        console.log(tmpData)
        myGet(
          '/api/school/school/get_list',
          tmpData,
          res => {
            if (res.data.status === 1) {
            // this.$message.success(`${res.data.msg}`)
              this.schoolPageCnt = Math.ceil(res.data.data.tot_count / 20)
              this.schoolList = res.data.data.school_list
              this.currentSchoolId = this.schoolList[0].id
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
      }
      )
    },
    GetSchoolList (index) {
      return new Promise(resolve => {
        let tmpData = {
          token: this.$store.getters.getUserToken
        }
        if (index) { // 这样对应了后端默认获取第一页的语义
          tmpData['page'] = index
        }
        console.log(tmpData)
        myGet(
          '/api/school/school/get_list',
          tmpData,
          res => {
            if (res.data.status === 1) {
            // this.$message.success(`${res.data.msg}`)
              this.schoolPageCnt = Math.ceil(res.data.data.tot_count / 20)
              this.schoolList = res.data.data.school_list
              this.schoolList.unshift(
                {
                  id: 0,
                  name: '公共区域'
                }
              )
              this.currentSchoolId = 0
              console.log(this.schoolList)
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

    GetThemeList (index, text) {
      return new Promise(resolve => {
        let tmpData = {
          token: this.$store.getters.getUserToken,
          school_id: this.currentSchoolId
        }
        if (index) { // 这样对应了后端默认获取第一页的语义
          tmpData['page'] = index
        }
        if (text) {
          tmpData['search_text'] = text
        }
        console.log(tmpData)
        myGet(
          '/api/school/theme/list',
          tmpData,
          res => {
            if (res.data.status === 1) {
              // this.$message.success(`${res.data.msg}`)
              this.themeList = res.data.data.theme_list
              this.themePageCnt = Math.ceil(res.data.data.tot_count / 20)
              console.log(this.themeList)
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
