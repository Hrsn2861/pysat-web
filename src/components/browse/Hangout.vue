<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-carousel height="400px">
        <el-carousel-item v-for="item in 4" :key="item">
          <center><h1>{{ item }}</h1></center>
          <center><h1>這裏也許有什麽推薦</h1></center>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick (row) {
      console.log('click from Hangout.vue')
    },
    addUser () {
      this.tableData.push({
        date: '2016-05-02',
        name: '陈旭',
        province: '福建',
        city: '福州',
        url: 'www.chenxunb',
        zip: 2333
      })
    }
  },

  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '陈旭',
          province: '福建',
          city: '福州',
          url: 'www.chenxunb',
          zip: 2333
        }
      ]
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
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
  margin: 5%;
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
h1{
    font-size: 100px;
    user-select: none;

}
.el-carousel__item h3 {
    display: flex;

    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
