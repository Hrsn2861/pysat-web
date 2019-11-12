<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-select v-model="currentSchoolId" placeholder="学校" @change="GetQueueList(1)">
        <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
      </el-select>
      <QueueTable :displayData="queueList" :isPublic="isPublic"></QueueTable>
      <el-pagination :background="false" layout="prev, pager, next" :page-count="queuePageCnt" :current-page.sync="queuePageIndex" @current-change="GetQueueList(queuePageIndex)" @prev-click="queuePageIndex --" @next-click="queuePageIndex++"></el-pagination>

    </el-card>
  </div>
</template>

<script>
// import { myGet } from '@/utils/requestFunc.js'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import QueueTable from '@/components/star/inqueue/QueueTable.vue'
import { myGet } from '@/utils/requestFunc.js'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'

export default {
  mixins: [getSchoolAndThemeMixin],

  components: {
    QueueTable
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  created () {

  },
  mounted: function () {
    if (localStorage['permission_public'] >= 8) {
      this.GetSchoolList()
    }
    this.GetQueueList()
  },
  data () {
    return {
      queuePageCnt: 100,
      queuePageIndex: 1,
      queueList: [
        {
          submit_time: '9999-12-31',
          author: '？？？',
          name: '？？？？？',
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
    GetQueueList (index) {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        mine: false,
        school_id: this.currentSchoolId,
        status_low: 3,
        status_up: 5
      }
      if (index) {
        tmpData['page'] = index
      }
      console.log(tmpData)
      myGet(
        '/api/program/list/get',
        tmpData,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data)
            this.queueList = res.data.data.code_list
            this.queuePageCnt = Math.ceil(res.data.data.tot_count / 20)
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
  width: 100%;
  padding: 0%;
}
</style>
