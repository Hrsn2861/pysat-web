<template>
  <div class="main-div">
    <el-card class="box-card">
        <el-select v-model="currentSchoolId" placeholder="学校" @change="GetProgramList()">
          <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
      <el-tabs v-model="activeTabName" @tab-click="GetProgramList()">
        <el-tab-pane label="最新程序" name="tabNew" >
          <ProgramTable ref = "tableNew" :displayData="tableData" :isPublic="isPublic"></ProgramTable>
        </el-tab-pane>
        <el-tab-pane label="最热程序" name="tabHot">
          <ProgramTable ref = "tableHot" :displayData="tableData" :isPublic="isPublic"></ProgramTable>
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
      activeTabName: 'tabNew',
      tableData: [
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
    // 这里的type指的是通过点击不同的tab，获取不同的api得到函数列表
    GetProgramList () {
      console.log(this.activeTabName)
      let tmpData = {
        token: this.$store.getters.getUserToken,
        mine: false,
        sort_type: -1,
        school_id: this.currentSchoolId,
        status_low: 4,
        status_up: 6
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
            this.tableData = res.data.data.code_list
            console.log(this.tableData)
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
  background: url("~@/assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: 100%;
}
</style>
