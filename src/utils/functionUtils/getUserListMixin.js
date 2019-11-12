import { myGet } from '@/utils/requestFunc.js'
export default {
  data () {
    return {
      userList: [],
      userPageIndex: 1,
      userPageCnt: 100
    }
  },
  methods: {
    GetUserList (index, schoolId, showInvalid) {
      return new Promise(resolve => {
        let tmpData = {
          token: this.$store.getters.getUserToken,
          show_invalid: false,
          manager_first: true,
          school_id: schoolId
        }
        if (index) { // 这样对应了后端默认获取第一页的语义
          tmpData['page'] = index
        }
        if (showInvalid) {
          console.log('Hello', showInvalid)
          tmpData.show_invalid = showInvalid
        }
        console.log(tmpData)
        myGet(
          '/api/user/list/get',
          tmpData,
          res => {
            if (res.data.status === 1) {
              // this.$message.success(`${res.data.msg}`)
              this.userList = res.data.data.user_list
              this.userPageCnt = Math.ceil(res.data.data.tot_count / 20)
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
