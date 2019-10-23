<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
  >
    <el-table-column prop="submit_time" label="提交时间" width="180"></el-table-column>
    <el-table-column prop="author" label="作者" width="180"></el-table-column>
    <el-table-column prop="name" label="程序名" :formatter="formatter" width="200"></el-table-column>

    <el-table-column label="操作" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button type="text" @click="Operation(scope.row)">{{buttonText}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { myPost, myGet } from '@/utils/requestFunc.js'

export default {
  props: [
    'displayData'
  ],
  data () {
    // TODO : 使用PROPS接受传递进来的table参数然后显示
    return {
      tableData: this.displayData,
      tableStatus: {
        likeIconOn: false
      },
      buttonText: '下载'
    }
  },
  methods: {
    formatter (row, column) {
      return row.name
    },
    Download (row) {
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        codeid: row.id
      }
      console.log(tmpdata)
      myGet(
        '/api/program/admin/download',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
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
