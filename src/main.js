// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import axios from 'axios'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

import './assets/animation/transform.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(VideoPlayer) // import the styles
Vue.use(VueResource)
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app') // 挂载？这里似乎加没加之前已经挂载了
