<template>
  <div class="main-div">
    <el-card class="box-card">
      <AceContainer ref="AceContainer"></AceContainer>
      <el-col :span="4">
        <el-input
          type="textarea"
          placeholder="给你的程序取个名字"
          v-model="codename"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-col>
      <el-col :span="20">
        <el-input
          type="textarea"
          placeholder="请简单描述一下你的程序(README)"
          v-model="readme"
          maxlength="30"
          show-word-limit
        ></el-input>
      </el-col>

      <center>
        <el-button type="primary" @click="upload()" plain>点击上传！</el-button>
      </center>
    </el-card>
  </div>
</template>

<script>
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import { myPost } from '@/utils/requestFunc.js'

import AceContainer from '@/components/star/AceContainer.vue'

export default {
  components: {
    AceContainer
    // PrismEditor
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  data () {
    return {
      codename: '',
      readme: ''
    }
  },
  methods: {
    upload () {
      if (this.codename === '' || this.$refs.AceContainer.code === '') {
        this.$message.error('请提交有效的程序和程序名')
      } else {
        console.log(this.$refs.AceContainer.code)
        let uploadData = {
          token: this.$store.getters.getUserToken,
          codename: this.codename,
          readme: this.readme,
          code: this.$refs.AceContainer.code
        }
        myPost(
          '/api/program/user/submit',
          uploadData,
          res => {
            console.log(uploadData)
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box-card {
  display: flex;
  justify-content: center;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
  margin: 0%;
  width: 70%;
  height: auto;
}

.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}

.main-div {
  height: 100%;
  width: 100%;
  margin: 0%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 0%;
  background: url("../../assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: 100%;
}

.el-button {
  margin: 1%;
  margin-bottom: 0%;
}
</style>
