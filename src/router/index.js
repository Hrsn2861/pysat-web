import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/layout/Index'
import Signup from '@/components/welcomePage/Signup.vue'
import Login from '@/components/welcomePage/Login.vue'
import Navi from '@/components/welcomePage/Navigation.vue'
import MyInfo from '@/components/dashboard/MyInfo.vue'
import ViewUser from '@/components/admin/ViewUser.vue'
import Judge from '@/components/admin/Judge.vue'
import Upload from '@/components/admin/Upload'
import SchoolApply from '@/components/admin/SchoolApply.vue'
import CreateTheme from '@/components/admin/CreateTheme.vue'
import VideoUpload from '@/components/admin/VideoUpload.vue'
import Hangout from '@/components/browse/Hangout.vue'
import Overview from '@/components/browse/Overview.vue'
import StarProgram from '@/components/star/Program.vue'
import StarQueue from '@/components/star/Queue.vue'
import StarMine from '@/components/star/Mine.vue'
import StarSubmit from '@/components/star/Submit.vue'
import Chat from '@/components/chat/ChatLayout.vue'

// import { start } from 'repl'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 这段代码是为了避免重复点击相同的位置会报错

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
          // 默认的username是___default
          path: 'myinfo/:username',
          name: 'myinfo',
          component: MyInfo

        },
        {
          path: 'admin/userlist',
          component: ViewUser
        },
        {
          path: 'admin/judge',
          component: Judge
        },
        {
          path: 'admin/upload',
          component: Upload
        },
        {
          path: 'admin/apply',
          component: SchoolApply
        },
        {
          path: 'admin/theme',
          component: CreateTheme
        },

        {
          path: 'admin/video',
          component: VideoUpload
        },
        {
          path: 'hangout',
          component: Hangout
        },
        {
          path: 'overview',
          component: Overview
        },
        {
          path: 'star/program',
          component: StarProgram
        },
        {
          path: 'star/program',
          component: StarProgram
        },
        {
          path: 'star/queue',
          component: StarQueue
        },
        {
          path: 'star/mine',
          component: StarMine
        },
        {
          path: 'star/submit',
          component: StarSubmit
        },
        {
          path: 'chat',
          component: Chat
        }
      ]
    }
  ]
})
