<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-table :data="tableData" style="width:100%" height="500">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用戶" width="120"></el-table-column>
        <el-table-column prop="motto" label="座右铭" :resizable="true"></el-table-column>
        <el-table-column prop="permission" label="用户权限" width="120"></el-table-column>
        <el-table-column prop="rating" label="打分" width="150">
          <el-rate></el-rate>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewCurrentUser(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="text" @click="addUser()">点击添加新用户</el-button>
      <el-button type="text">封禁用戶</el-button>
      <el-button type="text" @click="getUserList()">刷新名单</el-button>
      <el-button type="text">...</el-button>
    </el-card>
  </div>
</template>

<script>
import { myGet } from '@/utils/requestFunc.js'
import {checkSession} from '@/utils/sessionUtils/sessionFunc'

export default {
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    this.getUserList()
  },
  methods: {
    viewCurrentUser (index, row) {
      console.log('View user index: ', index)
      this.$router.push({name: 'myinfo', params: {username: row.username}})
    },

    getUserList () {
      myGet(
        '/api/user/list/get',
        {
          token: this.$store.getters.getUserToken,
          show_invalid: 'true',
          manager_first: 'true'
        },
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            this.tableData = res.data.data.userlist
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message({
            type: 'error',
            message: err,
            duration: 1000
          })
        }
      )
    },
    handleClick (row) {
      console.log('click from Hangout.vue')
    },
    addUser () {
      this.tableData.push({

        username: '陈旭',
        motto: '陈旭牛逼',
        permission: 0
      })
    }
  },

  data () {
    return {
      tableData: [
        {
        }
      ],
      permission: localStorage.getItem('permission')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
  align-self: center;
  height: auto;
  width: 95%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
  margin: 5%;
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}

.main-div {
  height: 100%;
  width: 100%;
  margin: 0%;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0%;
  background: url("../../assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: 100%;
}
</style>
