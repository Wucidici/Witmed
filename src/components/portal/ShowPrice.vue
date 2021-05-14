<template>
  <div>
    <NavBar :active-index="activeIndex"></NavBar>
    <br />
    <h2>{{ notice.noticeTitle }}</h2>
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
  name: 'HospitalIntroduction',
  data() {
    return {
      activeIndex: 'HospitalIntroduction',
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
  components: {
    NavBar
  },
  created() {
    if (this.$route.params && this.$route.params.activeIndex) {
      this.activeIndex = this.$route.params.activeIndex;
    }
  },
  mounted() {
    this.getNotice();
  },
  methods: {
    getNotice() {
      this.axios
        .get('findnoticebyid/' + 1)
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
  height: 600px;
  width: 60%;
  padding-right: 25%;
  margin-left: 15%;
}
</style>
