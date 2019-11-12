<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-row style="margin-bottom:2%;">
        <!-- change为选中值发生变化时触发 -->
        <el-select v-model="currentSchoolId" placeholder="学校" @change="GetThemeList()">
          <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
        <el-button @click="NewThemeDialog()" v-if="isRightAdmin(2) && $route.path===urlAdmin">点击创建</el-button>
        <el-button @click="GetThemeList()">刷新一下</el-button>
      </el-row>

      <ThemeTable
      :displayData="themeList"
      :currentSchoolId="currentSchoolId"
      @ModifyTheme="ModifyTheme"
      @DeleteTheme="DeleteTheme"
      >
      </ThemeTable>
      <el-pagination :background="false" layout="prev, pager, next" :page-count="themePageCnt" :current-page.sync="themePageIndex" @current-change="GetThemeList(themePageIndex)"  @prev-click="themePageIndex --" @next-click="themePageIndex++"></el-pagination>
      <el-dialog :title="themeStatus" :visible.sync="themeDialogVisible" width="30%">
        <el-input v-model="formCreateTheme.theme_name" placeholder="请输入主题名称"></el-input>
        <el-input v-model="formCreateTheme.theme_description" placeholder="请输入主题描述"></el-input>
        <el-select
          v-model="formCreateTheme.school_id"
          placeholder="发布区域"
          v-if='themeStatus === "新建主题"'
        >
          <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-date-picker v-model="formCreateTheme.theme_deadline" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">></el-date-picker>
        <span slot="footer" class="dialog-footer">
          <el-button @click="themeDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="UpdateTheme()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { myPost } from '@/utils/requestFunc.js'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'
import ThemeTable from '@/components/theme/ThemeTable'
import permissionComputer from '@/utils/functionUtils/permissionComputer'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'

export default {
  inject: ['reload'],
  beforeRouteLeave (to, from, next) {
    if ((from.path.startsWith('/admin/program') && to.path.startsWith('/theme/submit')) ||
    (to.path.startsWith('/admin/program') && from.path.startsWith('/theme/submit'))) {
      console.log('beforeRouteLeave')
      next()
      this.reload()
    } else {
      next()
    }
  },

  components: {
    ThemeTable
  },
  mixins: [getSchoolAndThemeMixin, permissionComputer],
  beforeCreate () {
    checkSession(this, '', '/')
  },

  mounted: function () {
    console.log('mounted')
    if (this.$route.path === this.urlAdmin) {
      this.currentlevel = 2
    } else {
      this.currentlevel = 0
    }
    if (localStorage.getItem('permission_public') >= 8) {
      this.GetSchoolList()
    } else {
      if (localStorage.getItem('permission_public') < this.currentlevel) {
        this.schoolList[0].disabled = true
        this.currentSchoolId = this.schoolList[1].id // 在野权限不够，版块切换至校内
      }
      if (localStorage.getItem('permission_private') < this.currentlevel) {
        this.schoolList[1].disabled = true
      }
    }
    this.GetThemeList()
  },

  computed: {

  },

  data () {
    return {
      urlSubmit: '/theme/submit',
      urlAdmin: '/admin/program',
      currentlevel: -1,
      themeStatus: '',
      themeDialogVisible: false,

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

    NewThemeDialog () {
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
        theme_id: row.id
      }
      myPost(
        '/api/school/theme/delete',
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.themeList.splice(index, 1)
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
      this.formCreateTheme.theme_name = row.title
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
      console.log(tmpData.theme_deadline)
      myPost(
        api,
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.themeDialogVisible = false
            this.GetThemeList(this.themePageIndex)
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
  background: url("~@/assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: 100%;
}
.box-card {
  align-self: center;
  padding: 0%;
  height: 100%;
  width: 88%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.97);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}
.create-theme {
  margin-top: 0.5%;
}
.el-pagination{
  padding: 0%;
}
.el-select{
  width: 25%;
}
.el-button{
  margin: 0%;
}
</style>
