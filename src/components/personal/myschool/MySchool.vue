<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-card>
        <el-row type="flex" align="bottom">
          <el-col :lg="{span:4}" :xs="{span:24}" :md="{span:12}">
            <h1>{{school.name}}</h1>
          </el-col>
          <el-col :lg="{span:4}" :xs="{span:0}" :md="{span:5}">
            <i>
              <h2 style="margin:0%;">校长 : {{school.headmaster}}</h2>
            </i>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        {{school.description}}, 现有
        <i>{{school.population}}</i> 人
      </el-card>
      <el-card>
        <el-table :data="userList" style="width: 100%" stripe class="video-table" height="565">
          <el-table-column prop="username" label="用户名" width="180"></el-table-column>
          <el-table-column prop="motto" label="个性签名" :resizable="true"></el-table-column>
          <el-table-column v-if="false" prop="permission" label="权限"></el-table-column>
          <el-table-column fixed="right" label="身份" width="150">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.username!==myName"
                :type="scope.row.permission === 4 ? 'warning' : scope.row.permission===2? 'success': 'primary'"
                disable-transitions
              >{{statusDict[scope.row.permission]}}</el-tag>
              <el-tag
                v-else-if="scope.row.username===myName"
                type='danger'
                disable-transitions
              >{{statusDict[scope.row.permission]}}，自己</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="ViewCurrentUser(scope.$index, scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="SayHello(scope.$index, scope.row)">打个招呼</el-button>
          </template>
        </el-table-column>
        </el-table>
        <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import { myGet } from '@/utils/requestFunc.js'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'
import permissionComputer from '@/utils/functionUtils/permissionComputer'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'

export default {
  mixins: [getSchoolAndThemeMixin, permissionComputer],
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    this.GetUserList()
    console.log(this.$store.getters.getSchoolId)
  },
  data () {
    return {
      school: {
        name: '清华大学',
        description: '坐落于美丽的燕园隔壁',
        headmaster: '邱勇',
        population: 999
      },
      myName: localStorage['identity'],
      userList: [],
      statusDict: {
        4: '校长',
        2: '老师',
        1: '同学'
      }
    }
  },
  computed: {},
  methods: {
    ViewCurrentUser (index, row) {
      console.log('View user index: ', index)
      this.$router.push({name: 'myinfo', params: {username: row.username}})
    },
    SayHello (index, row) {

    },
    GetUserList () {
      myGet(
        '/api/user/list/get',
        {
          token: this.$store.getters.getUserToken,
          show_invalid: 'true',
          manager_first: 'true',
          school_id: localStorage['school_id']
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.el-card {
  padding: 0%;
  background-color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5%;
}
.el-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}
.box-card {
  align-self: center;

  height: 100%;
  width: 80%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}
h1 {
  font-size: 50px;
  margin-top: 1%;
  margin-bottom: 1%;
}
.el-table {
  margin: 0%;
}
</style>
