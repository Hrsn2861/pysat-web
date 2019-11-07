<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-tabs v-model="moduleName" @tab-click="GetCourseList()">
        <el-tab-pane label="在野" name="public" v-if="permission_public>=1">
          <CourseTable v-bind:displayData="videoList"></CourseTable>
        </el-tab-pane>
        <el-tab-pane label="校内" name="private" v-if="permission_private>=1">
          <CourseTable v-bind:displayData="videoList"></CourseTable>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// import { myGet } from '@/utils/requestFunc.js'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import CourseTable from '@/components/course/CourseTable.vue'
import GetCourseListMixin from '@/utils/functionUtils/getCourseListMixin'
export default {
  components: {
    CourseTable
  },
  mixins: [GetCourseListMixin],
  beforeCreate () {
    checkSession(this, '', '/')
  },
  created () {
    this.permission_public = localStorage.getItem('permission_public')
    this.permission_private = localStorage.getItem('permission_private')
    if (this.permission_public >= 1) {
      this.moduleName = 'public'
    } else if (this.permission_private >= 1) {
      this.moduleName = 'private'
    }
  },
  mounted: function () {
    this.GetCourseList()
  },
  data () {
    return {
      videoList: [
        {
          upload_time: '2016-05-02',
          name: '陈旭老师的奇妙冒险',
          uploader: '陈浩展',
          size: '1JB',
          description: '这是陈旭老师的奇妙冒险，赞！'
        },
        {
          upload_time: '6102-05-02',
          name: 'ZBZY',
          uploader: '顾掀宇',
          size: '1KB',
          description: 'xb, zbzy'
        }
      ],
      moduleName: 'public',
      permission_public: -1,
      permission_private: -1
    }
  },
  methods: {
    GetCourseList () {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        school_id: -1,
        category_id: 0
      }
      console.log(tmpData)
      if (this.moduleName === 'public') {
        tmpData.school_id = 0
      } else {
        tmpData.school_id = localStorage.getItem('school_id')
      }
      console.log(tmpData)
      this.GetCourseListFromMixin(tmpData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
  align-self: center;
  height: 85vh;
  width: 95%;
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
  margin: 2%;
}
.box-card:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}

.main-div {
  height: 100%;
  width: 100%;
  margin: 0%;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0%;
  background: url("../../assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: 100%;
}
</style>
