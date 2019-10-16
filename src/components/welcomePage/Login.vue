<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-form label-position="left" :model="formLogin" :rules="rules" ref="formLogin">
        <!-- $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。 -->
        <transition name="fade">
          <el-row v-if="!forgetVisible" class="login">
            <el-form-item label="用户名" prop="identity">
              <el-input v-model="formLogin.identity"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formLogin.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
              <el-button @click="resetForm">重置</el-button>
              <el-button type="warning" @click="forgetVisible=!forgetVisible">忘记密码</el-button>
            </el-form-item>
          </el-row>
        </transition>
      </el-form>

      <el-form label-position="left" :model="formForgetpwd" ref="formForgetpwd">
        <transition name="fade">
          <el-row v-if="forgetVisible" class="forget">
            <el-form-item label="手机号" prop="identity">
              <el-input v-model="formForgetpwd.phone" class="forget-input" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="identity">
              <el-input v-model="formForgetpwd.newpwd" class="forget-input" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="identity">
              <el-input v-model="formForgetpwd.CAPTCHA" class="forget-input" placeholder="验证码"></el-input>
            </el-form-item>

            <el-button class="forget-button" type="primary" @click="sendCAPTCHA">发送验证码</el-button>
            <el-button class="forget-button" type="primary" @click="updatePwd">更 新</el-button>
            <el-button @click="forgetVisible = false; resetForm()">取 消</el-button>
            <!-- TODO :发送消息 -->
          </el-row>
        </transition>

        <el-form-item v-if="!forgetVisible">
          <router-link to="/signup">
            <el-button type>
              没有账号，立即注册
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import { Encrypt } from '@/utils/crypt.js'
import { myPost } from '@/utils/request.js'
import { checkSession } from '@/utils/session.js'

export default {
  data () {
    let checkidentity = (rule, value, cb) => {
      // var pattern = /^1[3456789]\d{9}$/;
      var pattern = /.*/
      if (!value) {
        return cb(new Error('账户不能为空！'))
      } else if (!pattern.test(value)) {
        return cb(new Error('请填写真实的手机号！'))
      } else {
        cb() // 将判断传递给后面
      }
    }
    let checkPassword = (rule, value, cb) => {
      var pattern = /^\S{3,20}$/
      if (!value) {
        return cb(new Error('密码不能为空！'))
      } else if (!pattern.test(value)) {
        return cb(new Error('密码长度应在3~20之间！'))
      } else {
        cb()
      }
    }
    return {
      forgetVisible: false,
      formLogin: {
        identity: '',
        password: '',
        show: false
      },
      formForgetpwd: {
        phone: '',
        newpwd: '',
        CAPTCHA: ''
      },
      rules: {
        identity: [{ validator: checkidentity, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }]
      }
    }
  },

  methods: {
    // 向登录接口发起请求
    login () {
      // 表单验证
      this.$refs['formLogin'].validate(valid => {
        if (valid) {
          let tmpdata = {
            username: this.formLogin.identity,
            password: Encrypt(this.formLogin.password),
            token: this.$store.getters.getUserToken
          }
          myPost(
            '/api/user/sign/login',
            tmpdata,
            res => {
              if (res.data.status === 1) {
                this.$message({
                  type: 'success',
                  message: '欢迎你,' + this.formLogin.identity + '!',
                  duration: 2000
                })
                // 登录成功 跳转至首页
                this.$router.push('myinfo')
                // this.$router.go()
              } else {
                // console.log(this.$store.getters.getUserToken)

                this.$message.error(`${res.data.msg}`)
                return false
              }
            },
            err => {
              this.$message.error(`${err.message}`, 'ERROR!')
            }
          )
        }
      })
    },

    sendCAPTCHA () {
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        phone: this.formForgetpwd.phone
      }
      console.log(tmpdata)
      myPost(
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
    },

    updatePwd () {
      let tmpdata = {
        token: this.$store.getters.getUserToken,
        password: Encrypt(this.formForgetpwd.newpwd),
        CAPTCHA: this.formForgetpwd.CAPTCHA
      }
      // console.log(this.formForgetpwd.newpwd)
      console.log(tmpdata)
      myPost(
        'api/user/sign/passwd',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.forgetVisible = false
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },

    // 表单重置
    resetForm () {
      // console.log('session')
      this.$refs['formLogin'].resetFields()
      this.$refs['formForgetpwd'].resetFields()
    }
  },
  beforeCreate () {
    checkSession(this, 'myinfo', '')
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

  padding: 0%;
  background: url("../../assets/background16-9-2.jpg");
  background-repeat: cover;
  background-size: auto;
  height: 100%;
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
}
/* .forget{
  margin-top: 3%;
}
.forget-input{
  margin:1%;
}
.forget-button{
  margin: 1%;
} */

.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}
</style>
