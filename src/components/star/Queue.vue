<template>
  <div class="main-div">
    <el-card class="box-card">
      <QueueTable v-bind:displayData="tableData"></QueueTable>
    </el-card>
  </div>
</template>

<script>
// import { myGet } from '@/utils/requestFunc.js'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import QueueTable from '@/components/star/QueueTable.vue'
import { myGet } from '@/utils/requestFunc.js'

export default {
  components: {
    QueueTable
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    this.getQueueList()
  },
  data () {
    return {
      tableData: [
        {
          submit_time: '2016-05-02',
          name: '面向陈旭程序设计基础',
          author: '陈旭老师',
          id: 'woshishuji'
        },
        {
          submit_time: '6102-05-02',
          name: '编译原理PA1-B',
          author: '大牛顾掀宇',
          id: 'woshidaniu'
        }

      ]
    }
  },
  methods: {
    getQueueList () {
      let tmpdata = {
        token: this.$store.getters.getUserToken
      }
      myGet(
        '/api/program/list/inqueue',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            console.log(res)
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
