<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-row type="flex" justify="center">
        <el-col
          :span="2"
          style="width:auto;align-items:center;display:flex;margin-left:5%;margin-right:10%;"
        >
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            style="height:50px;width:50px;"
            fit="fit"
          ></el-avatar>
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
        <el-button type="danger" @click="logOut()">登出</el-button>
        <el-button type="primary" @click="changePassWdVisible = true">修改密码</el-button>
        <el-button type="primary" @click="changePhoneVisible = true">修改手机号码</el-button>

        <!-- <el-dialog class="my-dialog" title="修改密码" :visible.sync="changePassWdVisible" width="30%">
          <el-input v-model="passwd.oldpasswd" placeholder="请输入旧密码"></el-input>
          <el-input v-model="passwd.newpasswd" placeholder="请输入新密码"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="changePassWdVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePassWdVisible = false">更 新</el-button>
          </span>
        </el-dialog> -->
      </el-row>

      <transition name="fade">
      <el-row v-if="changePassWdVisible" class="change" >
        <el-input class="change-pswd-input" v-model="passwd.oldpasswd" placeholder="旧密码" ></el-input>
        <el-input class="change-pswd-input" v-model="passwd.newpasswd" placeholder="新密码" ></el-input>
        <el-button @click="changePassWdVisible = false">取 消</el-button>
        <el-button type="primary" @>更 新</el-button>
      </el-row>
      </transition>

      <transition name="fade">
      <el-row v-if="changePhoneVisible" class="change" >
        <el-input class="change-input" v-model="changePhone.CAPTCHA" placeholder="验证码" ></el-input>
        <el-input class="change-input" v-model="changePhone.newnumber" placeholder="新手机号" ></el-input>
        <el-button @click="changePhoneVisible = false">取 消</el-button>
        <el-button type="primary" @>更 新</el-button>
        <!-- TODO :发送消息 -->
      </el-row>
      </transition>

    </el-card>
  </div>
  <!-- <el-dialog class="my-dialog" title="提示" :visible.sync="changePassWdVisible" width="50%" :before-close="handleClose"> -->
</template>

<script>
import { checkSession, logout } from '@/utils/session.js'
import { myGet } from '@/utils/request.js'

export default {
  name: 'MyInfo',
  data () {
    return {
      username: 'None',
      phonenumber: 'None',
      email: 'None',
      school: 'None',
      realname: 'None',
      changePassWdVisible: false,
      changePhoneVisible: false,

      passwd: {
        oldpasswd: '',
        newpasswd: ''
      },
      changePhone: {
        CAPTCHA: '',
        newnumber: ''
      }
    }
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted: function () {
    this.getmyinfo()
  },
  methods: {
    // logOut () {
    //   logout()
    //   this.$router.push('/login')
    // },     //必须加this才可以！!!
    async logOut () {
      await logout(this)
      this.$router.go(0) // 刷新页面
    },
    getmyinfo () {
      myGet(
        '/api/user/info/get',
        { token: this.$store.getters.getUserToken },
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
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>
.main-div {
  height: 100%;
  width: 100%;
  margin: 0%;
  display: flex;
  align-content: center;
  justify-content: center;
}
.box-card {
  align-self: center;
  padding: 1%;
  height: auto;
  width: 25%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}
.my-dialog {
  align-self: center;

  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(40, 102, 236, 0.37);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}

.change{
  margin-top: 2%;
  display: flex;
  align-items: center;
}
.change-input{
  margin: 1%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
