<template>
  <div>
    <h2>{{ notice.noticeTitle }}</h2>
    <mavon-editor
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      :ishljs="true"
      :navigation="true"
      v-model="notice.noticeContent"
    ></mavon-editor>
    <article v-html="notice.noticeContentHtml"></article>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      },
      noticeid: ''
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.noticeid = this.$route.params.id;
      this.getNotice();
    }
  },
  methods: {
    getNotice() {
      let params = { id: this.noticeid };
      this.axios
        .get('findnoticebyid/' + this.noticeid)
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

<style></style>
