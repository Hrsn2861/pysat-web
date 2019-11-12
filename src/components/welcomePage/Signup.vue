<template>
  <div class="main-div">
    <el-card class="box-card" v-bind:class="{ 'is-mobile': isMobile}">
      <h1 style="user-select:none">注册成为一名派塞特er！</h1>
      <el-progress :percentage="percentage" :stroke-width="20" style="margin-bottom:4%;"></el-progress>
      <el-form :model="registerForm" :rules="registerRule" status-icon ref="registerForm">
        <el-form-item prop="userName" v-if="step >= 1">
          <el-input
            type="userName"
            v-model="registerForm.userName"
            placeholder="账号"
            maxlength="10"
            minlength="3"
          ></el-input>
        </el-form-item>
        <transition name="fade">
          <el-form-item prop="pwd" v-if="step >= 2">
            <el-input v-model="registerForm.pwd" placeholder="密码" type="password"></el-input>
          </el-form-item>
        </transition>
        <transition name="fade">
          <el-form-item prop="checkPwd" v-if="step >= 3" @keyup.enter="next()">
            <el-input v-model="registerForm.checkPwd" placeholder="请再次输入密码" type="password"></el-input>
          </el-form-item>
        </transition>
        <transition name="fade">
          <el-form-item prop="phonenumber" v-if="step >= 4" @keyup.enter="next()">
            <el-input v-model="registerForm.phonenumber" placeholder="请输入注册手机号"></el-input>
          </el-form-item>
        </transition>
        <transition name="fade">
          <el-form-item prop="captcha" v-if="step >= 5" @keyup.enter="next()">
            <el-input v-model="registerForm.captcha" placeholder="请输入注册验证码"></el-input>
          </el-form-item>
        </transition>
        <transition name="fade">
          <el-form-item v-if="step >= 10">
            <el-input type="input" v-model="registerForm.realname" placeholder="您的真实姓名"></el-input>
            <el-input type="email" v-model="registerForm.email" placeholder="请输入你的邮箱"></el-input>
            <el-input type="input" v-model="registerForm.school" placeholder="学校"></el-input>
          </el-form-item>
        </transition>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('registerForm')"
            class="submitBtn"
            v-if="step >= 6"
          >立即注册</el-button>
          <!-- <el-button @click.prevent="prev()">Previous</el-button> -->
          <el-button @click.prevent="next()" v-if="step < 5" >下一步</el-button>
          <el-button @click.prevent="getCaptcha()" v-if="step >= 5 && step < 6">获取验证码</el-button>
        </el-form-item>
      </el-form>

      <el-breadcrumb separator="">
        <el-breadcrumb-item :to="{ path: 'login'}">已有账户？</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/'}">摸我返回主页！</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
import { Encrypt } from '@/utils/crypt.js'
import { myPost } from '@/utils/requestFunc.js'

import autoJumpToInfoMixin from '@/utils/sessionUtils/autoJumpToInfoHandler'
import checkMobileMixin from '@/utils/resolutionUtils/checkMobileHandler'

export default {
  mixins: [autoJumpToInfoMixin, checkMobileMixin],
  name: 'Signup',
  data () {
    var validateUser = (rule, value, cb) => {
      var pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g
      // var pattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,16}$/g
      if (value === '') {
        cb(new Error('请输入用户名'))
      } else if (!pattern.test(value)) {
        cb(new Error('请输入3-10个字母/汉字/数字/下划线'))
      } else {
        cb()
      }
    }
    var validatePwd = (rule, value, cb) => {
      // var pattern = /^\S{3,20}$/g
      var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9~!@&%#_]{6,20}$/g
      if (value === '') {
        cb(new Error('请输入密码'))
      } else if (!pattern.test(value)) {
        cb(new Error('必须包含大写字母、小写字母、数字特殊字符只支持 ~!@&%#_长度在 6-20 位'))
      } else {
        if (this.registerForm.checkPwd !== '') {
          this.$refs.registerForm.validateField('checkPwd')
        }
        cb()
      }
    }
    var checkPhoneNumber = (rule, value, cb) => {
      var pattern = /^1[3456789]\d{9}$/
      if (!value) {
        return cb(new Error('不能为空！'))
      } else if (!pattern.test(value)) {
        return cb(new Error('请填写真实的手机号！'))
      } else {
        cb() // 将判断传递给后面
      }
    }
    var validateCheckPwd = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pwd) {
        cb(new Error('两次输入密码不一致!'))
      } else {
        cb()
      }
    }
    return {
      step: 1,
      percentage: 0,
      registerForm: {
        userName: '',
        pwd: '',
        checkPwd: '',
        captcha: '',
        phonenumber: '',
        email: '',
        realname: '',
        school: ''
      },
      registerRule: {
        userName: [{ validator: validateUser, trigger: 'blur' }],
        pwd: [{ validator: validatePwd, trigger: 'blur' }],
        checkPwd: [{ validator: validateCheckPwd, trigger: 'blur' }],
        phonenumber: [{ validator: checkPhoneNumber, trigger: 'blur' }]
      }
    }
  },
  methods: {
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
    userValidate () {
      var x = this.registerForm.userName
      var pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g
      if (x === '') {
        return false
      } else if (!pattern.test(x)) {
        return false
      } else {
        return true
      }
    },
    pwdValidate () {
      var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9~!@&%#_]{6,20}$/g
      var x = this.registerForm.pwd
      if (x === '' || !pattern.test(x)) {
        return false
      } else {
        return true
      }
    },
    checkPwdValidate () {
      if (this.registerForm.pwd !== this.registerForm.checkPwd) {
        return false
      }
      return true
    },
    phonenumberValidate () {
      var pattern = /^1[3456789]\d{9}$/
      var x = this.registerForm.phonenumber
      if (x === '') {
        return false
      } else if (!pattern.test(x)) {
        return false
      } else {
        return true
      }
    },
    getCaptcha () {
      let data = {
        token: this.$store.getters.getUserToken,
        phone: this.registerForm.phonenumber
      }
      myPost('api/user/sign/verify', data,
        res => {
          this.$message.success(`${res.data.msg}`)
          this.step++
        },
        err => {
          this.$message.error(`${err.message}`)
        }

      )
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            username: this.registerForm.userName,
            password: Encrypt(this.registerForm.pwd),
            phone: this.registerForm.phonenumber,
            token: this.$store.getters.getUserToken,
            CAPTCHA: this.registerForm.captcha
          }

          myPost('api/user/sign/register', data,
            res => {
              if (res.data.status) {
                this.$message({
                  type: 'success',
                  message: '欢迎你,' + this.registerForm.userName + '!',
                  duration: 2000
                })
                this.$router.push('login')
              } else {
                this.$message({
                  type: 'error',
                  message: 'Oops, sign up failed: ' + res.data.msg,
                  duration: 2000
                })
              }
            },
            err => {
              console.log(err)
              this.$message({
                type: 'error',
                message: 'Oops, somethings bad and unknown happened',
                duration: 1000
              })
            }
          )
        } else {
          return false
        }
      })
    },
    prev () {
      this.step--
    },
    next () {
      if (this.step === 1 && this.userValidate()) {
        this.step++
        this.percentage = 25
      }
      if (!this.userValidate()) {
        this.step--
        this.percentage = 0
      }
      if (this.step === 2 && this.pwdValidate() && this.userValidate()) {
        this.step++
        this.percentage = 50
      }
      if (
        this.step === 3 &&
        this.checkPwdValidate() &&
        this.userValidate() &&
        this.pwdValidate()
      ) {
        this.step++
        this.percentage = 90
      }
      if (
        (this.step === 4 || this.step === 5) &&
        this.checkPwdValidate() &&
        this.userValidate() &&
        this.pwdValidate() && this.phonenumberValidate()
      ) {
        this.step++
        this.percentage = 99
      }

      if (this.step < 1) {
        this.step = 1
      }
      if (this.step > 6) {
        this.step = 6
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.main-div {
  height: 100%;
  width: 100%;
  margin: 0%;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0%;
  background: url('~@/assets/background16-9-2.jpg');
  background-size:cover;
  background-repeat :none;
  height: 100%;
}
#steps {
  height: 80%;
}

#main-form {
  margin-top: 5%;
  margin-left: 10%;
}

.el-footer {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: bolder;
  font-style: oblique;
  color: rgb(40, 40, 40);
  user-select: none;
  text-align: center;
}

.box-card {
  align-self: center;
  height: auto;
  width: 25%;

  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
  &.is-mobile {
  width : 80%;
  }

}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}
</style>
