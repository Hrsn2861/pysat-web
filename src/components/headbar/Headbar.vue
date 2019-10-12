<template>
  <div>
    <el-row class="head-row" type="flex" align="middle" justify="start">
      <el-col :span="1" style="margin-left:20px;margin-right:20px;">
        <img src="../../assets/icon_white.png" height="30" width="30" />
      </el-col>
      <el-col :span="1" style="color:rgb(220, 220, 220)!important">
        <strong>PYSAT</strong>
      </el-col>
      <el-col :span="10" :push="14">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input1"
          style="width:100%;height:80%;"
        ></el-input>
      </el-col>
      <el-col :span="14" :offset="14">
        <!-- <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="logOut()"></el-button>-->

        <!-- <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#272727"
        text-color="#fff"
        active-text-color="#ffd04b"
        >-->
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#272727"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">不知道</el-menu-item>
            <el-menu-item index="2-2">不知道</el-menu-item>
            <el-menu-item index="2-3">不知道</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4">
            <a href="https://www.ele.me" target="_blank">摸我</a>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { logout } from '@/utils/session.js'
export default {
  name: 'headbar',
  data () {
    return {
      input1: ''
    }
  },
  methods: {
    async logOut () {
      await logout(this)
      this.$router.go(0) // 刷新页面
    }
  }
}
</script>

<style scoped>
.head-row{
  width: 100% !important;
  height: 100%;
}
.el-col{
  width: auto;
}
/* div {
  /* height: 100%; */
/* width: 100%;
  margin: 0%;
  display: flex;
  align-items: center;
  overflow: hidden !important;
  padding: 0%; */
/* } */

/* .el-col { */
/* display: flex;
  align-items: center;
  justify-content: center; */
/* } */
</style>
