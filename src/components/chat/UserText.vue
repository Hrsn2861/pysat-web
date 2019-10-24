<template>
  <el-row id="userarea">
    <el-col :span="24">
      <textarea
        placeholder="这里输入消息，按 Enter 发送, 按 Ctrl + Enter 刷新一下"
        v-model="content"
        v-on:keyup="addMessage"
      ></textarea>
    </el-col>
    <!-- <el-col :span="1" :offset="1" >
      <el-row><el-button icon="el-icon-position" @click="addMessageFromButton()"></el-button></el-row>
      <el-row><el-button icon="el-icon-loading" @click="addMessageOpposite()"></el-button></el-row>
    </el-col>-->
  </el-row>
</template>

<script>
import ChatMixin from './ChatMixin.js'
export default {
  name: 'uesrtext',
  mixins: [ChatMixin],
  data () {
    return {
      content: ''
    }
  },
  methods: {
    // 我本来想通过按钮发送的，这个名字先留在这里好了
    addMessageFromButton () {
      this.sendMessage(
        this.$store.getters.getUserNameFromSessionId,
        this.content
      )
      // 清空当前的content
      this.content = ''
    },
    addMessage (e) {
      if (e.ctrlKey && e.keyCode === 13) {
        this.changeCurrentSessionId(this.currentSessionId)
      } else if (e.keyCode === 13 && this.content.length !== 0) {
        this.addMessageFromButton()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$button-num: 2;

#userarea {
  position: absolute;
  bottom: 0;
  right: 2px;
  width: 100%;
  height: 20%;
  display: flex;
  // border-top: solid 2px rgb(121, 120, 120);
  .el-col {
    height: 100%;
  }
  textarea {
    height: 80%;
    padding: 1%;

    width: 100%;
    border: 0;
    background-color: rgba($color: rgb(49, 49, 49), $alpha: 0.15);
    // border: 10px solid rgb(39, 46, 54);
    border-top: 15px solid rgb(39, 46, 54);
    border-right: 0px;
    transition-duration: 1s;
    &:hover {
      border-top: 15px solid rgb(32, 118, 216);
      transition-duration: 0.3s;
    }
    &:focus {
      border-top: 15px solid rgb(241, 30, 146);
      transition-duration: 0.3s;
      outline: none;
      color: aliceblue;
      background-color: rgba($color: rgb(49, 49, 49), $alpha: 0.8);
    }
    &:focus::placeholder {
      color: rgb(167, 166, 166);
      transition-duration: 1s;
      font-size: 0.7em;
    }
  }
  .el-row {
    height: 100% / $button-num;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-button {
      margin-right: 25%;
      padding: 2px;
      height: 80%;
      width: 100%;
      border: 1px solid rgb(48, 49, 51);
      &:hover {
        border: 4px solid rgb(32, 118, 216);
        transition-duration: 0.3s;
      }
      &:active {
        border: 4px solid rgb(241, 30, 146);
        transition-duration: 0.3s;
        outline: none;
      }
    }
  }
}
</style>
