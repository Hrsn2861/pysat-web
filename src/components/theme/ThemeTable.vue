<template>
    <el-table :data="displayData" style="width: 100%" height="800">
        <el-table-column prop="id" label="主题ID" width="80"></el-table-column>
        <el-table-column prop="title" label="主题名称" width="150"></el-table-column>
        <el-table-column prop="description" label="描述" :resizable="true"></el-table-column>
        <el-table-column prop="create_time" label="发布时间" width="150"></el-table-column>
        <el-table-column prop="deadline" label="截止日期" width="150"></el-table-column>
        <el-table-column prop="count" label="相关数目" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="SubmitProgram(scope.$index, scope.row)">提交</el-button>
            <el-button type="text" size="small" @click="JudgeProgram(scope.$index, scope.row)" v-if="isRightAdmin(2)">审核</el-button>
            <el-button type="text" size="small" @click="UploadProgram(scope.$index, scope.row)" v-if="isRightAdmin(4)">上传</el-button>
            <el-button type="text" size="small" @click="ModifyTheme(scope.$index, scope.row)" v-if="isRightAdmin(2)">修改</el-button>
            <el-button type="text" size="small" @click="DeleteTheme(scope.$index, scope.row)" v-if="isRightAdmin(4)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    displayData: {
      type: Array,
      default: null
    },
    currentSchoolId: {
      type: Number,
      default: 0
    }
  },

  mounted: function () {
    // NOTE: GetThemeList在GetSchooollist里面被调用，原因在于同时调用两个函数并不是同步执行的
    // GetSchoolList也可以返回一个Promise什么的
    // 但是这不算事一个好的做法
  },
  data () {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'getPermission_Public',
      'getPermission_Private',
      'getSchool_Id'
    ]),
    isRightAdmin () {
      return function (level) {
        if (this.getPermission_Public >= 8) {
          return true
        }
        if (this.currentSchoolId === 0) {
          return this.getPermission_Public >= level
        } else {
          return this.getPermission_Private >= level
        }
      }
    }
  },

  methods: {
    SubmitProgram (index, row) {
      this.$router.push({ name: 'submit', params: { themeid: row.id } })
    },

    JudgeProgram (index, row) {
      this.$router.push({ name: 'judge', params: { themeid: row.id } })
    },

    UploadProgram (index, row) {
      this.$router.push({ name: 'upload', params: { themeid: row.id } })
    },

    DeleteTheme (index, row) {
      this.$emit('DeleteTheme', index, row)
    },
    ModifyTheme (index, row) {
      this.$emit('ModifyTheme', index, row)
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
  height: 82vh !important;
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}
.create-theme {
  margin-top: 0.5%;
}
</style>
