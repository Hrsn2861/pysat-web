<template>
  <div class="main-div">
    <el-card class="box-card">
        <el-select v-model="currentSchoolId" placeholder="学校" @change="GetProgramList(1)">
          <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
      <el-tabs v-model="activeTabName" @tab-click="GetProgramList(1)">
        <el-tab-pane label="最新程序" name="tabNew" >
          <ProgramTable ref = "tableNew" :displayData="programList" :isPublic="isPublic" @StartSearch="StartSearch"></ProgramTable>
          <el-pagination :background="false" layout="prev, pager, next" :page-count="programPageCnt" :current-page.sync="programPageIndex" @current-change="GetJudgeList(programPageIndex)" @prev-click="programPageIndex --" @next-click="programPageIndex++"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="最热程序" name="tabHot">
          <ProgramTable ref = "tableHot" :displayData="programList" :isPublic="isPublic" @StartSearch="StartSearch"></ProgramTable>
          <el-pagination :background="false" layout="prev, pager, next" :page-count="programPageCnt" :current-page.sync="programPageIndex" @current-change="GetProgramList(programPageIndex)" @prev-click="judgePageIndex --" @next-click="judgePageIndex++"></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// import { myGet } from '@/utils/requestFunc.js'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import ProgramTable from '@/components/star/onstar/ProgramTable.vue'
import { myGet } from '@/utils/requestFunc.js'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'

export default {
  mixins: [getSchoolAndThemeMixin],
  components: {
    ProgramTable
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    if (localStorage['permission_public'] >= 8) {
      this.GetSchoolList()
    }
    this.GetProgramList()
  },
  data () {
    return {
      programPageCnt: 100,
      programPageIndex: 1,
      activeTabName: 'tabNew',
      programList: [
        {
          upload_time: '9999-12-31',
          author: '？？？',
          name: '？？？？？',
          theme_name: '？？？？？',
          likes: 0,
          downloads: 0,
          liked: false,
          downloaded: true,
          id: -1
        }
      ]
    }
  },

  computed: {
    isPublic () {
      return Number(this.currentSchoolId) === 0
    }
  },

  methods: {
    StartSearch (search) {
      this.GetProgramList(1, search)
    },
    // 这里的type指的是通过点击不同的tab，获取不同的api得到函数列表
    GetProgramList (index, text) {
      console.log(this.activeTabName)
      let tmpData = {
        token: this.$store.getters.getUserToken,
        mine: false,
        sort_type: -1,
        school_id: this.currentSchoolId,
        status_low: 4,
        status_up: 6
      }
      if (index) {
        tmpData['page'] = index
      }
      if (text) {
        tmpData['search_text'] = text
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
            this.programList = res.data.data.code_list
            this.programPageCnt = Math.ceil(res.data.data.tot_count / 20)
            console.log(this.programList)
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
  height: 100%;
  width: 95%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.95);
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
  background: url("~@/assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: auto;
}
.el-pagination{
  width: 100%;
  padding: 0%;
}
</style>
