import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/layout/Index'
import Signup from '@/components/Signup.vue'
import Login from '@/components/Login.vue'
import Navi from '@/components/Navigation.vue'
import MyInfo from '@/components/MyInfo.vue'

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
        }
      ]
    }]

  // {
  //   path: '/index',
  //   name: 'Index',
  //   component: Index
  // },
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: Signup
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // },
})
