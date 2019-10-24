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
        >現在不可以修改頭像！呵呵</el-row>
        <!-- <transition name="fade">
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
              <img class="el-icon-plus avatar-uploader-icon" />

            </el-upload>
          </el-row>
        </transition> -->
      </div>
      <el-row type="flex" justify="center" v-if="!changePwdVisible && !changePhoneVisible ">
        <el-col class="my-info">
          <center><h1>个人信息</h1></center>
          <el-form ref="myInfo" label-width="100px">
            <el-form-item label="用户名">
              <el-input class="my-info-item" v-model="formInfo.username" placeholder="" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input class="my-info-item" v-model="formInfo.phone" placeholder="" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input class="my-info-item" v-model="formInfo.email" placeholder="填了也没用" :disabled="changeInfoVisible"></el-input>
            </el-form-item>
            <el-form-item label="学校">
              <el-input class="my-info-item" v-model="formInfo.school" placeholder="" :disabled="changeInfoVisible"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input class="my-info-item" v-model="formInfo.realname" placeholder="" :disabled="changeInfoVisible"></el-input>
            </el-form-item>
            <el-form-item label="座右铭" style="margin-bottom:2%;">
              <el-input class="my-info-item" v-model="formInfo.motto" placeholder="" :disabled="changeInfoVisible"></el-input>
            </el-form-item>
            <el-form-item label="权限" style="margin-bottom:2%;">
              <el-select v-model="formInfo.permission" placeholder="请选择">
                <el-option class="my-info-item" v-for="item in permissionOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="!changePermissionEnable"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="!changePwdVisible && !changePhoneVisible">
        <el-button type="danger" @click="logOut()" v-if="isSelf">登出</el-button>
        <el-button type="primary" @click="changePwdVisible = true" v-if="isSelf || myPermission >= 8">修改密码</el-button>
        <el-button type="primary" @click="changePhoneVisible = true" v-if="isSelf || myPermission >= 8">修改手机号码</el-button>
        <el-button type="primary" @click="changeInfo()" v-if="isSelf || myPermission >= 8">{{updateButtonText}}</el-button>
        <el-button type="warning" @click="changePermission()" v-if="myPermission >= 4">{{changePermissionButtonText}}</el-button>
      </el-row>

      <transition name="fade">
        <div v-if="changePwdVisible" class="change">

            <el-input class="change-input" v-model="formChangepwd.oldpwd" placeholder="旧密码" type="password"></el-input>
            <el-input class="change-input" v-model="formChangepwd.newpwd" placeholder="新密码" type="password"></el-input>
            <el-button @click="changePwdVisible = false" class="change-button">取消</el-button>
            <el-button type="primary" @click="changePwd" class="change-button">更新</el-button>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="changePhoneVisible" class="change">
          <el-input class="change-input" v-model="formChangephone.CAPTCHA" placeholder="验证码"></el-input>
          <el-input class="change-input" v-model="formChangephone.phone" placeholder="新号码"></el-input>
          <el-button id="update-btn" type="primary" @click="sendCAPTCHA" class="change-button">发送验证码</el-button>&nbsp;
          <el-button id="update-btn" type="primary" @click="changePhone" class="change-button">更新</el-button>
          <el-button @click="changePhoneVisible = false" class="change-button">取消</el-button>
        </div>
      </transition>
    </el-card>
  </div>
  <!-- <el-dialog class="my-dialog" title="提示" :visible.sync="changePassWdVisible" width="50%" :before-close="handleClose"> -->
</template>

<script>
import { myGet, myPost } from '@/utils/requestFunc.js'
import { Encrypt } from '@/utils/crypt.js'

import {checkSession, logout} from '@/utils/sessionUtils/sessionFunc'

export default {
  props: ['username'], // 呃， props没有用？？？？
  name: 'MyInfo',
  beforeCreate () {
    checkSession(this, '', '/')
  },
  // 这里的beforeCreate需要把mixin里的东西进行重载，在正确的情况下需要返回到主页
  // 这里看起来如果我引入了beforeCreate的Mixin，vue-router会给我报一个warning，显示重复跳转
  // 事实证明这里并没有覆盖掉beforeCreate
  // 混入对象的钩子将在组件自身钩子之前调用。
  mounted: function () { // 感觉通过url中的username是否为空来进行后续判断有点蛋疼...把username存到localStorage应该会好一点...
    console.log('params.username: ', this.$route.params.username)
    if (this.$route.params.username === '___default' || this.$route.params.username === localStorage['identity']) {
      this.isSelf = true
      this.getMyInfo('')
    } else {
      this.isSelf = false
      this.getMyInfo(this.$route.params.username)
    }
  },
  data () {
    return {
      currentInfo: {
        username: 'None',
        phone: 'None',
        email: '填了也没用',
        school: 'None',
        realname: 'None',
        motto: 'None',
        permission: 0
      },

      formInfo: {
        username: 'None',
        phone: 'None',
        email: '填了也没用',
        school: 'None',
        realname: 'None',
        motto: 'None',
        permission: 0
      },

      myPermission: '',
      isSelf: false, // 判断是不是自己的信息

      changeAvatarVisible: false,
      changePwdVisible: false,
      changePhoneVisible: false,
      changeInfoVisible: true,
      changePermissionEnable: false,
      updateButtonText: '修改信息',
      changePermissionButtonText: '修改权限',

      imageURL: require('../../assets/cx.png'),

      formChangepwd: {
        oldpwd: '',
        newpwd: ''
      },
      formChangephone: {
        CAPTCHA: '',
        phone: ''
      },
      permissionOptions: [{
        value: 0,
        label: '封禁用户'
      }, {
        value: 1,
        label: '普通用户'
      }, {
        value: 2,
        label: '高级用户'
      }, {
        value: 4,
        label: '管理员'
      }, {
        value: 8,
        label: '新世界的神'
      }]
    }
  },

  methods: {

    async logOut () {
      localStorage.removeItem('identity')
      await logout(this)
      this.$router.go(0) // 刷新页面
    },
    changeAvatar () {},
    setformInfo () {
      this.formInfo.username = this.currentInfo.username
      this.formInfo.phone = this.currentInfo.phone
      this.formInfo.email = this.currentInfo.email
      this.formInfo.school = this.currentInfo.school
      this.formInfo.realname = this.currentInfo.realname
      this.formInfo.motto = this.currentInfo.motto
      this.formInfo.permission = this.currentInfo.permission
    },

    setcurrentInfo () {
      this.currentInfo.username = this.formInfo.username
      this.currentInfo.phone = this.formInfo.phone
      this.currentInfo.email = this.formInfo.email
      this.currentInfo.school = this.formInfo.school
      this.currentInfo.realname = this.formInfo.realname
      this.currentInfo.motto = this.formInfo.motto
      this.currentInfo.permission = this.formInfo.permission
    },
    resetChangepwd () {
      this.formChangepwd.oldpwd = ''
      this.formChangepwd.newpwd = ''
    },
    resetChangephone () {
      this.formChangephone.phone = ''
      this.formChangephone.CAPTCHA = ''
    },

    getMyInfo (queryUser) {
      var queryJson = {
        token: this.$store.getters.getUserToken
      }
      if (!this.isSelf) { // 如果不是自己，则username不为空
        queryJson['username'] = queryUser
      } // 陈旭的接口定义是不检查‘’，所以前端检查这个
      myGet(
        '/api/user/info/get',
        queryJson,
        res => {
          if (res.data.status === 1) {
            this.currentInfo.username = res.data.data.user.username
            this.currentInfo.phone = res.data.data.user.phone
            this.currentInfo.school = res.data.data.user.school
            this.currentInfo.realname = res.data.data.user.realname
            this.currentInfo.motto = res.data.data.user.motto
            this.currentInfo.permission = res.data.data.user.permission
            this.setformInfo()
            this.myPermission = localStorage.getItem('permission')

            console.log('myPERMISSION: ' + this.myPermission)
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
        oldpassword: Encrypt(this.formChangepwd.oldpwd),
        newpassword: Encrypt(this.formChangepwd.newpwd)
      }

      myPost(
        'api/user/sign/modify',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.changePwdVisible = false
            this.resetChangepwd()
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
        phone: this.formChangephone.phone,
        CAPTCHA: this.formChangephone.CAPTCHA
      }

      myPost(
        'api/user/info/setphone',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            this.currentInfo.phone = this.formChangephone.phone
            this.formInfo.phone = this.currentInfo.phone
            this.$message.success(`${res.data.msg}`)
            this.changePhoneVisible = false
            this.resetChangephone()
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
        this.updateButtonText = '更新信息'
      } else {
        let tmpdata = {
          token: this.$store.getters.getUserToken,
          realname: this.formInfo.realname,
          school: this.formInfo.school,
          motto: this.formInfo.motto
        }
        if (!this.isSelf) {
          tmpdata['username'] = this.formInfo.username
        }
        myPost('/api/user/info/modify',
          tmpdata,
          res => {
            console.log(tmpdata)
            if (res.data.status === 1) {
              this.$message.success(`${res.data.msg}`)
              this.changeInfoVisible = true
              this.updateButtonText = '修改信息'
              this.setcurrentInfo()
            } else {
              this.$message.error(`${res.data.msg}`)
              this.setformInfo()
            }
          },
          err => {
            this.$message.error(`${err.message}`, 'ERROR!')
            this.setformInfo()
          }
        )
      }
    },

    changePermission () {
      if (this.isSelf) { // 不能修改自己的权限
        this.$message.error('您不能修改自己的权限！')
        return
      }
      if (!this.changePermissionEnable) {
        if (this.currentInfo.permission >= this.myPermission) { // 如果要改的人的权限原本就不低于自己
          this.$message.error('您的权限太低了！')
          return
        }
        this.changePermissionEnable = true
        this.changePermissionButtonText = '更新权限！'
      } else {
        if (this.formInfo.permission >= this.myPermission) { // 只能改成比自己低的某个权限
          this.$message.error('您只能赋予别人低于自己的权限！')
          this.setformInfo()
          return
        }
        let tmpdata = {
          token: this.$store.getters.getUserToken,
          username: this.formInfo.username,
          permission: this.formInfo.permission
        }
        myPost('/api/user/info/modify',
          tmpdata,
          res => {
            console.log(tmpdata)
            if (res.data.status === 1) {
              this.$message.success(`${res.data.msg}`)
              this.changePermissionEnable = false
              this.changePermissionButtonText = '修改权限'
              this.setcurrentInfo()
            } else {
              this.$message.error(`${res.data.msg}`)
              this.setformInfo()
            }
          },
          err => {
            this.$message.error(`${err.message}`, 'ERROR!')
            this.setformInfo()
          }
        )
      }
    },

    sendCAPTCHA () {
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        // username: this.username,
        phone: this.formChangephone.phone
      }

      myPost(
        // 'api/user/sign/retrieve',
        'api/user/sign/verify',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            console.log('send CAPTCHA succeed')
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
