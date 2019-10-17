<template>
  <div
    class="main-div"
  >
    <div id="welcome" v-bind:class="{ 'is-mobile': isMobile}">
      <h2>Welcome to</h2>
    </div>
    <div id="pysat" v-bind:class="{ 'is-mobile': isMobile}">
      <h3>派塞特</h3>
    </div>
    <div id="navi">
      <el-breadcrumb separator="  ">
        <el-breadcrumb-item :to="{ path: 'login'}">Log in</el-breadcrumb-item>
        <br />
        <el-breadcrumb-item :to="{ path: 'signup'}">Sign up</el-breadcrumb-item>
        <br />
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import autoJumpToInfoMixin from '@/utils/sessionUtils/autoJumpToInfoHandler.js'

export default {
  name: 'Index',
  data () {
    return {}
  },
  mixins: [autoJumpToInfoMixin]
}
</script>

<style scoped lang="stylus">
.main-div {
  overflow: hidden !important;
  width: 100%;
  margin: 0%;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0%;
  background: url('../../assets/background16-9-2.jpg');
  background-size: cover;
  background-repeat: none;
  height: 100%;
}

#welcome {
  position: relative;
}

#pysat {
  position: relative;
  top: 30%;
  right: 5%;
}

#navi {
  top: 30%;
  position: relative;
}

&.is-mobile {
  display: none;
}

h1, h2 {
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
  font-size: 100px;
  color: whitesmoke;
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
  font-size: 60px;
  user-select: none;
  height: 60%;
}
</style>
