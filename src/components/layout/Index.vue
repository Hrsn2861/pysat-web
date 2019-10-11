<template>
  <div class="index-page">
    <el-container>
      <el-header>
        <el-col :span="1" style="width:4% !important;">
          <img src="../../assets/logo.png" height="40" width="40" />
        </el-col>
        <el-col :span="1" style="justify-content: center !important;">
          <strong>PYSAT</strong>
        </el-col>
        <el-col :span="5" :push="15">
          <el-input style="border-radius:25%;" placeholder="我暂时不知道这里的东西可以干什么"></el-input>-
          <el-button icon="el-icon-search" circle></el-button>
        </el-col>
        <el-col :push="16" style="justify-content: right!important;">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="logOut()"></el-button>
          <!-- TODO : USE BETTER ICONS -->
        </el-col>
      </el-header>
      <el-main>
        <transition :name="transitionName">
          <router-view class="router"></router-view>
        </transition>
      </el-main>
      <el-footer id="foot1">Proudly presented by CTRL group</el-footer>
    </el-container>
  </div>
</template>

<script>
import {logout} from '@/utils/session.js'
export default {
  name: 'index',
  data () {
    return {
      transitionName: 'slide-right'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-main {
  background: url("../../assets/background16-9-2.jpg");
  background-repeat: space;
  background-blend-mode: saturation;
  background-size: cover;
  height: 95%;
  margin: 0%;
  padding: 0%;
  overflow: hidden !important;
}

.el-container {
  height: 100%;
  margin-top: 0%;
  margin-bottom: 0%;
}
.el-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
#navi {
  margin-bottom: 5%;
}
h1 {
  align-self: center;
}
div {
  height: 100%;
  margin: 0%;
  display: flex;
  align-items: center;
  overflow: hidden !important;
  padding: 0%;
}
.el-header {
  color: rgb(180, 180, 180);
  font-size: 20px;
  background-color: rgb(40, 40, 40);
  margin: 0%;
  padding: 0%;
  width: 100%;
  height: 5% !important;
  display: flex;
  /* justify-content: center; */
  align-self: center;
  user-select: none;
}
#foot1 {
  margin-bottom: 0%;
  padding: 0%;
  width: 100%;
  height: 4% !important;
  display: flex;
  background-color: rgb(40, 40, 40);
  /* flex-direction: column-reverse; */

  justify-content: center;
  align-items: center !important;
  /* align-content: center !important; */
  text-align: center !important;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: bolder;
  font-style: oblique;
  color: rgb(120, 120, 120);
  user-select: none;

}
.slide-right-enter-active,
.slide-right-leave-active{
  /* will-change: transform; */
  transition: all 1s;
  /* will-change:scroll-position; */
  /* will-change: contents; */
  /* will-change: unset; */
  overflow: hidden !important;

}
.slide-right-enter {
  opacity: 0;
  /* transform: scale(0.95); */

  transform: scale(0.8), translate3d(0 , -4%, 0) ;
    overflow: hidden !important;

}
.slide-right-leave-active {
  opacity: 0;
  transform: scale(0.95);
  transform: translate3d( 0, 4%, 0);
    overflow: hidden !important;

}
</style>
]
