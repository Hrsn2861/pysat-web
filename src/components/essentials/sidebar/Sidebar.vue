<template>
  <div class="sidebar" >
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
      <el-menu-item index="/myinfo/___default" >
        <i class="el-icon-service"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/admin" >
        <i class="el-icon-s-custom"></i>
        <span slot="title">用戶管理</span>
      </el-menu-item>
      <el-menu-item index="/hangout" >
        <i class="el-icon-view"></i>
        <span slot="title">隨便逛逛</span>
      </el-menu-item>
      <el-submenu index="/charts">
        <template slot="title">
          <i class="el-icon-caret-right"></i>
          <span slot="title">这不重要</span>
        </template>
        <el-menu-item index="/charts/diagram">ZBZY</el-menu-item>
        <el-menu-item index="/charts/slider">ZBZY</el-menu-item>
      </el-submenu>
      <el-submenu index="/tables">
        <template slot="title">
          <i class="el-icon-location-outline"></i>
          <span slot="title">暂时没有什么用</span>
        </template>
        <el-menu-item index="/tables/list">我也不会用</el-menu-item>
      </el-submenu>
      <el-menu-item index="/setting" >
        <i class="el-icon-setting"></i>
        <span slot="title">Setting</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
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
  methods: {
  }
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
  .el-submenu.is-active .el-menu-item.is-active  {
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
