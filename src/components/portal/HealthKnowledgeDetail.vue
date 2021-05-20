<template>
  <div>
    <NavBar :active-index="activeIndex"></NavBar>
    <br />
    <h2>{{ notice.noticeTitle }}</h2>
    <div
      style="position: fixed;
    bottom: 100px;
    right: 43px;"
    >
      <el-tooltip
        class="item"
        effect="dark"
        content="返回上一页"
        placement="left-start"
      >
        <el-button
          type="primary"
          icon="el-icon-back"
          @click="goback"
          circle
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="返回顶部"
        placement="left-start"
      >
        <el-backtop target=".bm_view"></el-backtop>
      </el-tooltip>
    </div>

    <div class="article-time">发布日期：{{ formatTime }}</div>
    <br />
    <br />
    <div class="bm_view">
      <mavon-editor
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :ishljs="true"
        v-model="notice.noticeContent"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  data() {
    return {
      activeIndex: 'healthknowledge',
      id: '',
      notice: {
        noticeContent: '',
        noticeContentHtml: '',
        noticeTitle: '',
        noticeCreatetime: ''
      },
      markdownOption: {
        preview: true,
        readmodel: true,
        subfield: false,
        editable: false
      }
    };
  },
  computed: {
    formatTime: function() {
      if (this.notice) {
        const dt = new Date(this.notice.noticeCreatetime);
        const year = dt.getFullYear();
        const month = dt.getMonth();
        const date = dt.getDate();
        return `${year}年${month}月${date}日`;
      }
      return '';
    }
  },
  components: {
    NavBar
  },

  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    } else this.id = localStorage.getItem('noticeid');
    this.getNotice();
  },
  methods: {
    goback() {
      window.history.go(-1);
    },
    getNotice() {
      this.axios
        .get('findnoticebyid/' + this.id)
        .then(resp => {
          console.log(resp.data);
          this.notice = resp.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.bm_view {
  overflow: AUTO;
  height: 550px;
  width: 60%;
  padding-right: 25%;
  margin-left: 15%;
}
.article-time {
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: -20px;
  margin-left: 600px;
  color: #c5c5c5;
}
</style>
