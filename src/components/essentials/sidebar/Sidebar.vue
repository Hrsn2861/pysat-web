<template>
  <div class="sidebar">
    <el-menu
      v-if="!isLogged"
      :default-active="activeIndex"
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#272727"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/overview">
        <i class="el-icon-s-grid"></i>
        <span slot="title">概览</span>
      </el-menu-item>

      <el-menu-item index="/hangout">
        <i class="el-icon-view"></i>
        <span slot="title">隨便逛逛</span>
      </el-menu-item>
      <el-submenu index="/star">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span slot="title">星上程序</span>
        </template>
        <el-menu-item index="/star/program">星上程序</el-menu-item>
        <el-menu-item index="/star/queue">上传队列</el-menu-item>
        <el-menu-item index="/star/mine">我的程序</el-menu-item>
        <el-menu-item index="/star/submit" >提交程序</el-menu-item>
      </el-submenu>

      <el-submenu v-if="permission >= 4">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">管理中心</span>
        </template>
        <el-menu-item index="/admin/userlist">用户列表</el-menu-item>
        <el-menu-item index="/admin/judge">待审程序</el-menu-item>
        <el-menu-item index="/admin/upload">待传程序</el-menu-item>
        <el-menu-item index="/admin/apply">加入申请</el-menu-item>
        <el-menu-item index="/admin/theme">管理主题</el-menu-item>
      </el-submenu>
      <el-menu-item index="/myinfo/___default">
        <i class="el-icon-service"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/chat">
        <i class="el-icon-message"></i>
        <span slot="title">消息系统</span>
      </el-menu-item>
      <el-menu-item >
        <i class="el-icon-s-opportunity"></i>
        <span slot="title">线上教程</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  data () {
    return { permission: localStorage.getItem('permission') }
  },
  computed: {
    ...mapGetters(['sidebar']),
    isCollapse () {
      return !this.sidebar.opened
    },
    activeIndex () {
      const thisRoutPath = this.$route.path
      if (this.$route.name === 'details') {
        return '/tables/details'
      }
      return thisRoutPath
    },
    isLogged () {
      // 检查是否已经登陆，如果已经登陆，那么user就会被设置好了，根据user返回是否显示登陆注册按钮
      return this.$store.getters.getUser === null
    }
  },
  methods: {}
}
</script>

<style scoped>
.sidebar {
  height: 100%;
  min-height: 100vh;
  background-color: rgb(84, 92, 100);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
  height: 100%;
}

.el-menu-vertical-demo {
  min-height: 100vh;
  height: 100%;
}

.el-menu-item.is-active,
.el-submenu.is-active >>> .el-submenu__title {
  background: #484e5c !important;
}

.el-submenu .el-menu-item {
  padding-left: 60px !important;
  min-width: auto;
}
.el-submenu.is-active .el-menu-item {
  background: #484e5c !important;
}
.el-submenu.is-active .el-menu-item.is-active {
  background: #3a4046 !important;
}
.el-submenu .el-menu-item:hover {
  padding-left: 60px !important;
  background: rgb(67, 74, 80) !important;
}
.el-menu-item i {
  padding-bottom: 4px;
}

.el-submenu__title i {
  padding-bottom: 4px;
}

@media all and (max-width: 768px) {
  .el-menu--collapse {
    width: 0;
    overflow: hidden;
  }
}
</style>
