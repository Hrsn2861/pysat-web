<template>
<div style="padding: 200px">
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <h1>个人信息</h1>
        <p>UserName: {{ username }}</p>
        <p>Phone: {{ phonenumber }}</p>
        <p>Email: {{ email }}</p>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>

export default {
  name: 'MyInfo',
  data () {
    return {
      username: 'None',
      phonenumber: 'None',
      email: 'None'
    }
  },
  watch: {
    $route (to, from) {
      console.log(to.path)
      if (to.path === '/MyInfo') { console.log('个人信息') }
    }
  },
  methods: {
    getmyinfo (entrykey) {
      this.$axios.get('/api/info', {param: entrykey}).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: 'Could not find',
          duration: 1000
        })
      })
    }
  }
}
</script>

<style>
</style>
