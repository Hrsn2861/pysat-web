<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-table :data="applyList" style="width:100%" height="500">
        <el-table-column prop="id" label="申请id" width="200"></el-table-column>
        <el-table-column prop="username" label="用户名" width="120"></el-table-column>
        <el-table-column prop="time" label="申请时间" width="200"></el-table-column>
        <el-table-column prop="reason" label="申请理由" :resizable="true"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="ViewCurrentUser(scope.$index, scope.row)">查看</el-button>
            <el-button
              type="text"
              size="small"
              @click="ApproveCurrentUserOrNot(scope.$index, scope.row, true)"
            >通过</el-button>
            <el-button
              type="text"
              size="small"
              @click="ApproveCurrentUserOrNot(scope.$index, scope.row, false)"
            >不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-select v-model="currentSchoolId" placeholder="学校" @change="GetApplyList()">
        <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button type="text" @click="GetApplyList">刷新名单</el-button>
      <el-button type="text">...</el-button>
    </el-card>

  </div>
</template>
<script>
import { myPost } from '@/utils/requestFunc.js'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import permissionComputer from '@/utils/functionUtils/permissionComputer'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'

export default {
  mixins: [getSchoolAndThemeMixin, permissionComputer],
  data () {
    return {
      applyList: [],
      currentSchoolId: 0,
      schoolList: [
        {
          id: localStorage.getItem('school_id'),
          name: localStorage.getItem('school_name'),
          disabled: Number(localStorage.getItem('school_id')) === 0
        }
      ]
    }
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    // 能进入该页面的一定是校内权限>=2（有学校或者是网站管理员）

    if (localStorage.getItem('permission_public') >= 8) {
      this.GetSchoolListNoPublic().then(res => {
        this.GetApplyList()
      })
    } else {
      this.currentSchoolId = this.schoolList[0].id
      this.GetApplyList()
    }
  },
  computed: {

  },
  methods: {
    ViewCurrentUser (index, row) {
      console.log('View user index: ', index)
      this.$router.push({ name: 'myinfo', params: { username: row.username } })
    },

    GetApplyList () {
      console.log(this.schoolList)
      console.log(this.currentSchoolId)
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        school_id: this.currentSchoolId,
        type: 2
        // TODO : 这里默认返回未处理的
      }
      myPost(
        '/api/school/admin/applylist',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            this.applyList = res.data.data.apply_list
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    ApproveCurrentUserOrNot (index, row, approveOrNot) {
      console.log('Approve user: ', row.username)

      let tmpdata = {
        token: this.$store.getters.getUserToken,
        apply_id: row.id,
        approve: approveOrNot
      }
      myPost(
        '/api/school/admin/approve',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            this.applyList.splice(index, 1)
            this.$message({
              type: 'success',
              message: '处理成功！',
              duration: 1000
            })
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
  background: url("~@/assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: 100%;
}
</style>
