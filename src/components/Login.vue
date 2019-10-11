<template>
  <div class="main-div">
    <el-card class="box-card">
          <el-form
            label-position="left"
            :model="formLogin"
            :rules="rules"
            ref="formLogin"
          >
            <!-- $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。 -->
            <el-form-item label="用户名" prop="identity">
              <el-input v-model="formLogin.identity"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formLogin.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
            <el-form-item>
              <router-link to="/index/signup">
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
import { Encrypt } from '@/assets/crypt.js'

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
      formLogin: {
        identity: '',
        password: '',
        show: false
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
          let tmpData = {
            identity: this.formLogin.identity,
            password: Encrypt(this.formLogin.password)
          }
          // 通过验证之后才请求登录接口
          // this.$axios.get(process.env.VUE_APP_BASE_API, this.formLogin)
          // console.log(tmpData)
          this.$axios
            .get('/api/signin/', { params: tmpData })
            .then(res => {
              if (res.data.status === 1) {
                // this.userLogin(res.data);
                // this.$message.success(`${res.data.msg}`)
                // store the random string in localStorage
                // localStorage["token"] = res.data.msg
                // using vuex to store user info
                let vuexdata = {
                  identity: this.formLogin.identity,
                  token: res.data.msg
                }
                this.$store.dispatch('userLogin', vuexdata)
                this.$message({
                  type: 'success',
                  message:
                    '欢迎你,' + this.$store.getters.getUserIdentity + '!',
                  duration: 2000
                })
                // 登录成功 跳转至首页
                // this.$router.push({name:'Home'})
                this.$router.push('/myinfo')
              } else {
                this.$message.error(`${res.data.msg}`)
                return false
              }
            })
            .catch(err => {
              this.$message.error(`${err.message}`, 'ERROR!')
            })
        } else {
          this.$message.error('表单验证失败!')
          return false
        }
      })
    },
    // 表单重置
    resetForm () {
      // console.log('session')
      this.$refs['formLogin'].resetFields()
    }
  },
  beforeCreate () {
    this.$axios
      .get('/api/check_login/', {
        params: { entrykey: this.$store.getters.getUserToken }
      })
      .then(res => {
        if (res.data.status === 1) {
          this.$router.push('/myinfo')
        }
      })
      .catch(err => {
        this.$message.error(`${err.message}`)
      })
  },
  mounted: function () {
    this.$nextTick(
      function () {
        this.show = true
        // I Think it's very odd
      }
    )
  }
}
</script>

<style scoped>
  .main-div{
    height: 100%;
    width: 100%;
    margin: 0%;
    display: flex;
    align-content: center;
    justify-content: center;
  }
  .box-card{
    align-self: center;
    height: auto;
    width:25%;

    border: 0px dashed rgb(40, 40, 40);
    background-color:rgba(255, 255, 255, 0.7);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out !important;
    transition-duration: 1s;
  }
  .box-card:hover{
    box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
  }
</style>
