<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-row>
        <!-- change为选中值发生变化时触发 -->
        <el-button @click="NewSchoolDialog()" type="text">创建学校</el-button>
      </el-row>
      <el-table :data="schoolList" style="width: 100%" height="800">
        <el-table-column prop="id" label="学校ID" width="80"></el-table-column>
        <el-table-column prop="name" label="学校名称" width="150"></el-table-column>
        <el-table-column prop="headmaster" label="校长" width="150"></el-table-column>
        <el-table-column prop="description" label="学校描述" :resizable="true"></el-table-column>
        <el-table-column prop="population" label="学校人数" width="150"></el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-if="isHeadmasterOrGreater"
              type="text"
              size="small"
              @click="DeleteTheme(scope.$index, scope.row)"
            >删除</el-button>
            <el-button type="text" size="small" @click="ModifyTheme(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-dialog title='创建学校' :visible.sync="schoolDialogVisible" width="30%">
        <el-input v-model="formCreateSchool.school_name" placeholder="请输入学校名称"></el-input>
        <el-input v-model="formCreateSchool.username" placeholder="请输入校长用户名"></el-input>
        <el-input v-model="formCreateSchool.school_description" placeholder="请输入学校描述"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="schoolDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="SetSchool()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { myPost, myGet } from '@/utils/requestFunc.js'
import permissionComputer from '@/utils/functionUtils/permissionComputer'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
export default {
  mixins: [permissionComputer],
  computed: {
    // 只有网站管理员可以创建学校！
  },
  mounted: function () {
    this.GetSchoolListNoPublic()
  },
  beforeCreate () {
    checkSession(this, '', '/')
  },
  data () {
    return {
      schoolDialogVisible: false,
      schoolList: [
        {
          id: 0,
          name: '清华大学',
          headmaster: '邱勇',
          population: 29999,
          description: '美丽的清华园坐落于燕园隔壁'
        }
      ],
      formCreateSchool: {
        username: '',
        school_name: '',
        school_description: ''
      }
    }
  },
  methods: {
    GetSchoolListNoPublic () {
      let tmpData = {
        token: this.$store.getters.getUserToken
      }
      console.log(tmpData)
      myGet(
        '/api/school/school/get_list',
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.schoolList = res.data.data.school_list
            this.currentSchoolId = this.schoolList[0].id
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        },
        err => {
          this.$message.error(`${err.message}`, 'ERROR!')
        }
      )
    },
    NewSchoolDialog () {
      this.schoolDialogVisible = true
      this.formCreateSchool.school_name = ''
      this.formCreateSchool.username = ''
      this.formCreateSchool.school_description = ''
    },
    SetSchool () {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        username: this.formCreateSchool.username,
        school_name: this.formCreateSchool.school_name,
        school_description: this.formCreateSchool.school_description
      }
      myPost(
        '/api/school/school/create',
        tmpData,
        res => {
          if (res.data.status === 1) {
            this.$message.success(`${res.data.msg}`)
            this.schoolDialogVisible = false
            this.GetSchoolListNoPublic()
          } else {
            console.log(tmpData)
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
  background: url("~@/assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: 100%;
}
.box-card {
  align-self: center;
  padding: 0%;
  height: 100%;
  width: 80%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}
.el-table {
  height: 85vh !important;
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}
</style>
