<template>
  <div>
    <div id="welcome">
      <h2>Welcome to</h2>
    </div>
    <div id="pysat">
      <h3>派塞特</h3>
    </div>
    <div id="navi">
      <el-breadcrumb separator="  ">
        <el-breadcrumb-item :to="{ path: '/index/login'}">Log in</el-breadcrumb-item>
        <br />
        <el-breadcrumb-item :to="{ path: '/index/signup'}">Sign up</el-breadcrumb-item>
        <br />
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge'

export default {
  name: 'Index',
  data () {
    return {}
  }
  // watch: {
  //   $route (to, from) {
  //     console.log(to.path)
  //     if (to.path === '/MyInfo') { console.log('个人信息') }
  //   }
  // },
}
</script>

<style scoped>
#navi {
  margin-bottom: 5%;
  position: absolute;
  left: 65%;
  top: 55%;
  height: 30%;
}
#pysat {
  position: absolute;
  left: 45%;
  top: 12%;
}
#welcome {
  position: absolute;
  left: 30%;
  top: 5%;
}
div {
  margin: 0%;
  overflow: hidden;
}
h1,
h2 {
  font-weight: normal;
  font-size: 100px;
  color: white;
  margin-top: 20%;
  user-select: none;
  transition-duration: 2s;
}
h2:hover {
  transform: scale(1.005);
  transition-duration: 0.5s;
  color: gainsboro;
}
h3 {
  font-weight: normal;
  font-size: 190px;
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
