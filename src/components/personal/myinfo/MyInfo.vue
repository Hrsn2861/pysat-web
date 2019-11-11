<template>
  <div class="main-div">
    <el-card class="box-card">
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
        >点击可以修改頭像了！呵呵</el-row>
        <transition name="fade">
          <el-row
            type="flex"
            justify="center"
            style="height:100px !important"
            v-if="state === types.changeavatar"
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
            <el-button style="margin-left: 10px;" size="medium" type="primary" @click="RealSubmit">点击上传</el-button>
            </el-upload>
          </el-row>
        </transition>
      </div>
      <el-row
        type="flex"
        justify="center"
        v-if="state === types.maininfo"
      >
        <el-col class="my-info">
          <center>
            <h1>个人信息</h1>
          </center>
          <el-form ref="myInfo" label-width="100px">
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
                v-model="formInfo.school"
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
        type="flex"
        justify="center"
        v-if="state === types.maininfo"
      >
        <el-button type="danger" @click="logOut()" v-if="isSelf">登出</el-button>
        <el-button
          type="primary"
          @click="state = types.changepwd"
          v-if="isSelf || isGreatAdmin"
        >修改密码</el-button>
        <el-button
          type="primary"
          @click="state = types.changephone"
          v-if="isSelf || isGreatAdmin"
        >修改手机号码</el-button>
        <el-button
          type="primary"
          @click="ChangeInfo()"
          v-if="isSelf || isGreatAdmin"
        >{{updateButtonText}}</el-button>
        <el-button
          type="warning"
          @click="ChangePermission()"
          v-if="!isSelf"
        >{{changePermissionButtonText}}</el-button>
        <el-button
          type="warning"
          @click="MyGetSchoolList()"
          v-if="!hasSelectedSchool && isSelf && !isGreatAdmin"
        >{{changeSchoolButtonText}}</el-button>

      </el-row>

      <transition name="fade">
        <div v-if="state === types.changepwd" class="change">
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
          <el-button @click="state = types.maininfo" class="change-button">取消</el-button>
          <el-button type="primary" @click="ChangePwd" class="change-button">更新</el-button>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="state === types.changephone" class="change">
          <el-input class="change-input" v-model="formChangephone.CAPTCHA" placeholder="验证码"></el-input>
          <el-input class="change-input" v-model="formChangephone.phone" placeholder="新号码"></el-input>
          <el-button id="update-btn" type="primary" @click="SendCAPTCHA" class="change-button">发送验证码</el-button>&nbsp;
          <el-button id="update-btn" type="primary" @click="ChangePhone" class="change-button">更新</el-button>
          <el-button @click="state = types.maininfo" class="change-button">取消</el-button>
        </div>
      </transition>

      <transition name="fade">
        <!-- 这里名字叫做changeSchool，只是为了名字呼应，但是实际上只可以修改一次 -->
        <div v-if="state === types.changeschool" class="change-school">
          <el-table :data="schoolList" style="width: 100%">
            <el-table-column prop="id" label="学校ID" width="150"></el-table-column>
            <el-table-column prop="name" label="学校名称" width="150"></el-table-column>
            <el-table-column prop="headmaster" label="校长" width="150"></el-table-column>
            <el-table-column prop="description" label="学校描述" width="300"></el-table-column>
            <el-table-column prop="population" label="当前人数" width="150"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  @click="applyDialogVisible = true;formApplySchool.school_name = scope.row.name;formApplySchool.school_id = scope.row.id"
                  type="text"
                  size="small"
                >申请加入</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="state = types.maininfo" class="change-school-button">取消</el-button>
        </div>
      </transition>

      <el-dialog :title="'加入: ' + formApplySchool.school_name + '（一个同学只有一次选择的权利）'" :visible.sync="applyDialogVisible" width="30%">
        <el-input placeholder="请输入你的验证信息" v-model="formApplySchool.reason" clearable></el-input>

        <span slot="footer" class="dialog-footer">
          <el-button @click="applyDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="ApplySchool">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { myGet, myPost } from '@/utils/requestFunc.js'
import { Encrypt } from '@/utils/crypt.js'
import { checkSession, logout } from '@/utils/sessionUtils/sessionFunc'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'
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

  mixins: [getSchoolAndThemeMixin, permissionOptionsMixin, permissionComputer],
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
        maininfo: 0,
        changepwd: 1,
        changephone: 2,
        changeschool: 3,
        changeavatar: 4
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
      formChangephone: {
        CAPTCHA: '',
        phone: ''
      }

    }
  },
  computed: {
    ...mapGetters([
      'getUser',
      'getUserToken',
      'getSchool_Name',
      'getPermission_Public',
      'getPermission_Private',
      'getSchool_Id'
    ]),
    isSelf () {
      return this.$route.params.username === this.$store.getters.getUser
    },
    hasSelectedSchool () {
      return this.getPermission_Private > -1
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
        if (this.getPermission_Private >= 8 || this.getSchool_Name === this.formInfo.school_name) { // 如果是超级管理员或者学校相同
          if (this.getPermission_Private > this.formInfo.permission_private && this.getPermission_Private > Number(level)) {
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
        if (this.getPermission_Public > this.formInfo.permission_public && this.getPermission_Public > Number(level)) {
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
    ResetChangephone () {
      this.formChangephone.phone = ''
      this.formChangephone.CAPTCHA = ''
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
        if (this.state === this.types.maininfo) {
          this.state = this.types.changeavatar
        } else {
          this.state = this.types.maininfo
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
      this.state = this.types.maininfo
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
            this.state = this.types.maininfo
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

    ChangePhone () {
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
            this.state = this.types.maininfo
            this.ResetChangephone()
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

    ApplySchool () {
      this.applyDialogVisible = false
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        apply_reason: this.formApplySchool.reason,
        apply_school_id: this.formApplySchool.school_id
      }
      myPost(
        '/api/school/user/apply',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            this.$message({
              type: 'success',
              message: '你的申请已经成功递交',
              duration: 2000
            })
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    MyGetSchoolList () {
      this.state = this.types.changeschool
      this.changeSchoolButtonText = '选择学校'
      this.GetSchoolListNoPublic()
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
  background: url("~@/assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
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

.el-form-item {
  margin: 1.5%;
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
.change-button {
  margin: 0%;
}
.change-school{
  margin-top: 3%;
}
.change-school-button{
  width: 100%;
}
.upload-btn{
  align-self: center
}

</style>
