<template>
  <div class="main-div">
    <el-card class="box-card">
      <div class="avatar">
        <el-row type="flex" justify="center" style="height:100px !important">
          <img
            :src="imageURL"
            @click="changeAvatarVisible = !changeAvatarVisible"
            class="avatar-change"
          />
        </el-row>
        <el-row
          type="flex"
          justify="center"
          style="height:auto !important; user-select: none;"
        >点击头像就可以修改头像啦！</el-row>
        <transition name="fade">
          <el-row
            type="flex"
            justify="center"
            style="height:100px !important"
            v-if="changeAvatarVisible"
          >
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-row>
        </transition>
      </div>
      <el-row type="flex" justify="center" v-if="!changePwdVisible && !changePhoneVisible ">
        <!-- FIXME I don't know why local src pic is not allowd -->
        <!-- TODO CSS is too difficult -->
        <el-col class="my-info">
          <center><h1>个人信息</h1></center>
          <el-form ref="myInfo" label-width="100px">
            <el-form-item label="用户名">
              <el-input class="my-info-item" v-model="username" placeholder="" :disabled="changeInfoVisible"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input class="my-info-item" v-model="phonenumber" placeholder="" :disabled="changeInfoVisible"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input class="my-info-item" v-model="email" placeholder="" :disabled="changeInfoVisible"></el-input>
            </el-form-item>
            <el-form-item label="学校">
              <el-input class="my-info-item" v-model="school" placeholder="" :disabled="changeInfoVisible"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input class="my-info-item" v-model="realname" placeholder="" :disabled="changeInfoVisible"></el-input>
            </el-form-item>
            <el-form-item label="座右铭" style="margin-bottom:2%;">
              <el-input class="my-info-item" v-model="motto" placeholder="" :disabled="changeInfoVisible"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="!changePwdVisible && !changePhoneVisible ">
        <el-button type="danger" @click="logOut()">登出</el-button>
        <el-button type="primary" @click="changePwdVisible = !changePwdVisible">修改密码</el-button>
        <el-button type="primary" @click="changePhoneVisible = true; sendCAPTCHA()">修改手机号码</el-button>
        <el-button type="warning" @click="changeInfo()" >{{updateButtonText}}</el-button>

      </el-row>

      <transition name="fade">
        <div v-if="changePwdVisible" class="change">

            <el-input class="change-input" v-model="pwd.oldpwd" placeholder="旧密码" type="password"></el-input>
            <el-input class="change-input" v-model="pwd.newpwd" placeholder="新密码" type="password"></el-input>
            <el-button @click="changePwdVisible = false" class="change-button">取消</el-button>
            <el-button type="primary" @click="changePwd" class="change-button">更新</el-button>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="changePhoneVisible" class="change">
          <el-input class="change-input" v-model="phone.CAPTCHA" placeholder="验证码"></el-input>
          <el-input class="change-input" v-model="phone.newnumber" placeholder="新号码"></el-input>
          <el-button @click="changePhoneVisible = false" class="change-button">取消</el-button>
          <el-button id="update-btn" type="primary" @click="changePhone" class="change-button">更新</el-button>
          <!-- TODO :发送消息 -->
        </div>
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
      motto: 'None',
      changeAvatarVisible: false,
      changePwdVisible: false,
      changePhoneVisible: false,
      changeInfoVisible: true,
      updateButtonText: '修改信息!',
      imageURL: require('../../assets/icon.png'),

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
    changeAvatar () {},
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

    handleAvatarSuccess (res, file) {
      this.imageURL = URL.createObjectURL(file.raw)
      this.changeAvatarVisible = false
    },
    beforeAvatarUpload (file) {
      const isJPGPNG =
        (file.type === 'image/jpeg') | (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGPNG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPGPNG && isLt2M
    },

    changePwd () {
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
          if (res.data.status === 1) {
            this.pwd.oldpwd = this.pwd.newpwd
            this.$message.success(`${res.data.msg}`)
            this.changePwdVisible = false
            this.pwd.oldpwd = ''
            this.pwd.newpwd = ''
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },

    changePhone () {
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
          if (res.data.status === 1) {
            this.phonenumber = this.phone.newnumber
            this.$message.success(`${res.data.msg}`)
            this.changePhoneVisible = false
            this.phone.CAPTCHA = ''
            this.phone.newnumber = ''
            this.phonenumber = this.phone.newnumber
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    changeInfo () {
      if (this.changeInfoVisible === true) {
        this.changeInfoVisible = false
        // let olddata = {

        // }
        // 判断olddata和新data相同吗
        this.updateButtonText = '更新!'
      } else {
        this.changeInfoVisible = true
        // send API
        this.updateButtonText = '修改信息!'
      }
    },

    sendCAPTCHA () {
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        // username: this.username,
        phone: this.phonenumber
      }
      console.log(tmpdata)
      myPost(
        // 'api/user/sign/retrieve',
        'api/user/sign/verify',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    }
  }
}
</script>

<style scoped>
.avatar-change {
  height: 80px;
  width: 80px;
  border-radius: 100%;
  transition-duration: 1s;
  user-select: none;
}
.avatar-change:hover {
  transform: scale(1.1);
  transition-duration: 1s;
}
.main-div {
  height: 100%;
  width: 100%;
  margin: 0%;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0%;
  background: url('../../assets/background16-9-2.jpg');
  background-size:cover;
  background-repeat :none;
  height: 100%;
}
.box-card {
  align-self: center;
  padding: 1%;
  height: auto;
  width: 50%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}

.el-form-item{
  margin: 2%;
}

.change {
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.change-input {
  margin: 1%;
}
.change-button{
  margin: 0%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0%;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
