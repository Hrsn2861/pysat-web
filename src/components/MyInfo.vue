<template>
<div style="padding: 200px">
      <el-card class="box-card">
            <el-row type="flex" justify="center">
      <el-col :span="2" style="width:20%;align-items:center;display:flex">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="fit" style="width:60%;height:60%;display:flex;align-items:center"></el-avatar>
      </el-col>
      <!-- FIXME I don't know why local src pic is not allowd -->
      <!-- TODO CSS is too difficult -->
                  <el-col :span="16">
                        <h1>个人信息</h1>
                        <p>UserName: {{ username }}</p>
                        <p>Phone: {{ phonenumber }}</p>
                        <p>Email: {{ email }}</p>
        <p>School: {{ school }}</p>
        <p>RealName: {{realname }}</p>
                  </el-col>
            </el-row>
    <el-row type="flex" justify="center">
      <el-button type="danger" @click="logout()">登出</el-button>
    </el-row>
      </el-card>
</div>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge'

export default {
  name: 'MyInfo',
  data () {
    return {
      username: 'None',
      phonenumber: 'None',
      email: 'None',
      school: 'None',
      realname: 'None'

    }
  },
  beforeCreate () {
    if (this.$store.state.user == null) {
      this.$router.push('/')
    }
    // myPost('api/session/start', {},
    //   res => {
    //     let data = {
    //       token: res.data.data.token
    //     }
    //     this.$store.dispatch('setToken', data)
    //   },

    //   err => {
    //     this.$message.error(`${err.message}`)
    //   }
    // )
    // this.$axios
    //   .get('/api/check_login/', {
    //     params: { entrykey: this.$store.getters.getUserToken }
    //   })
    //   .then(res => {
    //     if (res.data.status === 1) {
    //       this.$router.push('/myinfo')
    //     }
    //   })
    //   .catch(err => {
    //     this.$message.error(`${err.message}`)
    //   })
  },
  mounted: function () {
    // this.getmyinfo()
  },
  methods: {
    logout () {
      this.$store.dispatch('userLogOut')
      this.$router.push('/index/login')
    }
    // getmyinfo () {
    //   this.$axios.get('/api/check_login/', {params: {entrykey: this.$store.getters.getUserToken}}).then(res => {
    //     // console.log(res.data)
    //     if (this.$store.getters.getUserToken) {
    //       this.username = res.data.user.username
    //       this.phonenumber = res.data.user.telphone
    //       this.email = res.data.user.email
    //       this.school = res.data.user.school
    //       this.realname = res.data.user.realname
    //     }
    //   }).catch(err => {
    //     // console.log(err)
    //     this.$message({
    //       type: 'error',
    //       message: err,
    //       duration: 1000
    //     })
    //   })
    // // }
  }

}
</script>

<style>
</style>
