<template>
  <el-row id="userarea">
    <el-col :span="22">
      <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea>
    </el-col>
    <el-col :span="2" :offset="1">
      <el-row>
        <el-button round icon="el-icon-position" @click="addMessageFromButton()"></el-button>
      </el-row>
      <el-row>
        <el-button round icon="el-icon-loading" @click="addMessageOpposite()"></el-button>
      </el-row>
    </el-col>
  </el-row>
  <!-- <div id="usertext">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea>
    <el-button type="primary" icon="el-icon-edit"></el-button>
  </!-->
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
    addMessageFromButton () {
      if (this.content.length) {
        this.$store.dispatch('addMessage', this.content)
        this.content = ''
      }
    },
    addMessageOpposite () {
      if (this.content.length) {
        this.$store.dispatch('addMessageOpposite', this.content)
        this.content = ''
      }
    },
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

$button-num : 2;

#userarea {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 99.5%;
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
    background-color: rgba($color: rgb(255, 255, 255), $alpha: 0.1);
    border: 4px solid rgb(39, 46, 54);
    transition-duration: 1s;
    &:hover {
      border: 4px solid rgb(32, 118, 216);
      transition-duration: 0.3s;
    }
    &:focus {
      border: 4px solid rgb(241, 30, 146);
      transition-duration: 0.3s;
      outline: none;
      background-color: rgba($color: #ffffff, $alpha: 0.7);
    }
    &:focus::placeholder {
      transition-duration: 1s;
      font-size: 0.8em;
    }
  }
  .el-row {
    height: 100% / $button-num;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-button {
      margin-right: 15%;
      padding: 2px;
      height: 80%;
      width: 80%;
      border: 4px solid rgb(48, 49, 51);
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
