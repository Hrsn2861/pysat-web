<template>
  <el-table
    :data="displayData.filter(data => !search || ((data.theme_name !== null)  && data.theme_name.toLowerCase().includes(search.toLowerCase())))"
    style="width: 100%"
    :default-sort="{prop: 'submit_time', order: 'descending'}"
    height="500"
  >
    <el-table-column prop="judge_time" label="审核时间" width="300"></el-table-column>
    <el-table-column prop="name" label="程序名" width="200"></el-table-column>
    <el-table-column prop="author" label="作者" width="200"></el-table-column>
    <el-table-column v-if="isPublic" prop="author_school_name" label="学校" width="180"></el-table-column>
    <el-table-column prop="theme_name" label="主题" width="180"></el-table-column>
    <el-table-column>
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          placeholder="输入关键字搜索主题"/>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>

export default {
  props: [
    'displayData',
    'isPublic'
  ],
  data () {
    return {
      tableStatus: {
        likeIconOn: false
      },
      search: ''
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
