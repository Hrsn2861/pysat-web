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
import ResizeMixin from '@/utils/resolutionUtils/resizeHandler'
export default {
  name: 'Index',
  mixins: [ResizeMixin],
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
    overflow: hidden
    height :100%;
    color: #333;
    padding: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>
