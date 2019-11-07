import { myGet } from '@/utils/requestFunc.js'
export default {
  methods: {
    GetCourseListFromMixin (tmpData) {
      myGet(
        '/api/file/list/info',
        tmpData,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            this.videoList = res.data.data.video_list
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
