<template>
  <el-table
    :data="displayData"
    style="width: 100%"
    :height="tableHeight"
  >
    <el-table-column prop="name" label="程序名" width="150" fixed="left"></el-table-column>
    <el-table-column prop="author" label="作者" width="150"></el-table-column>
    <el-table-column v-if="isPublic" prop="author_school_name" label="学校" width="150"></el-table-column>
    <el-table-column prop="theme_name" label="主题" :resizable="true"></el-table-column>
    <el-table-column prop="likes" label="点赞数" width="80"></el-table-column>
    <el-table-column prop="downloads" label="下载数" width="80"></el-table-column>
    <el-table-column prop="upload_time" label="上传时间" width="200"></el-table-column>
    <el-table-column width="200">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          placeholder="输入关键字搜索主题"/>
      </template>
      <template slot-scope="scope">
        <el-button  icon="el-icon-star-off" circle @click="Like(scope.row)" :disabled="scope.row.liked"></el-button>
        <el-button   icon="el-icon-download" circle @click="Download(scope.row)"></el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="100">
      <template slot="header" slot-scope="scope">
        <el-button type="primary" @click="StartSearch">搜索</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { myPost, myGet } from '@/utils/requestFunc.js'
import { saveAs } from 'file-saver'

export default {
  props: [
    'displayData',
    'isPublic'
  ],
  data () {
    return {
      tableStatus: {
        likeIconOn: false
      },
      search: ''
    }
  },
  computed: {
    tableHeight () {
      return document.documentElement.clientHeight * 0.8
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
            row.likes += 1
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
            if (!row.downloaded) {
              row.downloads += 1
              row.downloaded = true
            }
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    StartSearch () {
      console.log('StartSearch:' + this.search)
      this.$emit('StartSearch', this.search)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input{
  margin: 0%;
  height: 100% !important;
}
</style>
