<template>
  <div>
    <el-row class="head-row" type="flex" align="middle" justify="">
      <el-col :span="1" class="my-logo" >
        <img src="../../assets/icon_white.png" height="30" width="30" />
      </el-col>
      <el-col :span="1" class="my-logo" style="color:rgb(220, 220, 220)!important">
        <strong>PYSAT</strong>
      </el-col>
      <el-col :span="10" :xs="8" :sm="1" :md="1" :lg="1" :xl="1" class="my-search">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input1"
        ></el-input>
      </el-col>
      <el-col :span="14" class="my-menu-bar">
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
          <el-menu-item index="3" @click="logOut">退出登陆</el-menu-item>
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
import 'element-ui/lib/theme-chalk/display.css'
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
.my-menu-bar{
  height: 100% !important;
  margin-right: 2% !important;
  margin-left: 2% !important;

}
.my-logo{
  margin-left: 1% !important;
  margin-right: 1% !important;
}
.my-search{
  margin-right: 2% !important;
  height: 90% !important;
}

.el-col{
  width: auto !important;
  margin: auto;

}
.el-menu{
  height: 100%;
}
.el-menu-item{
  height: 100%;
  display: flex;
  align-items: center;
}
.el-submenu{
  height: 100%;
  display: flex;
  align-items: center;
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
