<template>
  <div id="message" v-scroll-bottom="sessions">
    <ul>
      <transition-group
        v-on:appear="customAppear"
        v-on:before-enter="customBeforeEnter"
        v-on:enter="customEnter"
      >
        <li v-for="(entry, index) in currentSession" v-bind:key="index">
          <center><p class="time">
            <!-- <span>{{entry.date | time}}</span> -->
            <span>{{entry.date}}</span>
          </p></center>
          <div class="main" :class="{self:entry.self}">
            <img class="avatar" src="../../assets/cx.png" alt />
            <p class="text">{{entry.content}}</p>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import ChatMixin from './ChatMixin.js'
import Velocity from 'velocity-animate'
export default {
  mixins: [ChatMixin],
  name: 'message',
  data () {
    return {
      img: '../../src/assets/logo.png'
    }
  },
  methods: {
    // Velocity这个动画我已经在最外面的index.html引入了
    customAppear: function (el, done) {
      Velocity(el, { opacity: 0 }, { duration: 0 })
      Velocity(el, { opacity: 1 }, { duration: 400 })
    },
    customBeforeEnter: function (el, done) {},

    customEnter: function (el) {
      // 大概这里指的是新的东西enter之后做的动画
      Velocity(el, { opacity: 0 }, { duration: 0 })
      Velocity(el, { opacity: 1 }, { duration: 400 })
      // Velocity(el, { opacity: 1, fontSize: '1.3em' }, { duration: 300 })
      // Velocity(el, { opacity: 1, fontSize: '1em' }, { duration: 300 })
    }
  },
  filters: {
    time (date) {
      if (date) {
        date = new Date(date)
      }
      return `${date.getMonth()}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
    }
  },
  directives: {
    /* 这个是vue的自定义指令,官方文档有详细说明 */
    // 发送消息后滚动到底部,这里无法使用原作者的方法，也未找到合理的方法解决，暂用setTimeout的方法模拟
    'scroll-bottom' (el) {
      // console.log(el.scrollTop);
      setTimeout(function () {
        el.scrollTop += 9999
      }, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
#message {
  overflow-x: hidden;
  padding: 15px;
  max-height: 68%;
  overflow-y: scroll;
  user-select: none;
  ul {
    list-style-type: none;
    li {
      margin-bottom: 5px;
    }
  }
  .time {
    // text-align: center;
    // margin: 0px 0;
    // margin-top: 3px;
    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 15px;
      color: #fff;
      background-color: #dcdcdc;
      border-radius: 5px;
      margin: 15px;
    }
  }
  .main {
    .avatar {
      float: left;
      margin: 0 15px 0 0;
      border-radius: 6px;
      width: 50px;
      height: 50px;
      // border: 2px solid rgba(0, 255, 255, 0.5)
    }
    .text {
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #fafafa;
      border-radius: 10px;
      line-height: 50px;
    }
  }
  .self {
    text-align: right;
    .avatar {
      float: right;
      margin: 0 0 0 15px;
      border-radius: 6px;
      width: 50px;
      height: 50px;
    }
    .text {
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #85bcf3;
      border-radius: 10px;
      line-height: 50px;
    }
  }
}
</style>
