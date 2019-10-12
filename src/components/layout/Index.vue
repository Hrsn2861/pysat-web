<template>
  <div class="index-page">
    <el-container>
      <el-header>
        <!-- import headbar from a component -->
       <headbar></headbar>
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
// import {logout} from '@/utils/session.js'
import headbar from '@/components/headbar/Headbar.vue'
export default {
  name: 'index',
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  methods: {
  },
  components: {
    headbar
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
