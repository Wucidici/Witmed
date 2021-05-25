<template>
  <div class="diagnose-self-container">
    <NavBar :active-index="activeIndex"></NavBar>
    <div class="diagnose-self">
      <h1 class="main-title">疾病自我诊断</h1>
      <div class="main-block">
        <div class="diagnosis-side">
          <div class="emergency">
            <h3>就诊建议</h3>
            <p>
              {{ suggest }}
            </p>
          </div>
          <el-popover
            placement="bottom"
            title="免责申明"
            width="200"
            trigger="hover"
            content="诊断结果不能替代专业医疗指导、诊断或治疗。当遇到紧急就医情况时请及时去医院。"
          >
            <el-button type="text" slot="reference">免责申明</el-button>
          </el-popover>
        </div>
        <div class="diagnosis-main">
          <el-steps
            :active="active"
            finish-status="success"
            simple
            style="margin-top: 20px"
          >
            <el-step title="选择一个症状"></el-step>
            <el-step title="选择相关症状"></el-step>
            <el-step title="查看诊断结果"></el-step>
          </el-steps>

          <div class="middle-container">
            <SymptomSelect :type="active" ref="mychild"></SymptomSelect>
          </div>

          <el-button
            v-if="active === 2 || active === 1"
            style="margin-top: 30px;margin-left:-55px"
            @click="back"
            >上一步
          </el-button>
          <el-button
            v-if="active !== 3 && active !== 2"
            style="margin-top: 12px;"
            @click="next"
            >下一步
          </el-button>
          <el-button v-if="active === 2" @click="next">完成</el-button>
          <el-button
            style="margin-left:-55px"
            v-if="active === 3"
            @click="restart"
            >重新诊断</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar';
import SymptomSelect from './SymptomSelect';

export default {
  name: 'DiagnoseSelf',
  components: {
    NavBar,
    SymptomSelect
  },
  data() {
    return {
      active: 0,
      activeIndex: 'diagnoseSelf',
      suggest:
        '身体总感觉不舒服，告诉我你的症状，我们根据可靠的数据和智慧的技术为您诊断'
    };
  },
  methods: {
    next() {
      console.log(this.active, 'qian');
      if (this.active == 0)
        if (this.$refs.mychild.isSelectSymptom() == '') {
          alert('请选择一个症状');
          return;
        } else {
          this.$refs.mychild.getAssociateSymptomById();
          this.suggest = this.$refs.mychild.returnSymptomSuggest();
        }

      if (this.active == 1) {
        if (this.$refs.mychild.returnmultipleChecks() == '') {
          alert('请选择一个或多个伴随症状');
          return;
        } else {
          this.$refs.mychild.getSicknessList();
        }
      }
      if (this.active++ > 2) this.active = 0;
      if (this.active == 2 || this.active == 3)
        this.$refs.mychild.echartsInit();
      console.log(this.active);
    },
    back() {
      if (this.active == 2) this.$refs.mychild.echartClear();
      console.log(this.active, 'qian');
      this.active--;
      if (this.active == 0)
        this.suggest =
          '身体总感觉不舒服，告诉我你的症状，我们根据可靠的数据和智慧的技术为您诊断';
    },
    restart() {
      this.active = 0;
    }
  }
};
</script>

<style scoped lang="scss">
.diagnose-self-container {
  height: 100%;

  .diagnose-self {
    height: 95%;

    .main-title {
      text-align: start;
      border-bottom: 1px solid #dedede;
      font-size: 26px;
      padding-bottom: 10px;
    }

    .diagnosis-side {
      float: left;
      font-size: 14px;
      padding-bottom: 20px;
      width: 190px;

      .emergency {
        text-align: inherit;
        background-color: #fdfdfd;
        border: 1px solid #fbff20;
        color: #856404;
        line-height: 24px;
        margin: 20px 0 15px 5px;
        padding: 5px 8px;
      }

      a {
        color: #77a800;
        outline: none;
        text-decoration: none;
      }
    }

    .diagnosis-main {
      margin-left: 300px;
      margin-right: 200px;
    }
  }
}
</style>
