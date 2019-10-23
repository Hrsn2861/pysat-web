<template>
  <el-table
    :data="displayData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
  >
    <el-table-column prop="submit_time" label="提交时间" width="180"></el-table-column>
    <el-table-column prop="name" label="程序名" :formatter="formatter"></el-table-column>
    <el-table-column prop="status" label="审核状态" width="180" fixed="right" :formatter="statusFormatter"></el-table-column>

    <el-table-column label="下载" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button  v-bind:class="{active : tableStatus.likeIconOn}" icon="el-icon-star-off" circle @click="Download(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { myGet } from '@/utils/requestFunc.js'

export default {
  props: [
    'displayData'
  ],
  data () {
    // TODO : 使用PROPS接受传递进来的table参数然后显示
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
        '3': '已上传'
      }
    }
  },
  methods: {
    formatter (row, column) {
      return row.name
    },
    statusFormatter (row, column) {
      return this.statusDict[row.status.toString()]
    },
    Download (row) {
      // console.log(this.displayData)
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        codeid: row.id
      }
      // console.log(tmpdata)
      myGet(
        '/api/program/user/download',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            this.tableData = res.data.data.codelist
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
    height: 50vh;
}
</style>
