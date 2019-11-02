<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-form>
        <el-form-item label="主题">
          <el-select v-model="currentThemeId" placeholder="主题">
            <el-option
              v-for="item in themeList"
              :key="item.id"
              :label="item.theme"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版块">
          <el-select v-model="moduleId" placeholder="版块" @change="GetThemeList">
            <el-option
              v-for="item in moduleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
      <el-upload
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">显示文件</el-button> -->
      </el-upload>
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
  mounted () {
    this.GetThemeList()
  },
  data () {
    return {
      codename: '',
      readme: '',
      themeList: [
        {
          id: 0,
          theme: '共产主义'
        },
        {
          id: 1,
          theme: '大家随意提交的题目'
        }
      ],
      fileList: [],
      currentThemeId: 0,
      moduleId: 0,
      moduleList: [
        {
          value: 0,
          label: '在野'
        },
        {
          value: 1,
          label: '校内'
        }
      ]
    }
  },
  methods: {
    GetThemeList () {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        school: this.moduleId
      }
      console.log(tmpData)

      myPost(
        '/school/theme/list',
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.themeList = res.data.data.themelist
            console.log(this.themeList)
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    handleCommand (command) {
      this.moduleId = command
      console.log(this.moduleId)
    },
    readFile (file) {
      var reader = new FileReader()
      console.log(file.raw)
      var that = this
      reader.addEventListener('load', function (e) {
        console.log('...load succeed...')
        that.$refs.AceContainer.code = reader.result
      })
      reader.addEventListener('error', function (e) {
        console.log('...load failed...')
      })
      reader.addEventListener('loadstart', function (e) {
        console.log('...start...')
      })
      /*
      reader.οnerror = function (e) {
        console.log('...error...')
      }

      reader.onloadstart = function (e) {
        console.log('??????')
      }

      reader.οnlοad = function (e) {
        this.$refs.AceContainer.code = reader.result
        console.log('...end...')
        console.log(reader.result)
      }
      */
      reader.readAsText(file.raw, 'utf-8')
      console.log(reader)
      console.log(reader.result)
    },
    upload () {
      if (this.codename === '' || this.$refs.AceContainer.code === '') {
        this.$message.error('请提交有效的程序和程序名')
      } else {
        console.log(this.$refs.AceContainer.code)
        let uploadData = {
          token: this.$store.getters.getUserToken,
          codename: this.codename,
          readme: this.readme,
          code: this.$refs.AceContainer.code,
          schoolid: this.moduleId,
          theme: this.currentThemeId
        }
        console.log(uploadData)
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
    },
    /*
    submitUpload () {
      console.log('submitUpload')
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log('handleRemove')
      // console.log(file, fileList)
    },
    */
    handlePreview (file) {
      console.log('handlePreview')
      this.readFile(file)
      // console.log(file)
    }
    /*
    handleSuccess (res, file, fileList) {
      console.log('handleSucess')
      this.readFile(file)
      // console.log(fileList)
    },
    // eslint-disable-next-line handle-callback-err
    handleError (err, file, fileList) {
      console.log('handleError')
      // console.log(err)
    },
    handleChange (file, fileList) {
      console.log('handleChange')
      // console.log(file)
    },
    handleProgress (event, file, fileList) {
      console.log('handleProgress')
      // console.log(event)
    },
    beforeUpload (file) {
      console.log('beforeUpload')
      // console.log(file)
    },
    beforeRemove (file, fileList) {
      console.log('beforeRemove')
      // console.log(file)
    }
    */
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
