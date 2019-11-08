<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-table :data="userList" style="width:100%" height="500">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用戶" width="120"></el-table-column>
        <el-table-column prop="motto" label="座右铭" :resizable="true"></el-table-column>
        <el-table-column prop="permission" label="用户权限" width="120"></el-table-column>
        <el-table-column prop="download" label="下载数" width="120"></el-table-column>
        <!-- <el-table-column prop="rating" label="打分" width="150">
          <el-rate></el-rate>
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewCurrentUser(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="text" @click="GetUserList()">刷新名单</el-button>
      <el-button type="text">...</el-button>
      <el-select
          v-model="currentSchoolId"
          placeholder="发布区域"
          @change="GetUserList"
        >
          <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-card>
  </div>
</template>

<script>
import { myGet } from '@/utils/requestFunc.js'
import {checkSession} from '@/utils/sessionUtils/sessionFunc'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'
import permissionComputer from '@/utils/functionUtils/permissionComputer'

export default {
  mixins: [getSchoolAndThemeMixin, permissionComputer],
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    this.GetSchoolList()
  },
  methods: {
    viewCurrentUser (index, row) {
      console.log('View user index: ', index)
      this.$router.push({name: 'myinfo', params: {username: row.username}})
    },
    GetSchoolList () {
      if (this.isGreatAdmin) {
        let tmpData = {
          token: this.$store.getters.getUserToken
        }
        this.GetSchoolListFromMixin(tmpData).then(
          res => {
            console.log(this.schoolList)
            this.schoolList.splice(0, 0,
              {
                id: 0,
                name: '全部区域'
              }
            )
            this.currentSchoolId = this.schoolList[0].id
            this.GetUserList()
          }
        )
      } else {
        if (this.isPublicAdmin) {
          this.schoolList.push(
            {
              id: 0,
              name: '公共区域'
            }
          )
          this.currentSchoolId = 0
        }
        if (this.isPrivateAdmin) {
          this.schoolList.push(
            {
              id: localStorage['school_id'],
              name: localStorage['school_name']
            }
          )
          this.currentSchoolId = localStorage['school_id']
        }
        console.log(this.schoolList)
        this.GetUserList()
      }
    },
    GetUserList () {
      myGet(
        '/api/user/list/get',
        {
          token: this.$store.getters.getUserToken,
          show_invalid: 'true',
          manager_first: 'true',
          school_id: this.currentSchoolId
        },
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            this.userList = res.data.data.user_list
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
    }
  },

  data () {
    return {
      currentSchoolId: 0,
      userList: [

      ],
      schoolList: [

      ]
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
