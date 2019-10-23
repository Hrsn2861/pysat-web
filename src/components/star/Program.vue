<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-tabs v-model="activeTabName" @tab-click="getProgramList()">
        <el-tab-pane label="最新程序" name="tabNew" >
          <ProgramTable v-bind:displayData="tableData"></ProgramTable>
        </el-tab-pane>
        <el-tab-pane label="最热程序" name="tabHot">
          <ProgramTable v-bind:displayData="tableData"></ProgramTable>
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
    this.getProgramList()
  },
  data () {
    return {
      activeTabName: 'tabNew',
      tableData: [
        {
          upload_time: '2016-05-02',
          author: '陈旭',
          name: '面向陈旭程序设计基础',
          likes: 250,
          downloads: 250,
          codeid: 'imchenxulaoshi'
        },
        {
          upload_time: '6102-05-02',
          author: '顾掀宇',
          name: '编译原理PA1-B',
          likes: -100,
          downloads: -100,
          codeid: 'imxianyu'
        }

      ]
    }
  },
  methods: {
    // 啊这里的type指的是通过点击不同的tab，获取不同的api得到函数列表
    getProgramList () {
      console.log(this.activeTabName)
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        type: -1
      }
      if (this.activeTabName === 'tabNew') {
        tmpdata.type = 0
      } else {
        tmpdata.type = 1
      }
      myGet(
        '/api/program/list/onstar',
        tmpdata,
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
