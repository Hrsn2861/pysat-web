<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-form>
        <el-form-item label="学校" v-if="permission_public>=8">
          <el-select v-model="currentSchoolId" placeholder="学校" @change="GetThemeList()">
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版块" v-if="permission_private<8">
          <el-select v-model="currentModuleId" placeholder="版块" @change="GetThemeList()">
            <el-option
              v-for="item in moduleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题">
          <el-select v-model="currentThemeId" placeholder="主题" @change="GetProgramList()">
            <el-option
              v-for="item in themeList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeTabName" @tab-click="GetProgramList()">
        <el-tab-pane label="最新程序" name="tabNew" >
          <ProgramTable ref = "tableNew" v-bind:displayData="tableData"></ProgramTable>
        </el-tab-pane>
        <el-tab-pane label="最热程序" name="tabHot">
          <ProgramTable ref = "tableHot" v-bind:displayData="tableData"></ProgramTable>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// import { myGet } from '@/utils/requestFunc.js'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import ProgramTable from '@/components/star/ProgramTable.vue'
import { myGet } from '@/utils/requestFunc.js'
import getSchoolAndThemeMixin from '@/utils/getListUtils/getThemeAndSchoolList'

export default {
  mixins: [getSchoolAndThemeMixin],
  components: {
    ProgramTable
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    this.permission_public = Number(localStorage.getItem('permission_public'))
    this.permission_private = Number(localStorage.getItem('permission_private'))
    if (this.permission_public >= 8) {
      this.GetSchoolList()
    }
    this.GetThemeList()
    this.GetProgramList()
  },
  data () {
    return {
      permission_public: -1,
      permission_private: -1,

      avtiveTabName: 'tabNew',
      currentSchoolId: 0,
      schoolList: [
        {
          id: 0,
          name: '野鸡大学'
        },
        {
          id: 1,
          name: '清华大学'
        },
        {
          id: 2,
          name: '北京大学'
        },
        {
          id: 3,
          name: '陈旭幼儿园'
        }
      ],

      currentModuleId: 0,
      moduleList: [
        {
          value: 0,
          label: '在野',
          disabled: this.permission_public < 1
        },
        {
          value: 1,
          label: '校内',
          disabled: this.permission_private < 1
        }
      ],

      currentThemeId: 0,
      themeList: [
        {
          id: 0,
          title: '共产主义'
        },
        {
          id: 1,
          title: '大家随意提交的题目'
        }
      ],

      tableData: [
        {
          upload_time: '2016-05-02',
          author: '陈旭',
          name: '面向陈旭程序设计基础',
          likes: 250,
          downloads: 250,
          liked: false,
          downloaded: true,
          id: 'imchenxulaoshi'
        },
        {
          upload_time: '6102-05-02',
          author: '顾掀宇',
          name: '编译原理PA1-B',
          likes: -100,
          downloads: -100,
          liked: true,
          downloaded: false,
          id: 'imxianyu'
        }

      ]
    }
  },
  methods: {
    GetSchoolList () {
      let tmpData = {
        token: this.$store.getters.getUserToken
      }
      this.GetSchoolListFromMixin(tmpData)
    },
    GetThemeList () {
      // 先判断ProgramTable里面是否显示author_school
      if (this.currentModuleId === 0) {
        this.$refs.tableHot.isPublic = true
        this.$refs.tableNew.isPublic = true
      } else {
        this.$refs.tableHot.isPublic = false
        this.$refs.tableNew.isPublic = false
      }
      let tmpData = {
        token: this.$store.getters.getUserToken,
        school_id: -1
      }
      if (this.permission_public >= 8) {
        tmpData.school_id = this.currentSchoolId
        console.log('嗯？')
      } else if (this.currentModuleId === 0) {
        tmpData.school_id = 0
      } else {
        tmpData.school_id = localStorage.getItem('school_id')
      }
      console.log(tmpData)
      this.GetThemeListFromMixin(tmpData)
    },

    // 啊这里的type指的是通过点击不同的tab，获取不同的api得到函数列表
    // 呵呵
    GetProgramList () {
      console.log(this.moduleName)
      console.log(this.activeTabName)
      let tmpData = {
        token: this.$store.getters.getUserToken,
        mine: false,
        sort_type: -1,
        school_id: -1,
        theme_id: this.currentThemeId,
        status_low: 4,
        status_up: 6
      }
      if (this.permission_public >= 8) {
        tmpData.school_id = this.currentSchoolId
      } else if (this.currentModuleId === 0) {
        tmpData.school_id = 0
      } else {
        tmpData.school_id = localStorage.getItem('school_id')
      }
      if (this.activeTabName === 'tabNew') {
        tmpData.sort_type = 0
      } else {
        tmpData.sort_type = 1
      }
      console.log(tmpData)
      myGet(
        '/api/program/list/get',
        tmpData,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            this.tableData = res.data.data.code_list
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
  height: 85vh;
  width: 95%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
  margin: 2%;
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
