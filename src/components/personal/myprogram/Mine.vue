<template>
  <div class="main-div">
    <el-card class="box-card">
      <h2>我的程序</h2>
      <MineTable :displayData="mineList" ref="MineTable"></MineTable>
      <el-pagination :background="false" layout="prev, pager, next" :page-count="minePageCnt" :current-page.sync="minePageIndex" @current-change="GetSchoolListNoPublic(minePageIndex)" @prev-click="minePageIndex --" @next-click="minePageIndex++"></el-pagination>

    </el-card>
  </div>
</template>

<script>
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import MineTable from '@/components/personal/myprogram/MineTable.vue'
import { myGet } from '@/utils/requestFunc.js'

export default {
  components: {
    MineTable
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    this.GetMineList()
  },
  data () {
    return {
      minePageCnt: 100,
      minePageIndex: 1,
      mineList: [
        {
          submit_time: '2016-05-02',
          name: '面向陈旭程序设计基础',
          status: -1,
          id: 'imchenxulaoshi'
        },
        {
          submit_time: '6102-05-02',
          name: '编译原理PA1-B',
          status: 1,
          id: 'imxianyu'
        }

      ]
    }
  },
  methods: {
    GetMineList (index) {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        mine: true
      }
      if (index) {
        tmpData['page'] = index
      }
      myGet(
        '/api/program/list/get',
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.mineList = res.data.data.code_list
            this.minePageCnt = Math.ceil(res.data.data.tot_count / 20)
            console.log(res.data.data.code_list)
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
  height: auto;
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
  height: 100%;
}
.el-pagination{
  padding: 0%;
}
</style>
