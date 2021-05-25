<template>
  <div class="article">
    <div class="article-cover">
      <img :src="NoticeData.imgUrl != '' ? NoticeData.imgUrl : imgs" alt="" />
    </div>
    <div class="info">
      <div
        v-bind:class="[
          NoticeData.noticeType == 2 ? 'article-title-blue' : 'article-title'
        ]"
        @click="jumpToDetail(NoticeData)"
      >
        {{ NoticeData.noticeTitle }}
      </div>
      <div class="article-content">{{ brief }}</div>
      <div class="article-time">
        {{ formatTime }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoticeTitleList',
  colorg: 'article-title',
  colorb: 'article-title-blue',
  props: {
    NoticeData: {
      type: Object
    }
  },
  data() {
    return {
      imgs: require('../../../assets/1.png')
    };
  },
  computed: {
    // 对时间进行格式化
    formatTime: function() {
      if (this.NoticeData) {
        const dt = new Date(this.NoticeData.noticeCreatetime);
        const year = dt.getFullYear();
        const month = dt.getMonth();
        const date = dt.getDate();
        return `${year}年${month}月${date}日`;
      }
      return '';
    },
    // 截取文章内容的前 35 个字，并加上省略号
    brief: function() {
      let content = this.NoticeData.noticeContentHtml.replace(/<[^>]*>|/g, '');

      return content.length > 36 ? content.substr(0, 35) + '...' : content;
    },
    getType: function() {
      return NoticeData.noticeType == 1 ? '公告' : '健康知识';
    }
  },
  methods: {
    jumpToDetail(params) {
      localStorage.setItem('noticeid', params.id);
      localStorage.setItem('noticeType', params.noticeType);
      if (params.noticeType == 1) {
        this.$router.push({
          name: 'publicnoticedetail',
          params: { id: params.id }
        });
      } else {
        this.$router.push({
          name: 'healthKnowledgedetail',
          params: { id: params.id }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  height: 100px;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
  &:last-child {
    border: none;
  }
  .info {
    width: 460px;
  }
  .article-title {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #42b983;
    text-align: justify;
  }
  .article-title-blue {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: rgb(199, 0, 11);
    text-align: justify;
  }
  .article-cover {
    flex: none;
    width: 120px;
    margin-right: 10px;
    > img {
      width: 100%;
    }
  }
  .article-content,
  .article-time {
    font-size: 14px;
  }
  .article-time {
    margin: 10px 0;
    margin-left: -360px;
    color: #c5c5c5;
  }
  .article-content {
    text-align: left;
    margin-top: 10px;
  }
}
</style>
