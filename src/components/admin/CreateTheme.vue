<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-checkbox v-model="ifCreatePublic" :disabled="!ifPrivateAndPublicAdmin">是否查看本校</el-checkbox>
      <el-table :data="themeData" style="width: 100%" height="800">
        <el-table-column prop="id" label="主题ID" width="250"></el-table-column>
        <el-table-column prop="theme" label="主题名称" width="250"></el-table-column>
        <el-table-column prop="description" label="描述" :resizable="true"></el-table-column>
        <el-table-column prop="date" label="发布时间" width="150"></el-table-column>
        <el-table-column prop="deadline" label="截止日期" width="150"></el-table-column>
        <el-table-column prop="count" label="相关主题数" width="120"></el-table-column>
        <!-- TODO : 对于主题的相关操作 -->
        <!-- <el-table-column>
      <template slot-scope="scope">
        <el-button  icon="el-icon-star-off" circle></el-button>
        <el-button   icon="el-icon-download" circle></el-button>
     </template>
        </el-table-column>-->
      </el-table>
      <el-row class="create-theme">
        <el-col :span="4">
          <el-input v-model="formCreateTheme.token" placeholder="请输入主题名称"></el-input>
        </el-col>
        <el-col :span="12">
          <el-input v-model="formCreateTheme.description" placeholder="请输入主题描述"></el-input>
        </el-col>
        <el-col :span="6">
          <el-date-picker v-model="formCreateTheme.deadline" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="1">
          <el-checkbox v-model="ifCreatePublic" :disabled="!ifPrivateAndPublicAdmin">是否公共</el-checkbox>
        </el-col>
        <el-col :span="1">
          <el-button @click="createTheme" style="width:100%;margin:0%;">点击创建</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { myPost } from '@/utils/requestFunc.js'

export default {
  computed: {
    ifPrivateAndPublicAdmin () {
      return localStorage['permission_private'] >= 2 && localStorage['permission_public'] >= 2
    }
  },
  data () {
    return {
      ifCreatePublic: false,
      themeData: [],
      formCreateTheme: {
        token: this.$store.getters.getUsereToken,
        theme: '',
        deadline: '',
        description: ''

      }

    }
  },
  methods: {
    createTheme () {
      myPost(
        '/api/school/theme/create',
        this.formCreateTheme,
        res => {
          if (res.data.status === 1) {
            this.$message({
              type: 'success',
              message: '创建主题成功！',
              duration: 2000
            })
            this.formCreateTheme.theme = ''
            this.formCreateTheme.deadline = ''
            this.formCreateTheme.description = ''
            this.getThemeList()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    getThemeList () {
      let tmpdata = {
        token: this.$store.getters.getUserToken
      }
      myPost(
        '/api/school/theme/list',
        tmpdata,
        res => {
          if (res.data.status === 1) {
            this.themeData = res.data.data.themelist
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  background-size: cover;
  background-repeat: none;
  height: 100%;
}
.box-card {
  align-self: center;
  padding: 0%;
  height: auto;
  width: 80%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}
.create-theme {
  margin-top: 0.5%;
}
</style>
