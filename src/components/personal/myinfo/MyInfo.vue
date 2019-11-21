<template>
  <div class="main-div">
    <el-card class="box-card" v-bind:class="{ 'is-mobile': isMobile}">
      <div class="avatar">
        <el-row type="flex" justify="center" style="height:100px !important">
          <img
            :src="imageURL"
            @click="HandleAvatarClick"
            class="avatar-change"
          />
        </el-row>
        <el-row
          type="flex"
          justify="center"
          style="height:auto !important; user-select: none;"
          v-if="isSelf"
        >点击可以修改頭像！</el-row>
        <transition name="fade">
          <el-row
            type="flex"
            justify="center"
            align="middle"
            style="height:100px !important"
            v-if="state === types.change_avatar"
          >
            <el-upload
              class="avatar-uploader"
              ref="uploader"
              action="/api/file/avatar/set"
              :data="avatarData"
              :show-file-list="false"
              :on-change="handleAvatarSelect"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="handleAvatarError"
              :on-exceed="handleExceed"
              :limit="1"
              :auto-upload="false"
            >
            <el-button slot="trigger" class="upload-btn" type="primitive">选取图片</el-button>
            <el-button type="primary" @click="RealSubmit">点击上传</el-button>
            </el-upload>
          </el-row>
        </transition>
      </div>
      <el-row
        type="flex"
        justify="center"
        v-if="state === types.main_info"
      >
        <el-col class="my-info">
          <center>
            <h1>个人信息</h1>
          </center>
          <el-form ref="myInfo" label-width="70px">
            <el-form-item label="用户名">
              <el-input
                class="my-info-item"
                v-model="formInfo.username"
                placeholder
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input class="my-info-item" v-model="formInfo.phone" placeholder :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input
                class="my-info-item"
                v-model="formInfo.email"
                placeholder="填了也没用"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="学校">
              <el-input
                class="my-info-item"
                v-model="formInfo.school_name"
                placeholder
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input
                class="my-info-item"
                v-model="formInfo.realname"
                placeholder
                :disabled="changeInfoDisable"
              ></el-input>
            </el-form-item>
            <el-form-item label="座右铭" style="margin-bottom:2%;">
              <el-input
                class="my-info-item"
                v-model="formInfo.motto"
                placeholder
                :disabled="changeInfoDisable"
              ></el-input>
            </el-form-item>
            <el-form-item label="权限" style="margin-bottom:2%;">
              <el-select v-model="formInfo.permission_private" placeholder="校内权限">
                <el-option
                  class="my-info-item"
                  v-for="item in permissionPrivateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="!changePermissionEnable || disablePermissionPrivate(item.value)"
                ></el-option>
              </el-select>
              <el-select v-model="formInfo.permission_public" placeholder="公共权限">
                <el-option
                  class="my-info-item"
                  v-for="item in permissionPublicOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="!changePermissionEnable || disablePermissionPublic(item.value)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row
        class="btn-row"
        type="flex"
        justify="center"
        v-if="state === types.main_info"
      >
        <el-col :lg="{span:4}" :md="{span:6}" :sm="{span:7}" :xs="{span:12}">
          <el-button class="main-btn" type="danger" @click="logOut()" v-if="isSelf">登出</el-button>
        </el-col>
        <el-col :lg="{span:4}" :md="{span:6}" :sm="{span:7}" :xs="{span:0}">
          <el-button
          class="main-btn"
            type="primary"
            @click="state = types.change_pwd"
            v-if="isSelf || isGreatAdmin"
          >修改密码</el-button>
        </el-col>
        <el-col :lg="{span:4}" :md="{span:6}" :sm="{span:7}" :xs="{span:0}">
          <el-button
            type="primary"
            class="main-btn"
            @click="state = types.change_passport"
            v-if="isSelf || isGreatAdmin"
          >修改手机或邮箱</el-button>
        </el-col>
        <el-col :lg="{span:4}" :md="{span:6}" :sm="{span:7}" :xs="{span:0}">
          <el-button
            type="primary"
            class="main-btn"
            @click="ChangeInfo()"
            v-if="isSelf || isGreatAdmin"
          >{{updateButtonText}}</el-button>
        </el-col>
        <el-col :lg="{span:4}" :md="{span:6}" :sm="{span:7}" :xs="{span:12}">
          <el-button
            class="main-btn"
            type="warning"
            @click="ChangePermission()"
            v-if="!isSelf"
          >{{changePermissionButtonText}}</el-button>
        </el-col>
      </el-row>

      <transition name="fade">
        <div v-if="state === types.change_pwd" class="change">
          <el-input
            class="change-input"
            v-model="formChangepwd.oldpwd"
            placeholder="旧密码"
            type="password"
          ></el-input>
          <el-input
            class="change-input"
            v-model="formChangepwd.newpwd"
            placeholder="新密码"
            type="password"
          ></el-input>
          <el-button @click="state = types.main_info" class="change-button">取消</el-button>
          <el-button type="primary" @click="ChangePwd" class="change-button">更新</el-button>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="state === types.change_passport" class="change">
          <el-input class="change-input" v-model="formChangepassport.CAPTCHA" placeholder="验证码"></el-input>
          <el-input class="change-input" v-model="formChangepassport.passport" placeholder="新号码或新邮箱"></el-input>
          <el-button id="update-btn" type="primary" @click="SendCAPTCHA" class="change-button">发送验证码</el-button>&nbsp;
          <el-button id="update-btn" type="primary" @click="ChangePassport" class="change-button">更新</el-button>
          <el-button @click="state = types.main_info" class="change-button">取消</el-button>
        </div>
      </transition>
    </el-card>
  </div>
</template>

<script>
import { myGet, myPost } from '@/utils/requestFunc.js'
import { Encrypt } from '@/utils/crypt.js'
import { checkSession, logout } from '@/utils/sessionUtils/sessionFunc'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'
import checkMobileMixin from '@/utils/resolutionUtils/checkMobileHandler'
import permissionOptionsMixin from '@/utils/functionUtils/permissionOptionsMixin'
import permissionComputer from '@/utils/functionUtils/permissionComputer'
import { mapGetters } from 'vuex'

export default {
  inject: ['reload'],
  beforeRouteUpdate (to, from, next) {
    if (from.path.startsWith('/personal/myinfo') &&
   to.path.startsWith('/personal/myinfo')) {
      console.log('beforeRouteUpdate')
      next()
      this.reload()
    } else {
      next()
    }
  },

  mixins: [getSchoolAndThemeMixin, permissionOptionsMixin, permissionComputer, checkMobileMixin],
  props: ['username'], // 呃， props没有用？？？？
  name: 'MyInfo',
  beforeCreate () {
    checkSession(this, '', '/')
  },
  // 这里的beforeCreate需要把mixin里的东西进行重载，在正确的情况下需要返回到主页
  // 这里看起来如果我引入了beforeCreate的Mixin，vue-router会给我报一个warning，显示重复跳转
  // 事实证明这里并没有覆盖掉beforeCreate
  // 混入对象的钩子将在组件自身钩子之前调用。
  // 好
  mounted: function () {
    // 感觉通过url中的username是否为空来进行后续判断有点蛋疼...把username存到localStorage应该会好一点...
    this.imageURL = this.myURL
    if (this.isSelf) {
      this.GetMyInfo('')
    } else {
      this.GetMyInfo(this.$route.params.username)
    }
  },
  data () {
    return {
      state: 0,
      types: {
        main_info: 0,
        change_pwd: 1,
        change_passport: 2,
        change_avatar: 3
      },
      avatarData: {},

      currentInfo: {
        username: 'None',
        phone: 'None',
        email: '填了也没用',
        school_name: 'None',
        realname: 'None',
        motto: 'None',
        permission_public: 0,
        permission_private: 0,
        download: -1
      },

      formInfo: {
        username: 'None',
        phone: 'None',
        email: '填了也没用',
        school_name: 'None',
        realname: 'None',
        motto: 'None',
        permission_public: 0,
        permission_private: 0,
        download: -1
      },

      changeInfoDisable: true, // 这儿之前是changeInfoVisible，感觉有点意义不明
      changePermissionEnable: false,
      updateButtonText: '修改信息',
      changePermissionButtonText: '修改权限',
      changeSchoolButtonText: '选择学校',
      applyDialogVisible: false,

      formApplySchool: {
        reason: '',
        school_name: '',
        school_id: -1
      },

      imageURL: '',

      formChangepwd: {
        oldpwd: '',
        newpwd: ''
      },
      formChangepassport: {
        CAPTCHA: '',
        passport: ''
      },
      patternPhone: /^1[3456789]\d{9}$/,
      // eslint-disable-next-line no-useless-escape
      patternEmail: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
      'getUserToken',
      'getSchoolName',
      'getPermissionPublic',
      'getPermissionPrivate',
      'getSchoolId'
    ]),
    isPhone () {
      return this.patternPhone.test(this.formChangepassport.passport)
    },
    isEmail () {
      return this.patternEmail.test(this.formChangepassport.passport)
    },
    isSelf () {
      return this.$route.params.username === this.$store.getters.getUser
    },
    hasSelectedSchool () {
      return this.getPermissionPrivate > -1
    },

    myURL () {
      return '/api/file/avatar/get' + '?token=' + this.$store.getters.getUserToken + '&username=' + this.$route.params.username
    },
    disablePermissionPrivate () {
      return function (level) {
        if (this.isSelf) { // 如果是自己
          return true
        }
        if (Number(this.formInfo.permission_private) === 4 || Number(this.formInfo.permission_private) === -1) { // 如果对方是校长或者无学校
          return true
        }
        if (Number(level) === 4 || Number(level) === -1) { // 如果要改的权限是变成校长或者无学校
          return true
        }
        if (this.getPermissionPrivate >= 8 || this.getSchoolName === this.formInfo.school_name) { // 如果是超级管理员或者学校相同
          if (this.getPermissionPrivate > this.formInfo.permission_private && this.getPermissionPrivate > Number(level)) {
            return false
          } else {
            return true
          }
        }
        return true
      }
    },
    disablePermissionPublic () {
      return function (level) {
        if (this.isSelf) { // 如果是自己
          return true
        }
        if (this.getPermissionPublic > this.formInfo.permission_public && this.getPermissionPublic > Number(level)) {
          return false
        }
        return true
      }
    }
  },
  methods: {
    async logOut () {
      localStorage.removeItem('identity')
      await logout(this)
      this.$router.go(0) // 刷新页面
    },
    ResetChangepwd () {
      this.formChangepwd.oldpwd = ''
      this.formChangepwd.newpwd = ''
    },
    ResetChangepassport () {
      this.formChangepassport.passport = ''
      this.formChangepassport.CAPTCHA = ''
    },

    GetMyInfo (queryUser) {
      var queryJson = {
        token: this.$store.getters.getUserToken
      }
      if (!this.isSelf) {
        // 如果不是自己，则username不为空
        queryJson['username'] = queryUser
      } // 陈旭的接口定义是不检查‘’，所以前端检查这个
      myGet(
        '/api/user/info/get',
        queryJson,
        res => {
          if (res.data.status === 1) {
            console.log(res.data.data.user)
            this.currentInfo = res.data.data.user
            Object.assign(this.formInfo, this.currentInfo)
          }
        },
        err => {
          this.$message.error(`${err.message}`)
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
    HandleAvatarClick () {
      if (this.isSelf) {
        if (this.state === this.types.main_info) {
          this.state = this.types.change_avatar
        } else {
          this.state = this.types.main_info
        }
      }
    },
    handleAvatarSelect (file, fileList) {
      console.log('select!')
      this.imageURL = URL.createObjectURL(file.raw)
    },
    handleAvatarSuccess (res, file) {
      console.log('Success!')
      this.$message.success('上传成功！')
      this.state = this.types.main_info
      this.imageURL = this.myURL // 这里应该是读取到了新上传的图片？
    },
    beforeAvatarUpload (file) {
      console.log('BeforeUpload')
      const isJPGPNG =
        (file.type === 'image/jpeg') | (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGPNG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (!(isJPGPNG && isLt2M)) {
        return false
      }
      // 在这里绑定data，即上传时除了图片以外的额外参数
      this.avatarData.token = this.$store.getters.getUserToken
      console.log(this.avatarData)
    },
    // eslint-disable-next-line handle-callback-err
    handleAvatarError (err, file, fileList) {
      this.$message.error(`err`)
      this.imageURL = this.myURL // 上传出错则恢复原本的url
    },
    handleExceed (files, fileList) {
      this.$message.error('一次只能选一个头像！')
    },

    RealSubmit () {
      this.$refs.uploader.submit()
    },
    ChangePwd () {
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
            this.state = this.types.main_info
            this.ResetChangepwd()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },

    ChangePassport () {
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        passport: this.formChangepassport.passport,
        CAPTCHA: this.formChangepassport.CAPTCHA
      }

      myPost(
        'api/user/info/setpassport',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            if (this.isPhone) {
              this.currentInfo.phone = this.formChangepassport.passport
              this.formInfo.phone = this.currentInfo.phone
            } else if (this.isEmail) {
              this.currentInfo.email = this.formChangepassport.passport
              this.formInfo.email = this.currentInfo.email
            } else {
              this.$message.error('不可能发生的错！')
              return
            }
            this.$message.success(`${res.data.msg}`)
            this.state = this.types.main_info
            this.ResetChangepassport()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    ChangeInfo () {
      if (this.changeInfoDisable) {
        this.changeInfoDisable = false
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
        myPost(
          '/api/user/info/modify',
          tmpdata,
          res => {
            console.log(tmpdata)
            if (res.data.status === 1) {
              this.$message.success(`${res.data.msg}`)
              this.changeInfoDisable = true
              this.updateButtonText = '修改信息'
              Object.assign(this.currentInfo, this.formInfo)
            } else {
              this.$message.error(`${res.data.msg}`)
              Object.assign(this.formInfo, this.currentInfo)
            }
          },
          err => {
            this.$message.error(`${err.message}`, 'ERROR!')
            Object.assign(this.formInfo, this.currentInfo)
          }
        )
      }
    },
    ChangePermission () {
      if (!this.changePermissionEnable) {
        this.changePermissionEnable = true
        this.changePermissionButtonText = '更新权限！'
      } else {
        let tmpData = {
          token: this.$store.getters.getUserToken,
          username: this.formInfo.username
        }
        let hasChange = false
        if (this.formInfo.permission_private !== this.currentInfo.permission_private) {
          hasChange = true
          tmpData['permission_private'] = this.formInfo.permission_private
        }
        if (this.formInfo.permission_public !== this.currentInfo.permission_public) {
          hasChange = true
          tmpData['permission_public'] = this.formInfo.permission_public
        }
        // 如果什么都没有设置
        if (!hasChange) {
          this.changePermissionButtonText = '修改权限'
          this.changePermissionEnable = false
        } else { // 如果有改变
          console.log(tmpData)
          myPost(
            '/api/user/info/modify',
            tmpData,
            res => {
              if (res.data.status === 1) {
                this.$message.success(`${res.data.msg}`)
                this.changePermissionEnable = false
                this.changePermissionButtonText = '修改权限'
                Object.assign(this.currentInfo, this.formInfo)
              } else {
                this.$message.error(`${res.data.msg}`)
                this.changePermissionEnable = false
                this.changePermissionButtonText = '修改权限'
                Object.assign(this.formInfo, this.currentInfo)
              }
            },
            err => {
              this.$message.error(`${err.message}`, 'ERROR!')
              Object.assign(this.formInfo, this.currentInfo)
            }
          )
        }
      }
    },

    SendCAPTCHA () {
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        passport: this.formChangepassport.passport
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
<style scoped lang="scss">
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
  background: url("~@/assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: 100%;
}
.box-card {
  align-self: center;
  padding: 1%;
  height: auto;
  width: 70%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
  &.is-mobile {
  width : 100%;
  }
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}

.el-form-item {
  margin: 1.2%;
}
.main-btn{
  width: 95%;
}
.upload-btn{
  align-self: center
}
.btn-row{
  margin-left: 5%;
  margin-right: 5%;
}

</style>
