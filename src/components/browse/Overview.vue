<template>
  <div class="main-div">
    <el-col :span="12">
      <el-row>
        <el-card class="box-card">
          <el-progress type="circle" :percentage="70" status="success"></el-progress>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card">
          <el-carousel
            indicator-position="outside"
            style="width:40vw!important;margin:0%;padding:0%;"
          >
            <el-carousel-item v-for="item in 3" :key="item">
              <h1>不知道不知道</h1>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-row>
      <el-row>
        <center>
          <h1>派塞特的世界</h1>
        </center>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-row>
        <el-card class="box-card-right">
          <el-table :data="tableData" style="width: 100%" stripe>
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </el-card>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
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
  width: 90%;
  padding: 5%;
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
}

.box-card:hover,
.box-card-right:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}

.box-card {
  height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}

.box-card-right {
  height: 80vh;

  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(3n) {
  background-color: turquoise;
}

.el-carousel__item:nth-child(3n + 1) {
  background-color: teal;
}
.el-carousel__item:nth-child(3n + 2) {
  background-color:steelblue;
}

</style>
