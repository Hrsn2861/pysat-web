<template>
  <el-table
    :data="displayData"
    style="width: 100%"
    :default-sort="{prop: 'submit_time', order: 'descending'}"
    height="500"
  >
    <el-table-column prop="upload_time" label="上传时间" width="300"></el-table-column>
    <el-table-column prop="name" label="教程名" width="200"></el-table-column>
    <el-table-column prop="uploader" label="上传人" width="200"></el-table-column>
    <el-table-column prop="size" label="大小" width="200"></el-table-column>
    <el-table-column prop="description" label="简介" width="200" fixed="right"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete"
              v-if="isPrivateAdmin || isPublicAdmin" size="small"
              @click="DeleteCourse(scope.$index, scope.row)"></el-button>
            <el-button icon="el-icon-video-play" size="small" @click="PlayVideo(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
  </el-table>
</template>
<script>
import getSchoolAndThemeMixin from '@/utils/getListUtils/getThemeAndSchoolList'
import { myPost } from '@/utils/requestFunc.js'

export default {
  mixins: [getSchoolAndThemeMixin],
  props: [
    'displayData'
  ],
  data () {
    return {
      tableStatus: {
        likeIconOn: false
      }
    }
  },
  methods: {
    DeleteCourse (index, row) {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        video_id: row.id
      }
      console.log(tmpData)
      myPost(
        '/api/file/admin/delete',
        tmpData,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            this.$message.success('删除成功！')
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`)
        }
      )
    },
    PlayVideo (index, row) {
      this.$router.push(
        {
          name: 'videoplay',
          params: {
            token: this.$store.getters.getUserToken,
            video_id: row.id
          }
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.active{
    height: 50vh;
}
</style>
