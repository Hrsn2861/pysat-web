<template>
  <el-table
    :data="displayData"
    style="width: 100%"
    :default-sort="{prop: 'submit_time', order: 'descending'}"
    :height="tableHeight"
  >

    <el-table-column prop="name" label="程序名" width="150" fixed="left"></el-table-column>
    <el-table-column prop="author" label="作者" width="200"></el-table-column>
    <el-table-column v-if="isPublic" prop="author_school_name" label="学校" width="180"></el-table-column>
    <el-table-column prop="theme_name" label="主题" width="180"></el-table-column>
    <el-table-column prop="judge_time" label="审核时间" width="200"></el-table-column>
    <el-table-column fixed="right" width="250">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          placeholder="输入关键字搜索主题"/>
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="100">
      <template slot="header" slot-scope="scope">
        <el-button type="primary" @click="StartSearch">搜索</el-button>
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
    StartSearch () {
      console.log('StartSearch:' + this.search)
      this.$emit('StartSearch', this.search)
    }
  },
  computed: {
    tableHeight () {
      return document.documentElement.clientHeight * 0.8
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
