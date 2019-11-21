<template>
  <el-table
    :data="displayData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
    :height="tableHeight"
  >

    <el-table-column prop="name" label="程序名" fixed="left" ></el-table-column>
    <el-table-column prop="school_name" label="学校" width="180"></el-table-column>
    <el-table-column prop="theme_name" label="主题" width="180"></el-table-column>
    <el-table-column prop="status" label="审核状态" width="180">
      <template slot-scope="scope">
        <el-tag
          :type="calculateTagType(scope.row.status)"
          disable-transitions
        >{{statusDict[scope.row.status]}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="submit_time" label="提交时间" width="200"></el-table-column>
    <el-table-column label="下载" width="150">
      <template slot-scope="scope">
        <el-button  v-bind:class="{active : tableStatus.likeIconOn}" icon="el-icon-download" circle @click="Download(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { myGet } from '@/utils/requestFunc.js'
import { saveAs } from 'file-saver'
export default {
  props: [
    'displayData'
  ],
  data () {
    return {
      // tableData: this.displayData,
      tableStatus: {
        likeIconOn: false
      },
      statusDict: {
        '-2': '未通过语法审核',
        '-1': '未通过功能审核',
        '0': '等待审核',
        '1': '审核中',
        '2': '通过审核',
        '3': '等待上星',
        '4': '即将上传',
        '5': '执行完毕'
      }
    }
  },
  computed: {
    tableHeight () {
      return document.documentElement.clientHeight * 0.7
    },
    calculateTagType () {
      return function (status) {
        if (status === 5) {
          return 'success'
        } else if (status >= 2 && status <= 4) {
          return 'warning'
        } else if (status >= 0 && status <= 1) {
          return 'info'
        } else if (status < 0) {
          return 'danger'
        }
      }
    }
  },
  methods: {
    // statusFormatter (row, column) {
    //   return this.statusDict[row.status.toString()]
    // },
    Download (row) {
      // console.log(this.displayData)
      let tmpData = {
        token: this.$store.getters.getUserToken,
        code_id: row.id
      }
      // console.log(tmpdata)
      myGet(
        '/api/program/user/download',
        tmpData,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            var codeContent = new File([res.data.data.code.content], 'code.py', {type: 'text/plain;charset=utf-8'})
            saveAs(codeContent)
            var codeReadme = new File([res.data.data.code.readme], 'readme.txt', {type: 'text/plain;charset=utf-8'})
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

</style>
