<template>
  <el-table
    :data="displayData"
    style="width: 100%"
    :default-sort="{prop: 'submit_time', order: 'descending'}"
    height="500"
  >
    <el-table-column prop="submit_time" label="提交时间" width="300"></el-table-column>
    <el-table-column prop="judge_time" label="审核时间" width="300"></el-table-column>
    <el-table-column prop="name" label="程序名" width="200"></el-table-column>
    <el-table-column prop="author" label="作者" width="200" fixed="right"></el-table-column>

  </el-table>
</template>
<script>

export default {
  props: [
    'displayData'
  ],
  data () {
    return {
      tableStatus: {
        likeIconOn: false
      }
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.active{
    height: 50vh;
}
</style>
