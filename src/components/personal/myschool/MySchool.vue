<template>
  <div class="main-div">
    <el-card class="box-card">
      <div v-if="hasSelectedSchool">
        <el-card>
          <el-row type="flex" align="bottom">
            <el-col :lg="{span:8}" :xs="{span:24}" :md="{span:12}">
              <h1>{{school.name}}</h1>
            </el-col>
            <el-col :lg="{span:8}" :xs="{span:0}" :md="{span:5}">
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
          <el-table :data="userList" style="width: 100%" stripe class="video-table" height="630">
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="motto" label="个性签名" :resizable="true"></el-table-column>
            <el-table-column v-if="false" prop="permission" label="权限"></el-table-column>
            <el-table-column fixed="right" label="身份" width="150">
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.username!==myName"
                  :type="calculateTagType(scope.row.permission)"
                  disable-transitions
                >{{statusDict[scope.row.permission]}}</el-tag>
                <el-tag
                  v-else-if="scope.row.username===myName"
                  type="danger"
                  disable-transitions
                >{{statusDict[scope.row.permission]}}，自己</el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="ViewCurrentUser(scope.$index, scope.row)"
                >查看</el-button>
                <el-button type="text" size="small" @click="SendHello(scope.$index, scope.row)">打个招呼</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :background="false" layout="prev, pager, next" :page-count="userPageCnt" :current-page.sync="userPageIndex" @current-change="GetUserList(userPageIndex)" @prev-click="userPageIndex --" @next-click="userPageIndex++"></el-pagination>

        </el-card>
      </div>
      <div v-else class="change-school">
        <h2>申请加入学校，就是现在！</h2>
         <el-table :data="schoolList" style="width: 100%" height="700">
            <el-table-column v-if="false" prop="id" label="学校ID" width="100"></el-table-column>
            <el-table-column prop="name" label="学校名称" width="150"></el-table-column>
            <el-table-column prop="headmaster" label="校长" width="100"></el-table-column>
            <el-table-column prop="description" label="学校描述" :resizable="true"></el-table-column>
            <el-table-column prop="population" label="当前人数" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="applyDialogVisible = true;formApplySchool.school_name = scope.row.name;formApplySchool.school_id = scope.row.id"
                  type="text"
                  size="small"
                >申请加入</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :background="false" layout="prev, pager, next" :page-count="schoolPageCnt" :current-page.sync="schoolPageIndex" @current-change="GetSchoolListNoPublic(schoolPageIndex)" @prev-click="schoolPageIndex --" @next-click="schoolPageIndex++"></el-pagination>
      </div>
    </el-card>
    <el-dialog :title="'加入: ' + formApplySchool.school_name + '（一个同学只有一次选择的权利）'" :visible.sync="applyDialogVisible" width="30%">
        <el-input placeholder="请输入你的验证信息" v-model="formApplySchool.reason" clearable></el-input>

        <span slot="footer" class="dialog-footer">
          <el-button @click="applyDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="ApplySchool">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { myGet, myPost } from '@/utils/requestFunc.js'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'
import getUserListMixin from '@/utils/functionUtils/getUserListMixin'
import permissionComputer from '@/utils/functionUtils/permissionComputer'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'

export default {
  mixins: [getSchoolAndThemeMixin, permissionComputer, getUserListMixin],
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    if (this.hasSelectedSchool) {
      this.GetMySchoolInfo()
      this.GetUserList(this.userPageIndex, localStorage['school_id'])
    } else {
      this.GetSchoolListNoPublic(this.schoolPageIndex) // 默认为1
    }
    console.log(this.$store.getters.getSchoolId)
  },
  data () {
    return {
      applyDialogVisible: false,
      formApplySchool: {
        reason: '',
        school_name: '',
        school_id: -1
      },
      school: {
        name: '清华大学',
        description: '坐落于美丽的燕园隔壁',
        headmaster: '邱勇',
        population: 999
      },
      myName: localStorage['identity'],
      // userList: [], defined in mixin
      // schoolList: [], defined in mixin
      statusDict: {
        4: '校长',
        2: '老师',
        1: '同学'
      }
    }
  },
  computed: {
    calculateTagType () {
      return function (permission) {
        return permission === 4 ? 'warning' : permission === 2 ? 'success' : 'primary'
      }
    }
  },
  methods: {
    ApplySchool () {
      this.applyDialogVisible = false
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        apply_reason: this.formApplySchool.reason,
        apply_school_id: this.formApplySchool.school_id
      }
      myPost(
        '/api/school/user/apply',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            this.$message({
              type: 'success',
              message: '你的申请已经成功递交',
              duration: 2000
            })
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    ViewCurrentUser (index, row) {
      console.log('View user index: ', index)
      this.$router.push({ name: 'myinfo', params: { username: row.username } })
    },
    SendHello (index, row) {
      let queryJson = {
        token: this.$store.getters.getUserToken,
        username: row.username,
        content: '你好'
      }
      myPost(
        '/api/message/message/send',
        queryJson,
        res => {
          if (res.data.status === 1) {
            this.$message.success('发送成功！')
            this.$router.push('/chat')
          } else {
            this.$message.error('发送失败了～')
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
    GetMySchoolInfo () {
      myGet(
        '/api/school/school/get_specific',
        {
          token: this.$store.getters.getUserToken,
          school_id: localStorage['school_id']
        },
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            if (res.data.data.school) {
              this.school = res.data.data.school
            }
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
.el-pagination{
  width: 100%;
  padding: 0%;
}
</style>
