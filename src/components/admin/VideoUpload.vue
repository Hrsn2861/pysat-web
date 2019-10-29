<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-col :span="20">
        <el-input
          type="textarea"
          placeholder="请简单描述一下你的视频教程(ZBZY)"
          v-model="summary"
          maxlength="30"
          show-word-limit>
        </el-input>
      </el-col>
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

export default {
  components: {

  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  data () {
    return {
      codename: '',
      readme: '',
      fileList: [],
      summary: ''
    }
  },
  methods: {
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

      reader.readAsText(file.raw, 'utf-8')
      console.log(reader)
      console.log(reader.result)
    },

    handlePreview (file) {
      console.log('handlePreview')
      let tmpData = {
        token: this.$store.getters.getUserToken,
        videofile: file.raw,
        videoname: file.raw.name,
        summary: this.summary
      }
      console.log(tmpData)
      // 本地测试用
      myPost(
        '/api/file_test',
        file.raw,
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
      // 实际使用
      /*
      myPost(
        '/api/video/upload',
        tmpData,
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
      */
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
