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
        <img class="avatar" src="../../assets/cx.png" :alt="item.user.name" />
        <p class="name">{{item.user.name}}</p>
        <!-- <img :src="getImageFromURL(item.user.img)"> -->
      </li>
    </ul>
  </div>
</template>

<script>
import ChatMixin from './ChatMixin.js'
export default {
  mixins: [ChatMixin],
  name: 'list',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
#list {
  ul {
    padding: 0%;
  }
  li {
    list-style: none;
    padding: 12px 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }
  li.active {
    /*注意这个是.不是冒号:*/
    background-color: rgba(255, 255, 255, 0.1);
  }
  .avatar {
    border-radius: 2px;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .name {
    display: inline-block;
    margin-left: 15px;
  }
}
</style>
