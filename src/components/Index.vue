<template>
    <div class="index-page">
        <el-container>
            <el-main>
                <el-row class="main-row">
                    <el-col :span="18" :push="6">
                            <h2>Welcome to</h2>
                    </el-col>
                    <el-col :push="5">
                            <h3> PYSAT </h3>
                    </el-col>
                </el-row>
                <el-row class="main-row">
                    <el-col :span="10" :push="13" id="navi">

                        <el-breadcrumb separator="  ">
                            <el-breadcrumb-item :to="{ path: '/login'}">Log in</el-breadcrumb-item>
                            <br />
                            <el-breadcrumb-item :to="{ path: '/signup'}">Sign up</el-breadcrumb-item>
                            <br />
                        </el-breadcrumb>

                    </el-col>
                </el-row>
            </el-main>
            <el-footer height="5%">
                <center>Proudly presented by CTRL group</center>
            </el-footer>
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
  beforeCreate(){
	  this.$axios.get('/api/check_login/', {params:{entrykey:this.$store.getters.getUserToken}})
	    .then(res => {
	      console.dir(res.data)
	      if (res.data.status != 1) {
	        this.$message.error(res.data.msg);
	        //this.user.name = null;
			this.$router.push('/login')
	        return false;
	      }else{
	        this.$message.success(res.data.msg)
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
    .el-container {
        height: 90%;
        margin: 0%;
    }
    .el-main {
        height: 80%;
        margin: 0%;
        padding: 0%;
    }
    .el-row{
        height: 40% !important;
    }
    #navi {
        margin-bottom: 5%;
    }
    div{
        height: 100%;
        margin: 0%;
        display: flex;
        align-items: center;
        overflow: hidden;
    }
    h1,
    h2 {
        font-weight: normal;
        font-size: 100px;
        color: white;
        margin-top: 20%;
        user-select: none;
        transition-duration: 0.5s;
    }
    h2:hover{
        transform:scale(1.005);
        transition-duration: 0.5s;
        color:gainsboro;
    }
    h3{
        font-weight: normal;
        font-size: 170px;
        color: white;
        margin-top: 30%;
        user-select: none;
        transition-duration: 1s;
    }
    h3:hover{
        transform:scale(1.05);
        transition-duration: 2s;

        border: skyblue;
    }
    .el-breadcrumb {
        font-size: 60px;
        user-select: none;
    }
    .el-footer{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: bolder;
        font-style: oblique;
        color:rgb(40, 40, 40);
        user-select: none;
    }
</style>
