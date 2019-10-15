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
          <el-input v-model="username" placeholder="用户名" ></el-input>
          <el-input v-model="phonenumber" placeholder="电话号码" ></el-input>
          <el-input v-model="email" placeholder="Email" ></el-input>
          <el-input v-model="school" placeholder="学校" ></el-input>
          <el-input v-model="realname" placeholder="真实姓名" ></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">

        <el-button type="danger" @click="logOut()">登出</el-button>
        <el-button type="primary" @click="changePwdVisible = true">修改密码</el-button>
        <el-button type="primary" @click="changePhoneVisible = true; sendCAPTCHA()">修改手机号码</el-button>

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
      <el-row v-if="changePwdVisible" class="change" >
        <el-input class="change-pswd-input" v-model="pwd.oldpwd" placeholder="旧密码" ></el-input>
        <el-input class="change-pswd-input" v-model="pwd.newpwd" placeholder="新密码" ></el-input>
        <el-button @click="changePwdVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">更 新</el-button>
      </el-row>
      </transition>

      <transition name="fade">
      <el-row v-if="changePhoneVisible" class="change" >
        <el-input class="change-input" v-model="phone.CAPTCHA" placeholder="验证码" ></el-input>
        <el-input class="change-input" v-model="phone.newnumber" placeholder="新手机号" ></el-input>
        <el-button @click="changePhoneVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePhone">更 新</el-button>
        <!-- TODO :发送消息 -->
      </el-row>
      </transition>

    </el-card>
  </div>
  <!-- <el-dialog class="my-dialog" title="提示" :visible.sync="changePassWdVisible" width="50%" :before-close="handleClose"> -->
</template>

<script>
import { checkSession, logout } from '@/utils/session.js'
import { myGet, myPost } from '@/utils/request.js'
import { Encrypt } from '@/utils/crypt.js'

export default {
  name: 'MyInfo',
  data () {
    return {
      username: 'None',
      phonenumber: 'None',
      email: 'None',
      school: 'None',
      realname: 'None',
      changePwdVisible: false,
      changePhoneVisible: false,

      pwd: {
        oldpwd: '',
        newpwd: ''
      },
      phone: {
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
    },
	
    changePwd() {
      let tmpdata = {
		  token: this.$store.getters.getUserToken,
          oldpassword: Encrypt(this.pwd.oldpwd),
		  newpassword: Encrypt(this.pwd.newpwd)
	  }
	  console.log(tmpdata)
	  myPost(
	    'api/user/sign/modify',
		tmpdata,
		res => {
		  if (res.data.status == 1) {
		    this.pwd.oldpwd = this.pwd.newpwd;
			this.$message.success(`${res.data.msg}`);
			this.changePwdVisible = false;
			this.pwd.oldpwd = '';
			this.pwd.newpwd = '';
		  }
		  else {
		    this.$message.error(`${res.data.msg}`);
		  }
		},
		err => {
			this.$message.error(`${err.message}`, 'ERROR!');
		}
	  )
	},
	
	changePhone() {
	  let tmpdata = {
		  token: this.$store.getters.getUserToken,
	      phone: this.phone.newnumber,
		  CAPTCHA: this.phone.CAPTCHA
	  }
	  console.log(tmpdata)
	  myPost(
	    'api/user/info/setphone',
		tmpdata,
		res => {
		  if (res.data.status == 1) {
		    this.phonenumber = this.phone.newnumber;
			this.$message.success(`${res.data.msg}`);
			this.changePhoneVisible = false;
			this.phone.CAPTCHA = '';
			this.phone.newnumber = '';
			this.phonenumber = this.phone.newnumber;
		  }
		  else {
		    this.$message.error(`${res.data.msg}`);
		  }
		},
		err => {
			this.$message.error(`${err.message}`, 'ERROR!');
		}
	  )
	},
	
	sendCAPTCHA() {
		let tmpdata = {
			token: this.$store.getters.getUserToken,
			//username: this.username,
			phone: this.phonenumber
		}
		console.log(tmpdata)
		myPost(
			//'api/user/sign/retrieve',
			'api/user/sign/verify',
			tmpdata,
			res => {
				if (res.data.status == 1) {
					this.$message.success(`${res.data.msg}`);
				}
				else {
					this.$message.error(`${res.data.msg}`);
				}
			},
			err => {
				this.$message.error(`${err.message}`, 'ERROR!');
			}			
		)
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
