<template>
  <div id="card">
    <header>
      <!-- 我暂时不知道为什么用v-bind不能绑定图片 -->
      <!-- <img class="avatar" v-bind:src="user.img" v-bind:alt="user.name"> -->
      <img class="avatar" src="../../assets/cx.png" v-bind:alt="user.name" />
      <p class="name">{{user.name}}</p>
    </header>
    <footer>
      <input class="search" type="text" v-model="$store.state.filterKey" placeholder="搜索用户" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'card',
  data () {
    return {
      user: {
        name: 'XianyuGu',
        img: '../../assets/cx.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#card {
  padding: 12px;
  .avatar {
    border-radius: 5px;
    width: 40px;
    height: 40px;
    vertical-align: middle; /*这个是图片和文字居中对齐*/
  }
  .name {
    display: inline-block;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
  }
  .search {
    background: #26292e;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border: 1px solid #3a3a3a;
    border-radius: 4px;
    outline: none; /*鼠标点击后不会出现蓝色边框*/
    color: #fff;
  }
}
</style>
