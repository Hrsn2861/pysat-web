<template>
  <el-table
    :data="displayData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
    height="500"
  >
    <el-table-column prop="submit_time" label="提交时间" width="300"></el-table-column>
    <el-table-column prop="name" label="程序名" :formatter="formatter" width="200"></el-table-column>
    <el-table-column prop="author" label="作者" width="180"></el-table-column>

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
    formatter (row, column) {
      return row.name
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.active{
    height: 50vh;
}
</style>
