//用了element组件，自己要加载和引入
<template>
   <div class="all-container">
    <div class="all-container-padding bg" >
     <el-tabs v-model="activeName" @tab-click="handleClick">
     <el-tab-pane label="基本信息" name="first">
      <el-form :model="userlist" :rules="rules" ref="EditorUserForms">
        <el-form-item label="头像" prop="avatar_url" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" action="//shujiaoke.oss-cn-hangzhou.aliyuncs.com" :before-upload="beforeupload" :data="uploadParm" :show-file-list="false" :on-success="handleUpSuccess">
          <img v-if="userlist.avatar_url" :src="userlist.avatar_url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon " style="width:80px;height:80px;"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
         <el-col :span="8"> <el-input v-model="userlist.username" disabled ></el-input></el-col>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
         <el-col :span="8">  <el-input v-model="userlist.phone" placeholder="请输入电话"></el-input></el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
         <el-col :span="8">  <el-input v-model="userlist.email" placeholder="请输入邮箱"></el-input></el-col>
        </el-form-item>
        <el-form-item label="用户角色" prop="full_name" :label-width="formLabelWidth">
         <el-col :span="8">
          <el-input v-model="userlist.full_name" disabled ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="grid-content bg-purple">
       <el-button type="primary" @click="EditorUserClick('userlist')" >保存</el-button>
      </div>
     </el-tab-pane>
     <el-tab-pane label="修改密码" name="second">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
       <el-form-item label="原密码" prop="pass" :label-width="formLabelWidth">
         <el-col :span="8">  <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input></el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass" :label-width="formLabelWidth">
         <el-col :span="8"><el-input v-model="ruleForm.newpass" placeholder="请输入新密码" id="newkey" type="password"></el-input></el-col>
        </el-form-item>
        <el-form-item label="重复新密码" prop="checknewpass" :label-width="formLabelWidth">
         <el-col :span="8">  <el-input v-model="ruleForm.checknewpass" placeholder="请再次输入新密码" id='newkey1' type="password"></el-input></el-col>
        </el-form-item>
        </el-form>
        <div class="grid-content bg-purple">
       <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </div>
     </el-tab-pane>
    </el-tabs>
    </div>
   </div>
</template>
<script>
// 这些不要在意，这些是我们自定义的接口，用的时候就直接拿来了
import {fetchAll, fetchByID, fetchList, postData, putData, deleteByID, deleteAllByID, guid, bytesToSize} from '@/api/dbhelper'
// 这一步很重要，一般我们直接从后台拿过来输出来会是在data里面，但是我发现却在store里面，这里就要用到vuex
import { mapGetters } from 'vuex'
export default {
  methods: {
  // 获取个人用户的信息
    getUser () {
      postData('接口', this.username).then(response => {
        if (response.status === 200) {
          this.userlist = response.data
          this.loading = false
          console.log(this.userlist, 9696)
        } else {
          this.$message({
            message: '获取信息失败,' + response.message,
            type: 'error'
          })
        }
      })
    },
    // tab切换
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 上传参数图片初始化
    upload () {
      var currentTimeStamp = new Date().getTime() / 1000
      if (
        this.uploadParams == null ||
    this.uploadParams.expire + 3 < currentTimeStamp
      ) {
        this.$store
          .dispatch('GetUploadParams')
          .then(req => {
            this.uploadParm = req.data
          })
          .catch(err => {
            this.$message({ message: err.message, type: 'warning' })
          })
      } else {
        this.uploadParm = this.uploadParams
      }
    },
    // 上传之前
    beforeupload (file) {
      this.uploadParm.key = this.uploadParm.dir + guid()
      // console.log(this.uploadParm)
    },
    // 图片上传上传成功
    handleUpSuccess (response, file, fileList) {
      var newfile = {
        name: file.name,
        type: file.raw.type,
        size: bytesToSize(file.size),
        url: this.uploadParm.key
      }
      postData('file', newfile).then(response => {
        if (response.status == 200) {
          this.$message({ message: '修改成功', type: 'success' })
          this.userlist.style_file_id = response.data.id
          this.userlist.avatar_url = this.baseUrl + response.data.url
        } else {
          this.$message({ message: '修改失败', type: 'error' })
        }
      })
      console.log(this.userlist)
    },
    // 修改密码
    submitForm (ruleForm) {
      var obj = {
        username: this.username,
        oldpwd: this.ruleForm.pass,
        newpwd: this.ruleForm.newpass
      }
      console.log(obj)
      postData('接口', obj).then(response => {
        if (response.status == 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '修改失败' + response.message,
            type: 'error'
          })
        }
      })
    },
    // 编辑提交的方法
    EditorUserClick () {
      this.$refs.EditorUserForms.validate(valid => {
        if (valid) {
          console.log(this.userlist)
          putData('接口', this.userlist).then(response => {
            if (response.status == 200) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '修改失败' + response.message,
                type: 'error'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
