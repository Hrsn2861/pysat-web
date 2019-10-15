<template>
  <div class="main-div">
    <div id="welcome">
      <!-- <h2>Welcome to PYSAT</h2> -->
    </div>
    <!-- <div id="pysat">
      <h3>派塞特</h3>
    </div> -->
    <!-- <div id="navi">
      <el-breadcrumb separator="  ">
        <el-breadcrumb-item :to="{ path: 'login'}">Log in</el-breadcrumb-item>
        <br />
        <el-breadcrumb-item :to="{ path: 'signup'}">Sign up</el-breadcrumb-item>
        <br />
      </el-breadcrumb>
    </div> -->
  </div>
</template>

<script>

import {checkSession} from '@/utils/session.js'

export default {

  name: 'Index',
  data () {
    return {}
  },
  beforeCreate () {
    checkSession(this, 'myinfo', '')
  }
}
</script>

<style scoped>
#welcome {
    display: flex;
    align-items: center;
    justify-content: center;
}

h1,
h2 {
  font-weight: normal;
  font-size: 150px;
  color: white;
  margin-top: 20%;
  user-select: none;
  transition-duration: 2s;
}
h2:hover {
  transform: scale(1.01);
  transition-duration: 0.5s;
  color: gainsboro;
}
h3 {
  font-weight: normal;
  font-size: 50px;
  color: white;
  margin-top: 30%;
  user-select: none;
  transition-duration: 1s;
}
h3:hover {
  transform: scale(1.05);
  transition-duration: 2s;

  border: skyblue;
}
.el-breadcrumb {
  font-size: 70px;
  user-select: none;
  height: 60%;
}
</style>
