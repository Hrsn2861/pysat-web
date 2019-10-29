<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-table :data="applyData" style="width:100%" height="500">
        <el-table-column prop="username" label="用户名" width="120"></el-table-column>
        <el-table-column prop="date" label="申请时间" width="200"></el-table-column>
        <el-table-column prop="reason" label="申请理由" :resizable="true"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewCurrentUser(scope.$index, scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="approveCurrentUser(scope.$index, scope.row)">通过</el-button>
            <el-button type="text" size="small" @click="disapproveCurrentUser(scope.$index, scope.row)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="text" @click="getApplyList()">刷新名单</el-button>
      <el-button type="text">...</el-button>
    </el-card>
  </div>
</template>
<script>
import {checkSession} from '@/utils/sessionUtils/sessionFunc'
export default {
  data () {
    return {
      applyData: [

      ]
    }
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    this.getApplyList()
  },
  methods: {
    viewCurrentUser (index, row) {
      console.log('View user index: ', index)
      this.$router.push({name: 'myinfo', params: {username: row.username}})
    },
    getApplyList () {
      this.applyData = [
        {
          username: '禹含',
          date: '1988',
          reason: '又红又专'
        },
        {
          username: '陈旭',
          date: '2000',
          reason: '不知道'
        }

      ]
    },
    approveCurrentUser (index, row) {
      console.log('Approve user: ', row.username)
      // TODO : approve and disapprove
      this.applyData.splice(index, 1)
    },
    disapproveCurrentUser (index, row) {
      console.log('Disapprove user: ', row.username)
      this.applyData.splice(index, 1)
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
