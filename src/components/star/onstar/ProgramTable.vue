<template>
  <el-table
    :data="displayData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
    height="800"
  >
    <el-table-column prop="upload_time" label="上传时间" width="250"></el-table-column>
    <el-table-column prop="name" label="程序名" width="200"></el-table-column>
    <el-table-column prop="author" label="作者" width="180"></el-table-column>
    <el-table-column v-if="isPublic" prop="author_school_name" label="学校" width="180"></el-table-column>
    <el-table-column prop="likes" label="点赞数" width="80"></el-table-column>
    <el-table-column prop="downloads" label="下载数" width="80"></el-table-column>
    <el-table-column label="点赞" width="100" fixed="right">
      <template slot-scope="scope">
        <el-button  icon="el-icon-star-off" circle @click="Like(scope.row)" :disabled="scope.row.liked"></el-button>
      </template>
    </el-table-column>
    <el-table-column label="下载" width="100" fixed="right">
      <template slot-scope="scope">
        <el-button   icon="el-icon-download" circle @click="Download(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { myPost, myGet } from '@/utils/requestFunc.js'
import { saveAs } from 'file-saver'

export default {
  props: [
    'displayData'
  ],
  data () {
    return {
      tableStatus: {
        likeIconOn: false
      },
      isPublic: false
    }
  },
  methods: {
    Like (row) {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        code_id: row.id
      }
      console.log(tmpData)
      myPost(
        '/api/program/user/like',
        tmpData,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            this.$message.success('点赞成功！')
            row.liked = true
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    Download (row) {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        code_id: row.id
      }
      console.log(tmpData)
      myGet(
        '/api/program/user/download',
        tmpData,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            var codeContent = new File([res.data.data.code.content], 'code.py', {type: 'text/plain;charset=utf-8'})
            saveAs(codeContent)
            var codeReadme = new File([res.data.data.code.content], 'readme.py', {type: 'text/plain;charset=utf-8'})
            saveAs(codeReadme)
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.active{
    height: 70vh;
}
</style>
