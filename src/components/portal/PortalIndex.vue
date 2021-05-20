<template>
  <div>
    <NavBar :active-index="activeIndex"></NavBar>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="title-container">
            通知公告
          </div>

          <el-table
            :data="notice"
            style="width: 100%; height: calc(100% - 50px);overflow:auto;"
          >
            <el-table-column prop="name" label="标题">
              <template slot-scope="scop">
                <router-link
                  @click.native="addnoticetolocal(scop.row.id)"
                  :to="{
                    name: 'publicnoticedetail',
                    params: { id: scop.row.id }
                  }"
                >
                  <el-link :underline="false" type="primary">{{
                    scop.row.noticeTitle
                  }}</el-link>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{
                  scope.row.noticeCreatetime | formatDate
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <div class="block">
            <el-carousel height="650px" ref="carousel" @click.native="linkto">
              <el-carousel-item v-for="no in noticeimg" :key="no.imgUrl">
                <div style="height:100%;">
                  <el-image
                    style="width: 100%; height: 100%;"
                    :src="no.imgUrl"
                    :fit="scale - down"
                  ></el-image>
                  <h5 class="demo">{{ no.noticeTitle }}</h5>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="title-container">
            健康知识
          </div>

          <el-table
            :data="healthknowledge"
            style="width: 100%; height: calc(100% - 50px);overflow:auto;"
          >
            <el-table-column prop="name" label="标题">
              <template slot-scope="scop">
                <router-link
                  @click.native="addnoticetolocal(scop.row.id)"
                  :to="{
                    name: 'healthKnowledgedetail',
                    params: { id: scop.row.id }
                  }"
                >
                  <el-link :underline="false" type="primary">{{
                    scop.row.noticeTitle
                  }}</el-link>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{
                  scope.row.noticeCreatetime | formatDate
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
export default {
  name: 'PortalIndex',
  components: {
    NavBar
  },
  data() {
    return {
      activeIndex: 'PortalIndex',
      activeIndex2: '1',
      noticeimg: {},
      notice: {},
      healthknowledge: {}
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? '0' + MM : MM;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;
      return y + '-' + MM + '-' + d + ' ';
    }
  },
  mounted() {
    this.getNoticeList();
    this.getKnowledgeList();
  },
  methods: {
    addnoticetolocal(id) {
      localStorage.setItem('noticeid', id);
    },

    getNoticeList() {
      this.axios.get('findnotice').then(resp => {
        this.notice = resp.data;
      });
      this.axios.get('getImgUrl').then(resp => {
        this.noticeimg = resp.data;
      });
    },
    getKnowledgeList() {
      this.axios.get('findknowledge').then(resp => {
        console.log(resp);
        this.healthknowledge = resp.data;
      });
    },
    linkto() {
      let activeIndex = this.$refs.carousel.activeIndex;
      this.$router.push({
        name: 'publicnoticedetail',
        params: { id: this.noticeimg[activeIndex].id }
      });
      localStorage.setItem('noticeid', this.noticeimg[activeIndex].id);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    if (this.$route.params && this.$route.params.activeIndex) {
      this.activeIndex = this.$route.params.activeIndex;
    }
  }
};
</script>

<style scoped lang="scss">
.title-container {
  height: 50px;
  line-height: 50px;
}
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #afcef8;
}

.bg-purple {
  background: rgba(255, 255, 255, 0.918);
}

.bg-purple-light {
  background: #f8f9fd;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 300px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.demo {
  top: -10px;
  left: 45%;
  margin: 1em 0 0.6em 0;
  color: white;
  font-family: serif;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);
  position: absolute;
  color: rgb(250, 192, 0);
}
</style>
