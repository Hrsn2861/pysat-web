<template>
  <div id="list">
    <ul>
      <li
        v-for="item in sessions"
        v-bind:key="item.id"
        :class="{ active: item.id === currentSessionId }"
        v-on:click="changeCurrentSessionId(item.id)"
      >
        <!--   :class="[item.id === currentSessionId ? 'active':'']" -->
        <!-- <img class="avatar" :src="getImageFromURL(item.user.img)" :alt="item.user.name" /> -->
        <el-badge :value="item.unread" :max="99" class="item" :hidden="item.unread===0">
          <img class="avatar" :src="item.avatar" alt=""/>
        </el-badge>
        <p class="name">{{item.user}}</p>
        <!-- <img :src="getImageFromURL(item.user.img)"> -->
      </li>
    </ul>
  </div>
</template>

<script>
import ChatMixin from './ChatMixin.js'
export default {
  mixins: [ChatMixin],
  mounted: function () {
    this.getChatList()
  },
  name: 'list',
  data () {
    return {}
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
#list {
  $avatar-size: 35px;

  ul {
    padding: 0%;
  }
  li {
    list-style: none;
    padding: 5px 15px;
    border-bottom: 2px solid #292c33;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.02);
      transition-duration: 0.5s;
    }
    &.active {
      /*注意这个是.不是冒号:*/
      background-color: rgba(255, 255, 255, 0.1);
      transition-duration: 0.5s;
    }
    .avatar {
      border-radius: 2px;
      width: $avatar-size;
      height: $avatar-size;
      vertical-align: middle;
    }
    .name {
      display: inline-block;
      margin-left: 15px;
    }
  }
}
</style>
