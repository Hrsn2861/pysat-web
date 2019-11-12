<template>
  <div class="sidebar" @mouseover="$store.state.sidebar.opened = true" @mouseleave="$store.state.sidebar.opened = false">
    <el-menu
      v-if="!isLogged"
      :default-active="activeIndex"
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#272727"
      text-color="#A2A3A6"
      active-text-color="#fff"
    >
      <el-menu-item index="/overview">
        <i class="el-icon-s-grid"></i>
        <span slot="title">概览</span>
      </el-menu-item>

      <!-- <el-menu-item index="/hangout">
        <i class="el-icon-view"></i>
        <span slot="title">隨便逛逛</span>
      </el-menu-item> -->

      <el-submenu index="/personal">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">个人中心</span>
        </template>
        <el-menu-item :index="myinfoindex">个人信息</el-menu-item>
        <el-menu-item index="/personal/myprogram">我的程序</el-menu-item>
        <!-- 就让所有人都能看见学校好了 -->
        <el-menu-item index="/personal/myschool">我的学校</el-menu-item>
      </el-submenu>

      <el-submenu index="/admin" v-if="getPermissionPublic>=2 || getPermissionPrivate>=2">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span slot="title">管理中心</span>
        </template>
        <el-menu-item index="/admin/program">程序管理</el-menu-item> <!-- 程序管理和提交程序共用一个路由是有原因的....-->
        <el-menu-item index="/admin/userlist">用户列表</el-menu-item>
        <el-menu-item index="/admin/schoollist" v-if="getPermissionPublic>=8">学校列表</el-menu-item>
        <el-menu-item index="/admin/applylist" v-if="getPermissionPrivate>=2">加入申请</el-menu-item>
      </el-submenu>

      <el-menu-item index="/theme/submit">
        <i class="el-icon-upload"></i>
        <span slot="title">提交程序</span>
      </el-menu-item>

      <el-submenu index="/star">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span slot="title">星上程序</span>
        </template>
        <el-menu-item index="/star/onstar">星上程序</el-menu-item>
        <el-menu-item index="/star/inqueue">上传队列</el-menu-item>
      </el-submenu>

      <el-submenu index="/course">
        <template slot="title">
          <i class="el-icon-video-play"></i>
          <span slot="title">线上教程</span>
        </template>
        <el-menu-item index="/course/view">查看教程</el-menu-item>
        <el-menu-item index="/course/upload" v-if="getPermissionPublic>=2 || getPermissionPrivate>=2">发布教程</el-menu-item>
      </el-submenu>

      <el-menu-item index="/chat">
        <i class="el-icon-message"></i>
        <span slot="title">消息系统</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  props: {

  },
  created () {

  },

  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'getPermissionPublic',
      'getPermissionPrivate',
      'getSchoolId',
      'getUser'
    ]),
    myinfoindex () {
      return '/personal/myinfo/' + this.getUser
    },
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
  float: left;
  height: auto;
  min-height: 100vh;
  background-color: #272727;

}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* height: 1200px; */
  height: 100vh;
  min-height: 100vh;

  border-right: #272727 solid 2px;
  /* fix side bar white boarder */
  /* 代表了没有展开的边框 */
}

.el-menu-vertical-demo {
  /* height: 1200px; */
  height: 100vh;
  min-height: 100vh;
  /* 代表了展开后的边框 */
  border-right: #272727 solid 2px;
}

.el-menu-item.is-active,
.el-submenu.is-active >>> .el-submenu__title {
  background: #343A41 !important;
}

.el-submenu .el-menu-item {
  padding-left: 60px !important;
  min-width: auto;
}
.el-submenu.is-active .el-menu-item {
  background: #343A41 !important;
}
.el-submenu.is-active .el-menu-item.is-active {
  background: #91939A !important;
  /* 代表被选中的 */
}
.el-submenu .el-menu-item:hover {
  padding-left: 60px !important;
  background: rgb(42, 42, 42) !important;
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
