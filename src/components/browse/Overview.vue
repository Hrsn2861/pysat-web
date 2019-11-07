<template>
  <div class="main-div">
    <el-col :span="15">
      <el-row>
        <el-card class="box-card box-card-lefttop">
          <el-table :data="videoList" style="width: 100%" stripe class="video-table" height="300">
            <el-table-column prop="upload_time" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="教程名" width="180"></el-table-column>
            <el-table-column prop="description" label="简介"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-video-play"
                  size="small"
                  @click="PlayVideo(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-row>
      <el-row>
        <center>
          <h1>派塞特{{schoolName}}</h1>
        </center>
      </el-row>
      <el-row>
        <el-card class="box-card">
          <el-carousel
            indicator-position="none"
            style="width:auto;height:20vh;overflow:hidden;margin:0%;padding:0%;"
          >
            <el-carousel-item
              v-for="item in themeList"
              :key="item.id"
              style="height:20vw !important;"
            >
              <h2>{{item.title}}</h2>
              <h5>
                {{item.description}} -----
                <I>DDL: {{item.deadline}}</I>
              </h5>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="9">
      <el-row>
        <el-card class="box-card-right">
          <el-calendar>

          </el-calendar>
        </el-card>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import { checkSession } from '@/utils/sessionUtils/sessionFunc'
import GetCourseListMixin from '@/utils/functionUtils/getCourseListMixin'
import GetThemeAndSchoolListMixin from '@/utils/functionUtils/getThemeAndSchoolListMixin'
export default {
  mixins: [GetCourseListMixin, GetThemeAndSchoolListMixin],
  beforeCreate () {
    checkSession(this, '', '/')
  },
  mounted () {
    this.GetCourseList()
    this.GetThemeList()
  },
  computed: {
    schoolName () {
      return localStorage['school_name']
    }
  },
  methods: {
    GetCourseList () {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        school_id: 0,
        category_id: 0
      }
      console.log(tmpData)
      this.GetCourseListFromMixin(tmpData)
    },
    GetThemeList () {
      let tmpData = {
        token: this.$store.getters.getUserToken,
        school_id: 0
      }
      this.GetThemeListFromMixin(tmpData)
    },
    PlayVideo (index, row) {
      this.$router.push({
        name: 'videoplay',
        params: {
          token: this.$store.getters.getUserToken,
          video_id: row.id
        }
      })
    }
  },
  data () {
    return {
      videoList: [],
      themeList: [
        {
          id: 0,
          theme: '',
          title: ''
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.main-div {
  height: 100%;
  width: 100%;
  margin: 0%;
  background: url("../../assets/background16-9-2.jpg");
  background-size: cover;
  background-repeat: none;
}

.el-row {
  margin: 3%;
}
h1 {
  color: white;
  font-size: 7vh;
  user-select: none;
  margin: 2%;
  transition-duration: 1s;
  &:hover {
  transform: scale(1.02);
  transition-duration: 0.5s;
  }
}
h2 {
  color: white;
  font-size: 5vh;
  user-select: none;
  margin-top: 3%;
  margin-left: 5%;

}
h5 {
  color: white;
  font-size: 2vh;
  user-select: none;
  margin-left: 5%;
  margin-top: 2%;
  margin-bottom: 10%;
}

.box-card:hover,
.box-card-right:hover {
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
}

.box-card {
  border: 0px dashed rgb(40, 40, 40);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}
.el-card__body {
  padding: 0px !important;
}
.box-card-lefttop {
  height: auto;
}
.box-card-right {
  height: auto;

  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out !important;
  transition-duration: 1s;
}

.el-carousel__item:nth-child(3n) {
  background-color: slategrey;
}

.el-carousel__item:nth-child(3n + 1) {
  background-color: teal;
}
.el-carousel__item:nth-child(3n + 2) {
  background-color: steelblue;
}
</style>
