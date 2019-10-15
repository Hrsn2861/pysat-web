<template>
  <div class="main-div">
    <el-card class="box-card">
      <div class="avatar">
        <el-row type="flex" justify="center" style="height:100px !important" >
          <img :src="imageURL" @click="changeAvatarVisible = !changeAvatarVisible" class="avatar-change" />
        </el-row>
        <el-row type="flex" justify="center" style="height:auto !important; user-select: none;" >
          点击头像就可以修改头像啦！
        </el-row>
        <transition name="fade">
        <el-row type="flex" justify="center" style="height:100px !important" v-if="changeAvatarVisible">
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
      <el-row type="flex" justify="center">
        <!-- FIXME I don't know why local src pic is not allowd -->
        <!-- TODO CSS is too difficult -->
        <el-col class="my-info">
          <h1>个人信息</h1>
          <el-input class="my-info-item" v-model="username" placeholder="用户名"></el-input>
          <el-input class="my-info-item" v-model="phonenumber" placeholder="电话号码"></el-input>
          <el-input class="my-info-item" v-model="email" placeholder="Email"></el-input>
          <el-input class="my-info-item" v-model="school" placeholder="学校"></el-input>
          <el-input class="my-info-item" v-model="realname" placeholder="真实姓名"></el-input>
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
        </el-dialog>-->
      </el-row>

      <transition name="fade">
        <el-row v-if="changePassWdVisible" class="change">
          <el-input class="change-pswd-input" v-model="passwd.oldpasswd" placeholder="旧密码"></el-input>
          <el-input class="change-pswd-input" v-model="passwd.newpasswd" placeholder="新密码"></el-input>
          <el-button @click="changePassWdVisible = false">取 消</el-button>
          <el-button type="primary" @>更 新</el-button>
        </el-row>
      </transition>

      <transition name="fade">
        <el-row v-if="changePhoneVisible" class="change">
          <el-input class="change-input" v-model="changePhone.CAPTCHA" placeholder="验证码"></el-input>
          <el-input class="change-input" v-model="changePhone.newnumber" placeholder="新手机号"></el-input>
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
      changeAvatarVisible: false,
      changePassWdVisible: false,
      changePhoneVisible: false,
      imageURL: require('../../assets/icon.png'),

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
      const isJPGPNG = file.type === 'image/jpeg' | file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGPNG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPGPNG && isLt2M
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
  height: 80%;
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

.change {
  margin-top: 2%;
  display: flex;
  align-items: center;
}
.change-input {
  margin: 1%;
}

.my-info {
  margin-bottom: 3%;
}
.my-info-item {
  margin: 1%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
