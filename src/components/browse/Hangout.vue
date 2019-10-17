<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%" v-loading="true">
        <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="作者" width="120"></el-table-column>
        <el-table-column prop="province" label="省份" width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column prop="url" label="URL" width="300"></el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
        <el-table-column prop="rating" label="打分" width="150">
          <el-rate></el-rate>
        </el-table-column>
        <el-table-column prop="rating" width="60" >
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="text" @click="addUser()">点击添加新用户</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick (row) {
      console.log(row)
    },
    addUser () {
      this.tableData.push(
        {
          date: '2016-05-02',
          name: '陈旭',
          province: '福建',
          city: '福州',
          url: 'www.chenxunb',
          zip: 2333
        }
      )
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
  background: url("../../assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: 100%;
}

</style>
