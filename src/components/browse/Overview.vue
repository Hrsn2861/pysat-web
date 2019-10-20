<template>
  <div class="main-div">
    <el-col :span="12">
      <el-row>
        <el-card class="box-card box-card-lefttop" >
          <el-table :data="tableData" style="width: 100%" stripe>
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </el-card>
      </el-row>
      <el-row>
        <center>
          <h1>派塞特的世界</h1>
        </center>
      </el-row>
      <el-row>
        <el-card class="box-card">
          <el-carousel
            indicator-position="none"
            style="width:auto;height:20vh;overflow:hidden;margin:0%;padding:0%;"
          >
            <el-carousel-item v-for="item in 3" :key="item" style="height:15vw !important;">
              <h1>跑马灯不会做</h1>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-row>
        <el-card class="box-card-right">
            <el-calendar ></el-calendar>

        </el-card>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import { checkSession } from '@/utils/sessionUtils/sessionFunc'

export default {
  beforeCreate () {
    checkSession(this, '', '/')
  },
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>

<style scoped>

.main-div {
  height: 100%;
  width: 100%;
  margin: 0%;
  background: url("../../assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
}

.el-row {
  margin: 3%;
}
h1 {
  color: white;
  font-size: 5vh;
  user-select: none;
  margin: 10%;
}

.box-card:hover,
.box-card-right:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}

.box-card {

  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}
.el-card__body{
    padding:0px !important;
}
.box-card-lefttop{
    height: auto;
}
.box-card-right {
  height: auto;

  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}

.el-carousel__item:nth-child(3n) {
  background-color: turquoise;
}

.el-carousel__item:nth-child(3n + 1) {
  background-color: teal;
}
.el-carousel__item:nth-child(3n + 2) {
  background-color: steelblue;
}
</style>
