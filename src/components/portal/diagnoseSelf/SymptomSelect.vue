<template>
  <div v-if="type === 2 || type === 3" class="result-container">
    <div
      id="echartshow"
      style=" height: 260px; width: 520px; margin-left:20%"
    ></div>
    <el-button
      style="margin-left:40%"
      type="text"
      @click="showdetail = !showdetail"
      >···展示详细信息</el-button
    >
    <div v-show="showdetail">
      <h2>{{ selectsymptom }}</h2>
      <p>
        “{{ selectsymptom }}”
        常由下列疾病所致。您的症状与之匹配越多，排列越靠前，患有该疾病的可能性越大。
      </p>
      <ul class="causes" v-for="res in sicknesslist" :key="res.id">
        <li>
          <h3 class="expand">
            {{ res.sicknessName }}<i class="iconfont icon-arrow-down"></i>
          </h3>
          <div class="symptom-list">
            <ul>
              <li v-for="sym in res.associateVoList" :key="sym.id">
                <span :class="[sym.used ? 'strongspan' : '']">
                  伴有:{{ sym.associatSymptomName }}</span
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div v-else-if="type === 1" class="multiple-selection-container">
    <h2>{{ selectsymptom }}</h2>
    <p>
      为了能更精确地帮你诊断出引起
      <strong>{{ selectsymptom }}</strong>
      的可能病因，请选择下面一项或多项有关的症状特征：
    </p>
    <el-divider></el-divider>
    <el-checkbox-group
      v-model="multipleChecks"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox
        v-for="associate in associatelist"
        :label="associate.id"
        :key="associate.id"
        >{{ associate.associatSymptomName }}</el-checkbox
      >
    </el-checkbox-group>
  </div>

  <div v-else class="selection-contain">
    <el-radio
      @change="selectchange(item)"
      v-model="selectsymptom"
      v-for="(item, index) in symptomlist"
      :label="item.symptomName"
      :key="index"
      >{{ item.symptomName }}</el-radio
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
      selectsymptom: '',
      selectsymptomid: '',
      selectsymptomsuggest: '',
      multipleChecks: [],
      datalist: [],
      symptomlist: {},
      associatelist: {},
      sicknesslist: {},
      showdetail: false,
      checkAll: false,
      checkedCities: ['上海', '北京'],
      isIndeterminate: true
    };
  },

  mounted() {
    this.getSymptomList();
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //柱形图
      this.$nextTick(() => {
        //因为初始化echarts 的时候，需要指定的容器 id='main'
        this.$echarts
          .init(document.getElementById('echartshow'), 'black')
          .setOption({
            color: [
              '#ffdc60',
              '#ff7070',
              '#73c0de',
              '#5c7bd9',
              '#9fe080',
              '#026DF0'
            ],

            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                name: '疾病',
                type: 'pie',
                radius: ['30%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '14',
                    fontWeight: 'bold',
                    color: '#333333'
                  }
                },
                labelLine: {
                  show: false
                },
                data: this.datalist
              }
            ]
          });
      });
    },
    echartClear() {
      this.$echarts.init(document.getElementById('echartshow')).clear();
    },
    isSelectSymptom() {
      return this.selectsymptomid;
    },
    returnSymptomSuggest() {
      return this.selectsymptomsuggest;
    },
    returnmultipleChecks() {
      return this.multipleChecks;
    },
    getAssociateSymptomById() {
      this.axios
        .get('getAssociateSymptomById/' + this.selectsymptomid)
        .then(resp => {
          console.log(resp.data);
          this.associatelist = resp.data;
        });
    },
    selectchange(data) {
      this.selectsymptomid = data.id;
      this.selectsymptomsuggest = data.symptomSuggest;
    },

    getSymptomList() {
      this.axios.get('getSymptomList').then(resp => {
        console.log(resp.data);
        this.symptomlist = resp.data;
      });
    },
    getSicknessList() {
      this.echartsInit();
      this.axios.post('getSicknessList', this.multipleChecks).then(resp => {
        console.log(resp.data);
        if (resp.data != null) this.sicknesslist = resp.data;
      });
      this.datalist = [];
      for (var i = 0; i < this.sicknesslist.length; i++) {
        let list = {};
        list.name = this.sicknesslist[i].sicknessName;
        list.value = this.sicknesslist[i].countSymptoms;
        this.datalist.push(list);
        console.log(this.datalist);
      }
    },

    handleCheckedCitiesChange(value) {
      this.getSicknessList();
    }
  }
};
</script>

<style scoped lang="scss">
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

.strongspan {
  font-weight: bolder;
  color: rgb(233, 47, 47);
}

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
    width: 140px;
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
  height: 450px;
  overflow: auto;

  h2 {
    font-size: 20px;
  }

  p {
    line-height: 24px;
    margin-top: 8px;
  }

  ul {
    list-style: none;
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
        margin: 0px 0px 10px 10px;
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
    list-style: none;

    display: list-item;
    text-align: -webkit-match-parent;
  }
}
</style>
