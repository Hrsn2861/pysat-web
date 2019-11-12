<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-row >
        <el-col :lg="{span:2}" :sm="{span:3}" :xs="{span:8}">
          <h2>用户列表</h2>
        </el-col>
        <el-col :lg="{span:2}" :sm="{span:4}" :xs="{span:10}">
          <el-select
              v-model="currentSchoolId"
              placeholder="发布区域"
              @change="userPageIndex= 1;GetUserList(userPageIndex, currentSchoolId)"
              class="school-select"
            >
              <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-table :data="userList" style="width:100%" :height="tableHeight">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="username" label="用戶" fixed="left" width="130"></el-table-column>
        <el-table-column prop="motto" label="座右铭" :resizable="true"></el-table-column>
        <el-table-column prop="permission" label="用户权限" width="120"></el-table-column>
        <el-table-column prop="download" label="下载数" width="120"></el-table-column>
        <!-- <el-table-column prop="rating" label="打分" width="150">
          <el-rate></el-rate>
        </el-table-column> -->
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewCurrentUser(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :lg="{span:4}" :md="{span:6}" :xs="{span:12}" :sm="{span:12}">
          <el-pagination :background="false" layout="prev, pager, next" :page-count="userPageCnt" :current-page.sync="userPageIndex" @current-change="GetUserList(userPageIndex, currentSchoolId)" @prev-click="userPageIndex --" @next-click="userPageIndex++"></el-pagination>
        </el-col>
        <!-- <el-col :lg="{span:3}" :md="{span:5}" :xs="{span:14}" :sm="{span:5}">
          <el-button type="text" @click="GetUserList(userPageIndex, currentSchoolId)">刷新名单</el-button>
        </el-col> -->
        <!-- 这里刷新名单删除，不方便我排版 -->
        <el-col :lg="{span:3}" :md="{span:5}" :xs="{span:12}" :sm="{span:12}">
           <el-checkbox v-model="showInvalid"
              @change="GetUserList(userPageIndex, currentSchoolId, showInvalid)">显示封禁用户
            </el-checkbox>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {checkSession} from '@/utils/sessionUtils/sessionFunc'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'
import getUserMixin from '@/utils/functionUtils/getUserListMixin'
import permissionComputer from '@/utils/functionUtils/permissionComputer'

export default {
  mixins: [getSchoolAndThemeMixin, permissionComputer, getUserMixin],
  beforeCreate () {
    checkSession(this, '', '/')
  },
  computed: {
    tableHeight () {
      return document.documentElement.clientHeight * 0.8
    }
  },
  mounted: function () {
    if (localStorage.getItem('permission_public') >= 8) {
      this.GetSchoolList()
    } else {
      if (localStorage.getItem('permission_public') < 2) {
        this.schoolList[0].disabled = true
        this.currentSchoolId = this.schoolList[1].id // 在野权限不够，版块切换至校内
      }
      if (localStorage.getItem('permission_private') < 2) {
        this.schoolList[1].disabled = true
      }
    }
    this.GetUserList(this.userPageIndex, this.currentSchoolId)
  },
  methods: {
    viewCurrentUser (index, row) {
      console.log('View user index: ', index)
      this.$router.push({name: 'myinfo', params: {username: row.username}})
    },
    handleClick (row) {
      console.log('click from Hangout.vue')
    }
  },

  data () {
    return {
      showInvalid: false
      // moved to getUserListMixin
      // userList: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box-card {
  align-self: center;
  height: 97%;
  width: 100%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
  margin-left: 3%;
  margin-right: 3%;
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}
h2{
  margin-top: 0%;
  margin-bottom: 1%;
  margin-right: 2%;
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
.school-select{
  margin-bottom: 5%;
}
.el-pagination{
  width: 100%;
  padding: 0%;
}
</style>
