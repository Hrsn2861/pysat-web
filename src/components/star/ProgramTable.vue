<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
  >
    <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
    <el-table-column prop="user" label="用户" width="180"></el-table-column>
    <el-table-column prop="program" label="程序" :formatter="formatter" width="200"></el-table-column>
    <el-table-column prop="avg_rating" label="分数"></el-table-column>
    <el-table-column label="点赞" width="150">
      <el-button type="danger" icon="el-icon-star-on" circle></el-button>
    </el-table-column>
    <el-table-column prop="avg_rating" label="打分" width="150">
      <el-rate></el-rate>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  data () {
    // TODO : 使用PROPS接受传递进来的table参数然后显示
    return {
      tableData: [
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
    formatter (row, column) {
      return row.program
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
