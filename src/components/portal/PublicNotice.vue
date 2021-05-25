<template>
  <div style="height:100%">
    <NavBar :active-index="activeIndex"></NavBar>
    <div style=" height:660px;overflow:auto !important;">
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
  name: 'PublicNotice',
  data() {
    return {
      activeIndex: 'PublicNotice',
      notice: ''
    };
  },
  components: {
    NavBar,
    NoticeTitleList
  },
  mounted() {
    this.axios.get('findnotice').then(resp => {
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

<style scoped>
::-webkit-scrollbar {
  height: 22px !important;
  width: 7px !important;
}

/*定义了滚动条滑块的样式*/
::-webkit-scrollbar-thumb {
  border-style: dashed;
  background-color: rgb(19, 206, 102);
  border-color: #e2242400;
  border-width: 1.5px;
  background-clip: padding-box;
}
</style>
