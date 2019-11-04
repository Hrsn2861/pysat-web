<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-row style="margin-bottom:2%;">
        <!-- change为选中值发生变化时触发 -->
        <el-select v-model="currentSchoolId" placeholder="学校" @change="GetSchoolList()">
          <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button @click="NewTheme()">点击创建</el-button>
        <el-button @click="GetThemeList">刷新主题</el-button>
      </el-row>
      <el-table :data="themeList" style="width: 100%" height="800">
        <el-table-column prop="id" label="主题ID" width="80"></el-table-column>
        <el-table-column prop="name" label="主题名称" width="150"></el-table-column>
        <el-table-column prop="description" label="描述" :resizable="true"></el-table-column>
        <el-table-column prop="release_date" label="发布/修改时间" width="150"></el-table-column>
        <el-table-column prop="deadline" label="截止日期" width="150"></el-table-column>
        <el-table-column prop="count" label="相关主题数" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-if="isHeadmasterOrGreater"
              type="text"
              size="small"
              @click="DeleteTheme(scope.$index, scope.row)"
            >删除</el-button>
            <el-button type="text" size="small" @click="ModifyTheme(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="themeStatus" :visible.sync="themeDialogVisible" width="30%">
        <el-input v-model="formCreateTheme.theme_name" placeholder="请输入主题名称"></el-input>
        <el-input v-model="formCreateTheme.theme_description" placeholder="请输入主题描述"></el-input>
        <el-select
          v-model="formCreateTheme.school_id"
          placeholder="发布区域"
          v-if='themeStatus === "新建主题"'
          @change="GetSchoolList()"
        >
          <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-date-picker v-model="formCreateTheme.theme_deadline" type="date" placeholder="选择日期"></el-date-picker>
        <span slot="footer" class="dialog-footer">
          <el-button @click="themeDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="UpdateTheme()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { myGet, myPost } from '@/utils/requestFunc.js'
import getSchoolAndThemeMixin from '@/utils/getListUtils/getThemeAndSchoolList'

export default {
  mixins: [getSchoolAndThemeMixin],
  computed: {
    // 这里暂时好像没有用
    isPrivateAndPublicAdmin () {
      return (
        localStorage['permission_private'] >= 2 &&
        localStorage['permission_public'] >= 2
      )
    },
    isHeadmasterOrGreater () {
      // return localStorage['permission_private'] >= 4 || localStorage['permission_public'] >= 4
      if (this.currentSchoolId === 0) {
        return localStorage['permission_public'] >= 4
      } else {
        return localStorage['permission_private'] >= 4
      }
    }
  },
  mounted: function () {
    this.GetThemeList()
    this.GetSchoolList()
  },
  data () {
    return {
      themeStatus: '',
      currentSchoolId: localStorage['school_id'],
      themeDialogVisible: false,
      themeList: [
        {
          id: 0,
          name: '编译原理PA2',
          release_date: '2019-11-5',
          deadline: '2019-11-6',
          description: '编译原理的一项作业',
          count: 199
        }
      ],
      schoolList: [
        {
          id: localStorage['school_id'],
          name: localStorage['school_name']
        }
      ],
      formCreateTheme: {
        token: this.$store.getters.getUsereToken,
        school_id: '',
        theme_id: '',
        theme_name: '',
        theme_deadline: '',
        theme_description: ''
      }
    }
  },
  methods: {
    GetSchoolList () {
      if (this.isPrivateAndPublicAdmin) {
        let tmpData = {
          token: this.$store.getters.getUserToken
        }
        this.getSchoolListFromMixin(tmpData)
      }
    },
    GetThemeList () {
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        school_id: this.currentSchoolId
      }
      this.GetThemeListFromMixin(tmpdata)
    },
    NewTheme () {
      this.themeDialogVisible = true
      this.themeStatus = '新建主题'
      this.formCreateTheme.theme_name = ''
      this.formCreateTheme.theme_id = ''
      this.formCreateTheme.theme_description = ''
      this.formCreateTheme.theme_deadline = ''
    },
    DeleteTheme (index, row) {
      // console.log(row.id)
      let tmpData = {
        token: this.$store.getters.getUserToken,
        theme_id: row
      }
      myGet(
        '/api/school/theme/delete',
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.GetSchoolList()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    ModifyTheme (index, row) {
      this.themeDialogVisible = true
      console.log(row)
      this.themeStatus = '修改主题'
      this.formCreateTheme.theme_id = row.id
      this.formCreateTheme.theme_name = row.name
      this.formCreateTheme.theme_description = row.description
      this.formCreateTheme.theme_deadline = row.deadline
    },
    UpdateTheme () {
      var api = ''
      var tmpData = {}
      if (this.themeStatus === '新建主题') {
        api = '/api/school/theme/create'
        tmpData = {
          token: this.$store.getters.getUserToken,
          school_id: this.formCreateTheme.school_id,
          theme_name: this.formCreateTheme.theme_name,
          theme_description: this.formCreateTheme.theme_description,
          theme_deadline: this.formCreateTheme.theme_deadline
        }
      } else {
        api = '/api/school/theme/modify'
        tmpData = {
          token: this.$store.getters.getUserToken,
          theme_id: this.formCreateTheme.theme_id,
          theme_name: this.formCreateTheme.theme_name,
          theme_description: this.formCreateTheme.theme_description,
          theme_deadline: this.formCreateTheme.theme_deadline
        }
      }
      myPost(
        api,
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.themeDialogVisible = false
            this.GetThemeList()
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
.box-card {
  align-self: center;
  padding: 0%;
  height: 100%;
  width: 80%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}
.el-table {
  height: auto !important;
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}
.create-theme {
  margin-top: 0.5%;
}
</style>
