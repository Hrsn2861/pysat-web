<template>
  <div id="uesrtext">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea>
  </div>
</template>

<script>

export default {
  name: 'uesrtext',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    addMessage (e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.$store.dispatch('addMessage', this.content)
        this.content = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 20%;
  border-top: solid 2px #ddd;
  > textarea {
    padding: 20px;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 15px
  }
}
</style>
