<template>
  <div v-if="type === 2 || type === 3" class="result-container">
    <h2>头痛</h2>
    <p>
      “头痛”
      常由下列疾病所致。您的症状与之匹配越多，排列越靠前，患有该疾病的可能性越大。
    </p>
    <ul class="causes">
      <li>
        <h3 class="expand">脑瘤<i class="iconfont icon-arrow-down"></i></h3>
        <div class="symptom-list">
          <ul>
            <li class="match">持续性的疲弱或麻木</li>
            <li>何种因素可引发此症状：过敏原</li>
            <li>伴有：思维或意识出现异常</li>
            <li><b>伴有：视力问题</b></li>
            <li>伴有：思维混乱</li>
          </ul>
        </div>
      </li>
    </ul>

    <ul class="causes">
      <li>
        <h3 class="expand">脑膜炎<i class="iconfont icon-arrow-down"></i></h3>
        <div class="symptom-list">
          <ul>
            <li class="match">持续性的疲弱或麻木</li>
            <li>伴有：癫痫发作</li>
            <li>伴有：颈部僵硬</li>
            <li><b>伴有：发烧</b></li>
            <li>伴有：对光或噪音敏感</li>
            <li>伴有：思维混乱</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>

  <div v-else-if="type === 1" class="multiple-selection-container">
    <h2>头痛</h2>
    <p>
      为了能更精确地帮你诊断出引起
      <strong>头痛</strong> 的可能病因，请选择下面一项或多项有关的症状特征：
    </p>
    <el-divider></el-divider>
    <el-checkbox-group
      v-model="multipleChecks"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox v-for="city in selection" :label="city" :key="city">{{
        city
      }}</el-checkbox>
    </el-checkbox-group>
  </div>

  <div v-else class="selection-contain">
    <el-radio
      v-model="radio"
      v-for="(item, index) in selection"
      :label="item"
      :key="index"
      >{{ item }}</el-radio
    >
  </div>
</template>
<script>
export default {
  name: 'SymptomSelect',
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      radio: '1',
      multipleChecks: [],
      selection: [
        '下巴疼痛',
        '流鼻涕或鼻塞',
        '癫痫发作',
        '眼睛剧痛',
        '头晕或失去平衡',
        '视力问题',
        '躁动或烦躁',
        '身体─侧突然麻木',
        '颈部僵硬',
        '发烧',
        '咀嚼时下巴疼痛',
        '头皮发疼',
        '对光或噪音敏感',
        '思维出现异常',
        '思维混乱',
        '恶心或呕吐',
        '手臂臀部僵硬痛'
      ],
      checkAll: false,
      checkedCities: ['上海', '北京'],
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style scoped lang="scss">
.selection-contain {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 300px;
  width: 400px;

  .el-radio {
    text-align: initial;
    width: 200px;
    color: #606266;
    cursor: pointer;
    margin-right: 30px;
    margin-bottom: 25px;
  }
}

.multiple-selection-container {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 300px;
  width: 400px;
  text-align: left;
  width: 100%;

  h2 {
    font-size: 20px;
  }

  p {
    line-height: 24px;
    margin-top: 8px;
  }

  .el-checkbox {
    text-align: initial;
    width: 100px;
    color: #606266;
    cursor: pointer;
    margin-right: 30px;
    margin-bottom: 25px;
    font-weight: lighter;
  }
}
.result-container {
  margin-top: 25px;
  text-align: justify;

  h2 {
    font-size: 20px;
  }

  p {
    line-height: 24px;
    margin-top: 8px;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    text-align: initial;
    padding: 0;
  }

  .causes {
    border: 1px solid #dedede;
    border-radius: 4px;
    margin: 0;
    margin-top: 10px;
    h3 {
      -webkit-touch-callout: none;
      -webkit-text-size-adjust: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-user-select: none;
      cursor: pointer;
      background-color: #f8f8f8;
      font-size: 14px;
      padding: 10px;
      position: relative;
    }

    h3.expand + div {
      max-height: 25em;
    }

    a {
      color: #77a800;
      outline: none;
      text-decoration: none;
    }

    .symptom-list {
      li {
        margin-left: 25px;
      }
    }
  }

  .causes > li:last-child {
    border-bottom: 0;
  }

  .causes > li {
    border-bottom: 1px solid #dedede;
    list-style-type: none;
  }

  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }
}
</style>
