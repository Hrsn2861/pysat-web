import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/layout/Index'

import Signup from '@/components/welcomePage/Signup.vue'
import Login from '@/components/welcomePage/Login.vue'
import Navi from '@/components/welcomePage/Navigation.vue'

import Overview from '@/components/browse/Overview.vue'
import Hangout from '@/components/browse/Hangout.vue'

import MyInfo from '@/components/dashboard/MyInfo.vue'
import MyProgram from '@/components/star/Mine.vue'

import ProgramJudge from '@/components/admin/Judge.vue'
import ProgramUpload from '@/components/admin/Upload'
import ProgramTheme from '@/components/admin/CreateTheme.vue'

import UserList from '@/components/admin/ViewUser.vue'
import SchoolManage from '@/components/admin/SetSchool.vue'
import SchoolApply from '@/components/admin/SchoolApply.vue'

import Submit from '@/components/star/Submit.vue'
import Onstar from '@/components/star/Program.vue'
import Inqueue from '@/components/star/Queue.vue'

import CourseView from '@/components/course/Course.vue'
import CourseUpload from '@/components/admin/VideoUpload.vue'

import Chat from '@/components/chat/ChatLayout.vue'
import VideoPlay from '@/components/course/videoplay.vue'

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

        // 概览
        {
          path: 'overview',
          component: Overview
        },

        // 随便逛逛
        {
          path: 'hangout',
          component: Hangout
        },

        // 个人中心
        {
          // 个人信息
          // 默认的username是___default
          // FIXME: 这里是否还需要改？
          path: 'personal/myinfo/:username',
          name: 'myinfo',
          component: MyInfo
        },
        {
          // 我的程序
          path: 'personal/myprogram',
          component: MyProgram
        },

        // 程序管理
        {
          // 审核程序
          path: 'admin/program/judge',
          component: ProgramJudge
        },
        {
          // 上传程序
          path: 'admin/program/upload',
          component: ProgramUpload
        },
        {
          // 程序主题
          path: 'admin/program/theme',
          component: ProgramTheme
        },

        // 用户管理
        {
          // 用户列表
          path: 'admin/user/list',
          component: UserList
        },
        {
          // 管理学校
          path: 'admin/user/school',
          component: SchoolManage
        },
        {
          // 加入申请
          path: 'admin/user/apply',
          component: SchoolApply
        },

        // 提交程序
        {
          path: 'submit',
          component: Submit
        },

        // 星上程序
        {
          // 星上程序
          path: 'star/onstar',
          component: Onstar
        },
        {
          // 上传队列
          path: 'star/inqueue',
          component: Inqueue
        },

        // 线上教程
        {
          // 查看教程
          path: 'course/view',
          component: CourseView
        },
        {
          // 发布教程
          path: 'course/upload',
          component: CourseUpload
        },

        // 消息系统
        {
          path: 'chat',
          component: Chat
        },

        // 播放视频
        {
          path: 'videoplay',
          name: 'videoplay',
          component: VideoPlay
        }
      ]
    }
  ]
})
