<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-form>
        <el-form-item label="版块">
          <el-select v-model="moduleId" placeholder="版块" @change="GetThemeList()">
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
              :label="item.name"
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

export default {
  components: {
    ProgramTable
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    this.GetProgramList()
  },
  data () {
    return {
      avtiveTabName: 'tabNew',
      currentThemeId: 0,
      themeList: [
        {
          id: 0,
          name: '共产主义'
        },
        {
          id: 1,
          name: '大家随意提交的题目'
        }
      ],
      moduleId: 0,
      moduleList: [
        {
          value: 0,
          label: '在野'
        },
        {
          value: 1,
          label: '校内'
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
    GetThemeList () {
      // 先判断ProgramTable里面是否显示author_school
      if (this.moduleId === 0) {
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
      if (this.moduleId === 0) {
        tmpData.school_id = 0
      } else {
        tmpData.school_id = localStorage.getItem('school_id')
      }
      console.log(tmpData)

      myGet(
        '/api/school/theme/list/get',
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.themeList = res.data.data.theme_list
            console.log(this.themeList)
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
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
        theme_id: -1,
        status_low: 4,
        status_up: 6
      }
      if (this.moduleId === 0) {
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
            this.tableData = res.data.data.codelist
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
