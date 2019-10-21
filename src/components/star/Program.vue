<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="全部程序" name="tabAll">
          <ProgramTable v-bind:displayData="TableData"></ProgramTable>
          <!-- TODO ： 使用PROPS把参数传进去 -->
          <!-- 用了这个东西看起来只需要我们在这个页面获取到tableData，然后通过v-bind绑定到ProgramTable就可以呈现了 -->
        </el-tab-pane>
        <el-tab-pane label="最新程序" name="tabNew">
          <ProgramTable></ProgramTable>
        </el-tab-pane>
        <el-tab-pane label="最热程序" name="tabHot">
          <ProgramTable></ProgramTable>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// import { myGet } from '@/utils/requestFunc.js'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import ProgramTable from '@/components/star/ProgramTable.vue'

export default {
  components: {
    ProgramTable
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  data () {
    return {
      activeTabName: 'tabAll',
      TableData: [
        {
          date: '2016-05-02',
          user: '陈旭',
          program: '计算机组成原理HW3',
          avg_rating: 4.0
        },
        {
          date: '2016-05-02',
          user: '陈浩展',
          program: '编译原理PA1-b',
          avg_rating: 3.3
        },
        {
          date: '2016-05-02',
          user: '禹含',
          program: '软件工程',
          avg_rating: 2.7
        },
        {
          date: '2016-05-02',
          user: '庆语其',
          program: '信号处理原理',
          avg_rating: 3.6
        }
      ]
    }
  },
  methods: {
    // 啊这里的type指的是通过点击不同的tab，获取不同的api得到函数列表
    getProgramData (type) {
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
