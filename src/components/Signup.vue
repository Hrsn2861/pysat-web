<template>
  <div id="Signup" style="height:100%;margin :0%">
    <el-container direction="vertical">
      <el-header height="50">
        <h1>You're a few steps from becoming a <strong><em>PYSATer</em></strong>!</h1>
      </el-header>
      <el-container direction="horizontal" id="main-container">
        <el-aside width="30">
          <div style="height: 80%;width : 100%;transition-duration:2s">
            <el-steps direction="vertical" :active="step">
              <el-step title="设定账号"></el-step>
              <el-step title="输入密码" ></el-step>
              <el-step title="再来一遍"  description></el-step>
              <el-step title="输入邮箱"  description></el-step>
            </el-steps>
          </div>
        </el-aside>
        <el-main>
          <el-form :model="registerForm" :rules="registerRule" ref="registerForm">
            <el-form-item prop="userName" v-if="step >= 1">
              <el-input type="userName" v-model="registerForm.userName" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="pwd" v-if="step >= 2">
              <el-input v-model="registerForm.pwd" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="checkPwd" v-if="step >= 3">
              <el-input v-model="registerForm.checkPwd" placeholder="请再次输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="email" v-if="step >= 4">
              <el-input v-model="registerForm.email" placeholder="请输入接收验证码的邮箱"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('registerForm')"
                class="submitBtn"
                v-if="step >= 4"
              >立即注册</el-button>
              <!-- <el-button @click.prevent="prev()">Previous</el-button> -->
              <el-button @click.prevent="next()" v-if="step < 4">下一步</el-button>
            </el-form-item>
          </el-form>

          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/login'}">Have an account already?</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/login'}"></el-breadcrumb-item>
          </el-breadcrumb>
        </el-main>
      </el-container>
      <el-footer>Proudly presented by CTRL group</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    var validateUser = (rule, value, cb) => {
      var pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g
      if (value === '') {
        cb(new Error('请输入用户名'))
      } else if (!pattern.test(value)) {
        cb(new Error('请输入3-10个字母/汉字/数字/下划线'))
      } else {
        cb()
      }
    }
    var validatePwd = (rule, value, cb) => {
      var pattern = /^\S{3,20}$/g
      if (value === '') {
        cb(new Error('请输入密码'))
      } else if (!pattern.test(value)) {
        cb(new Error('请输入3-20个非空白字符'))
      } else {
        if (this.registerForm.checkPwd !== '') {
          this.$refs.registerForm.validateField('checkPwd')
        }
        cb()
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
      registerForm: {
        userName: '',
        pwd: '',
        checkPwd: '',
        email: '',
        captcha: ''
      },
      registerRule: {
        userName: [{ validator: validateUser, trigger: 'blur' }],
        pwd: [{ validator: validatePwd, trigger: 'blur' }],
        checkPwd: [{ validator: validateCheckPwd, trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur,change'
          }
        ]
      }
    }
  },
  computed: {

  },
  methods: {
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
      var pattern = /^\S{3,20}$/g
      var x = this.registerForm.pwd
      if (x === '' || !pattern.test(x)) {
        return false
      } else {
        return true
      }
    },
    checkPwdValidate () {
      if (this.registerForm.pwd !== this.registerForm.checkPwd) { return false }
      return true
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            usr: this.registerForm.userName,
            pwd: this.registerForm.pwd,
            email: this.registerForm.email
          }
          // doRegister(this, data);
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
      }
      if (!this.userValidate()) {
        this.step--
      }
      if (this.step === 2 && this.pwdValidate() && this.userValidate()) {
        this.step++
      }
      if (this.step === 3 && this.checkPwdValidate() && this.userValidate() && this.pwdValidate()) {
        this.step++
      }

      if (this.step < 1) { this.step = 1 }
      if (this.step > 4) { this.step = 4 }
    }
  }
}
</script>

<style scoped>
#steps {
  height: 80%;
}
#main-container {
  width: 60% !important;
  align-self: center;
}
.el-aside {
  overflow: hidden;
}
.el-container {
  height: 100% !important;
}
h1,
h2 {
  font-weight: normal;
  font-size: 50px;
  color: white;
  margin-top: 5%;
  user-select: none;
  transition-duration: 0.5s;
  text-align: center;
}
h1:hover,
h2:hover {
  transform: scale(1.005);
  transition-duration: 0.5s;
  color: gainsboro;
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
</style>
