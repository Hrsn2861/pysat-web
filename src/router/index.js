import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/layout/Index'
import Signup from '@/components/welcomePage/Signup.vue'
import Login from '@/components/welcomePage/Login.vue'
import Navi from '@/components/welcomePage/Navigation.vue'
import MyInfo from '@/components/dashboard/MyInfo.vue'
import Hangout from '@/components/browse/Hangout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {

      path: '/',
      // name: 'Index',
      component: Index,
      children: [
        {
          path: 'signup',
          component: Signup
        },
        {
          path: 'login',
          component: Login
        },
        {
          path: '',
          component: Navi
        },
        {
          path: 'myinfo',
          component: MyInfo
        },
        {
          path: 'hangout',
          component: Hangout
        }
      ]
    }
  ]
})
