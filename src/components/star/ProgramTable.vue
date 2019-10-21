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
      <el-button  v-bind:class="{active : tableStatus.likeIconOn}" icon="el-icon-star-off" circle @click="likeOrDislike()"></el-button>
    </el-table-column>
    <el-table-column prop="avg_rating" label="打分" width="150">
      <el-rate></el-rate>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: [
    'displayData'
  ],
  data () {
    // TODO : 使用PROPS接受传递进来的table参数然后显示
    return {
      tableData: this.displayData,
      tableStatus: {
        likeIconOn: false
      }
    }
  },
  methods: {
    formatter (row, column) {
      return row.program
    },
    likeOrdislike () {
      // unimplemented()!
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
