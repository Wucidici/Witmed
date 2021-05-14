<template>
  <div>
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
        :box-shadow="false"
        v-model="notice.noticeContent"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
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

  mounted() {
    this.getNotice();
  },
  methods: {
    getNotice() {
      this.axios
        .get('findnoticebyid/' + 2)
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
  margin-left: 20%;
}
</style>
