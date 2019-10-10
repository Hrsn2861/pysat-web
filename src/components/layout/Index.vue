<template>
  <div class="index-page">
    <el-container>
      <el-header>
        <h1>to be implemented...</h1>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer id="foot1">Proudly presented by CTRL group</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  beforeCreate () {
    this.$axios
      .get('/api/check_login/', {
        params: { entrykey: this.$store.getters.getUserToken }
      })
      .then(res => {
        if (res.data.status == 1) {
          this.$router.push('/myinfo')
        }
      })
      .catch(err => {
        this.$message.error(`${err.message}`)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-main {
  background: url("../../assets/background16-9-2.jpg");
  background-repeat: space;
  background-blend-mode: saturation;
  background-size: cover;
  height: 80%;
  margin: 0%;
  padding: 0%;
}
.el-container {
  height: 100%;
  margin-top: 5%;
  margin-bottom: 5%;
}
.el-row {
  height: 40% !important;
}
#navi {
  margin-bottom: 5%;
}
h1 {
  align-self: center;
}
div {
  height: 100%;
  margin: 0%;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0%;
}
.el-header {
  height: 10%;
  display: flex;
  align-self: center;
  user-select: none;
}
#foot1 {
  margin-bottom: 0%;
  padding: 0%;
  width: 100%;
  display: flex;
  /* flex-direction: column-reverse; */

  justify-content: center;
  align-items: center !important;
  /* align-content: center !important; */
  text-align: center !important;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: bolder;
  font-style: oblique;
  color: rgb(40, 40, 40);
  user-select: none;
  height: 3%;
  /* margin-bottom: 0.1%; */
}
</style>
