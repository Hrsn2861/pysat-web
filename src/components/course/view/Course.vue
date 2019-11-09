<template>
  <div class="main-div">
    <el-card class="box-card">
      <el-select v-model="currentSchoolId" placeholder="学校" @change="GetCourseList()">
        <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
      </el-select>
      <CourseTable v-bind:displayData="videoList"></CourseTable>
    </el-card>
  </div>
</template>

<script>
// import { myGet } from '@/utils/requestFunc.js'
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import CourseTable from '@/components/course/view/CourseTable.vue'
import GetCourseListMixin from '@/utils/functionUtils/getCourseListMixin'
import getSchoolAndThemeMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'

export default {
  components: {
    CourseTable
  },
  mixins: [GetCourseListMixin, getSchoolAndThemeMixin],
  beforeCreate () {
    checkSession(this, '', '/')
  },

  mounted: function () {
    if (localStorage['permission_public'] >= 8) {
      this.GetSchoolList()
    }
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
      ]
    }
  },
  methods: {
    GetCourseList () {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        school_id: this.currentSchoolId,
        category_id: 0
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
  background: url("~@/assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
  height: 100%;
}
</style>
