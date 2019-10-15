<template>
  <div class="header">
    <div class="logo" :class="{'is-active':isActive}">
      <img src="@/assets/icon_white.png" height="30px" />
      PYSAT控制中心
    </div>
    <div class="navbar">
      <div class="btn" :class="{'is-active':isActive}" @click="handleMenu">
        <el-button type="primary">展开</el-button>
      </div>
      <el-col class="my-search">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input1"
        ></el-input>
      </el-col>
      <el-menu
        class="menu"
        mode="horizontal"
        background-color="#272727"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">处理中心</el-menu-item>

        <el-menu-item index="3">退出登陆</el-menu-item>
        <el-menu-item index="4">
          <a href="https://www.ele.me" target="_blank">摸我</a>
        </el-menu-item>
      </el-menu>

      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{this.$store.getters.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">这不重要</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      menuBtn: 'el-icon-newfont-caidan'
    }
  },
  computed: {
    // 如果左侧菜单打开，则旋转btn180度
    isActive () {
      return !this.$store.getters.sidebar.opened
    }
  },
  methods: {
    handleMenu () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$confirm('是否退出账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="stylus">
.header {
  width: 100%;
  height: 50px;
  display: flex;
  background: #272727;
  .my-search{
    margin-left : 50% !important;
    height: 90% !important;
    width: 20%;

  }
  .logo {
    width: 200px;
    height: 50px;
    background: #272727;
    color: #fff;
    text-indent: 15px;
    font-size: 18px;
    line-height: 50px;
    font-weight: 600;
    transition: 0.4s ease;

    &.is-active {
      width: 64px;
    }

    img {
      padding: 5px 10px 0px 0;
    }
  }
  .el-menu {
    height: 49px;
    margin-left: auto;
    margin-right: 20px;
    border:0px solid red;
    .el-menu-item{
      height: 49px;
      display: flex;
      align-items: center;
    }
    .el-submenu{
      height: 49px;
      boarder 0px;
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
    width: 0;
    overflow: hidden;
  }
}
</style>
