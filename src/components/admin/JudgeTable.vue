<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
  >
    <el-table-column prop="submit_time" label="提交时间" width="180"></el-table-column>
    <el-table-column prop="author" label="作者" width="180"></el-table-column>
    <el-table-column prop="name" label="程序名" :formatter="formatter" width="200"></el-table-column>
    <el-table-column prop="status" label="审核状态"  width="200"></el-table-column>

    <el-table-column label="下载" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button type="text" @click="Download(scope.row)">下载</el-button>
      </template>
    </el-table-column>
        <el-table-column label="通过" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button type="text" @click="ApproveOrNot(scope.row, true)">通过</el-button>
      </template>
    </el-table-column>
        <el-table-column label="不通过" width="150" fixed="right">
    <template slot-scope="scope">
        <el-button type="text" @click="ApproveOrNot(scope.row, false)">不通过</el-button>
      </template>
    </el-table-column>
    <el-table-column label="上传" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button type="text" @click="Upload(scope.row)">上传</el-button>
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
            // 需要更新row.status
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    ApproveOrNot (row, approve) {
      if (approve) {
        console.log('Approve!')
        console.log(row.name)
      } else {
        console.log('Disapprove!')
        console.log(row.name)
      }

      // to be implemented
      // 首先应当下载过（根据row.status判断），否则报错
      // 如果通过，则仍然出现在列表里
      // 如果不通过，则需要删掉
    },
    Upload (row) {
      console.log('Upload')
      console.log(row.name)
      // to be implemented
      // 首先应当已经审核通过，否则报错
      // 上传成功后，需要从列表里面删掉
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
