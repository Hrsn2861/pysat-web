<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  background: url("./assets/background16-9-2.jpg");
  background-repeat: space;
  background-blend-mode: saturation;
  background-size: cover;
  margin: 0%;
  height: 100%;
  width: 100%;
}
</style>
