<template>
  <div style="height:100%">
    <NavBar :active-index="activeIndex"></NavBar>
    <div style=" height:100%;overflow:auto !important;">
      <notice-title-list
        v-for="no in notice"
        :key="no.id"
        :NoticeData="no"
      ></notice-title-list>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
import NoticeTitleList from './components/NoticeTitleList.vue';
export default {
  name: 'healthknowledge',
  data() {
    return {
      activeIndex: 'healthknowledge',
      notice: ''
    };
  },
  components: {
    NavBar,
    NoticeTitleList
  },
  mounted() {
    this.axios.get('findknowledge').then(resp => {
      console.log(resp);
      this.notice = resp.data;
    });
  },
  created() {
    if (this.$route.params && this.$route.params.activeIndex) {
      this.activeIndex = this.$route.params.activeIndex;
    }
  }
};
</script>

<style scoped></style>
