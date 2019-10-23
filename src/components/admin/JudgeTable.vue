<template>
  <el-table
    :data="displayData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
  >
    <el-table-column prop="submit_time" label="提交时间" width="180"></el-table-column>
    <el-table-column prop="author" label="作者" width="180"></el-table-column>
    <el-table-column prop="name" label="程序名" :formatter="formatter" width="200"></el-table-column>
    <el-table-column prop="status" label="审核状态"  width="200" :formatter="statusFormatter"></el-table-column>

    <el-table-column label="下载" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button type="text" @click="Download(scope.$index, scope.row)">下载</el-button>
      </template>
    </el-table-column>
        <el-table-column label="通过" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button type="text" @click="ApproveOrNot(scope.$index, scope.row, true)">通过</el-button>
      </template>
    </el-table-column>
        <el-table-column label="不通过" width="150" fixed="right">
    <template slot-scope="scope">
        <el-button type="text" @click="ApproveOrNot(scope.$index, scope.row, false)">不通过</el-button>
      </template>
    </el-table-column>
    <el-table-column label="上传" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button type="text" @click="Upload(scope.$index, scope.row)">上传</el-button>
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
    Download (index, row) {
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
            row.status = 1
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    ApproveOrNot (index, row, approve) {
      // 首先应当下载过（根据row.status判断），否则报错
      // 如果通过，则仍然出现在列表里
      // 如果不通过，则需要删掉
      if (row.status === 0) {
        this.$message.error('您应当先下载程序再进行审核！')
        return
      }
      if (row.status === 2) {
        this.$message.error('您已经审核通过了！')
        return
      }

      let tmpdata = {
        token: this.$store.getters.getUserToken,
        codeid: row.id
      }
      if (approve) {
        console.log('Approve!')
        console.log(row.name)
        tmpdata.judge = 1
      } else {
        console.log('Disapprove!')
        console.log(row.name)
        tmpdata.judge = 0
      }
      console.log(tmpdata)
      myPost(
        '/api/program/admin/judge',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            // 需要更新row.status
            if (approve) {
              row.status = 2
            } else {
              row.status = -1
              this.displayData.splice(index, 1)
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
    Upload (index, row) {
      // 首先应当已经审核通过，否则报错
      // 上传成功后，需要从列表里面删掉
      if (row.status < 2) {
        this.$message.error('您应当先下载并审核通过该程序！')
        return
      }
      console.log('Upload')
      console.log(row.name)
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        codeid: row.id
      }
      console.log(tmpdata)
      myPost(
        '/api/program/admin/upload',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            // 需要更新row.status
            row.status = 3
            this.displayData.splice(index, 1)
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
