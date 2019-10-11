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
import { checkSession } from '@/utils/session.js'
import { myGet } from '@/utils/request.js'

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
    checkSession(this, '', '/')
  },
  mounted: function () {
    this.getmyinfo()
  },
  methods: {
    logout () {
      this.$store.dispatch('userLogOut')
      this.$router.push('/index/login')
    },
    getmyinfo () {
      myGet('/api/user/info/get', {token: this.$store.getters.getUserToken},
        res => {
          if (res.data.status === 1) {
            this.username = res.data.data.user.username
            this.phonenumber = res.data.data.user.phone

            this.school = res.data.data.user.school
            this.realname = res.data.data.user.realname
          }
        },
        err => {
          this.$message({
            type: 'error',
            message: err,
            duration: 1000
          })
        }
      )
    }

  }
}
</script>

<style>
</style>
