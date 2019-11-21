<template>
  <div
    class="header"

    element-loading-text="请调至合适的分辨率，你就可以开始PYSAT之旅啦"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
  <!-- v-loading.fullscreen.lock="isMobile" -->
    <div class="logo" :class="{'is-active':isActive}" v-if="isLogged">
      <img src="@/assets/icon_white.png" height="30px" @click="handleMenu" />
      PYSAT
    </div>
    <div class="navbar">
      <!-- <el-col class="my-search">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input1"
        ></el-input>
      </el-col>-->
      <el-menu
        class="menu"
        mode="horizontal"
        background-color="#343A40"
        text-color="#A1A3A6"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click="goIndex()">首页</el-menu-item>
        <el-menu-item index="2" @click="goSignup()" v-if="!isLogged">注册</el-menu-item>
        <el-menu-item index="3" @click="goLogin()" v-if="!isLogged">登陆</el-menu-item>
        <el-menu-item index="4" @click="logOut()" v-if="isLogged">退出登陆</el-menu-item>
      </el-menu>

      <div style="margin-top:5px;" v-if="isLogged">
        <el-badge :value="this.$store.state.chatSystem.msgCount" :max="99" class="item" :hidden="this.$store.state.chatSystem.msgCount === 0">
          <img class="avatar" :src="imageURL" style="height:30px;width:30px;"/>
         </el-badge>
      </div>
      <!-- <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{this.$store.getters.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="logOut()">这不重要</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
    </div>
  </div>
</template>

<script>
import checkMobileMixin from '@/utils/resolutionUtils/checkMobileHandler'
import {logout} from '@/utils/sessionUtils/sessionFunc'
import { mapGetters } from 'vuex'
export default {
  mixins: [checkMobileMixin],
  name: 'Header',

  data () {
    return {
      menuBtn: 'el-icon-newfont-caidan'
    }
  },

  computed: {
    imageURL () {
      return '/api/file/avatar/get' + '?token=' + this.$store.getters.getUserToken + '&username=' + this.$store.getters.getUser
    },
    // 如果左侧菜单打开，则旋转btn180度
    isActive () {
      return !this.$store.getters.sidebar.opened
    },
    isLogged () {
      // 检查是否已经登陆，如果已经登陆，那么user就会被设置好了，根据user返回是否显示登陆注册按钮
      return this.$store.getters.getUser !== null
    }
  },
  watch: {

  },
  methods: {
    async logOut () {
      await logout(this)
      this.$router.go(0) // 刷新页面
    },

    ...mapGetters(['getUser']),

    handleMenu () {
      this.$store.dispatch('ToggleSideBar')
    },
    goLogin () {
      this.$router.push('login')
    },
    goSignup () {
      this.$router.push('signup')
    },
    goIndex () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="stylus">
.header {
  width: 100%;
  height: 50px;
  display: flex;
  background: #343A40;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  .my-search {
    margin-left: 50% !important;
    height: 90% !important;
    width: 20%;
  }

  .logo {
    width: 120px;
    height: 50px;
    background: #343A40;
    color: #fff;
    text-indent: 15px;
    font-size: 18px;
    line-height: 50px;

    transition: 0.4s ease;
    overflow: hidden;

    &.is-active {
      width: 64px;
    }

    img {
      padding: 10px 10px 0px 0;
    }
  }

  .logo.is-active {
    transform: rotateY(180deg);
    transition-duration: 1s;
  }

  .el-menu {

    height: 49px;
    margin-left: auto;
    margin-right: 20px;
    border: 0px solid red;

    .el-menu-item {
      background: #343A40;
      height: 49px;
      display: flex;
      align-items: center;
    }

    .el-submenu {
      height: 49px;
      boarder: 0px;
      display: flex;
      align-items: center;
    }
  }

  .navbar {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    color: #fff;

    .btn {
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      transition: 0.4s ease;

      &.is-active {
        transform: rotateY(180deg);
      }

      span {
        font-size: 20px;
        line-height: 50px;
        transition: 0.5s;
        color: #ffffff;
        font-weight: 400;
      }
    }

    .el-dropdown-link {
      color: #fff;
      font-weight: bold;
      cursor: pointer;
    }
  }
}

@media all and (max-width: 768px) {
  .header .logo.is-active {
    width: 50px;
    overflow: hidden;
  }

}
</style>
