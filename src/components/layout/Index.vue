<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <Siderbar></Siderbar>
      <el-container>
        <el-main class="my-main-view">
          <!-- <Breadcrumb></Breadcrumb> -->
          <transition :name="transitionName">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
    <Scrolltotop></Scrolltotop>
  </el-container>
</template>

<script>
import Header from '@/components/essentials/header/Header'
import Breadcrumb from '@/components/essentials/breadcrumb/Breadcrumb'
import Footer from '@/components/essentials/footer/Footer'
import Siderbar from '@/components/essentials/sidebar/Sidebar'
import Scrolltotop from '@/components/essentials/scrolltotop/Scrolltotop'
import ResizeMixin from '@/utils/resizeHandler'

export default {
  name: 'Index',
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  components: {
    Header,
    Breadcrumb,
    Footer,
    Siderbar,
    Scrolltotop
  },
  mixins: [ResizeMixin],
  computed: {
  },
  created () {
  },
  methods: {
  }

}
</script>

<style scoped lang="stylus">
  @media (max-width: 920px)
    .el-main
      padding 0

  .el-header, .el-footer {
    color: #333;
    height: 50px !important;
    padding: 0;
  }

  .el-main {
    background: url("../../assets/background16-9-2.jpg");
    background-repeat: space;
    background-size: cover;
    height :100%;
  }

  body > .el-container {
    margin-bottom: 40px;
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
