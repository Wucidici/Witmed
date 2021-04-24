<template>
	<div class="diagnose-self-container">
		<NavBar></NavBar>
		<div class="diagnose-self">
			<h1 class="main-title">疾病自我诊断</h1>
			<div class="main-block">
				<div class="diagnosis-side">
					<div class="emergency">
						<h3>就诊建议</h3>
						<p>你若有喘息且伴发呼吸困难，需立即就诊。</p>
					</div>
					<a href="/about-drmed/user-agreement" target="_blank" class="disclaimer">免责声明</a>
				</div>
				<div class="diagnosis-main">
					<el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
						<el-step title="选择一个症状"></el-step>
						<el-step title="选择一个相关症状"></el-step>
						<el-step title="查看可能病因"></el-step>
					</el-steps>

					<div class="middle-container">
						<SymptomSelect :type="active"></SymptomSelect>
					</div>
					<el-button v-if="active !== 3 && active !==2" style="margin-top: 12px;" @click="next">下一步
					</el-button>
					<el-button v-if="active === 2 || active === 1" style="margin-top: 12px;" @click="back">上一步
					</el-button>
					<el-button v-if="active === 2" @click="next">完成</el-button>
					<el-button v-if="active === 3" @click="restart">重新开始</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '../components/NavBar'
import SymptomSelect from './SymptomSelect'

export default {
  name: 'DiagnoseSelf',
  components: {
    NavBar,
    SymptomSelect
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    next () {
      console.log(this.active, 'qian')
      if (this.active++ > 2) this.active = 0
      console.log(this.active)
    },
    back () {
      console.log(this.active, 'qian')
      this.active--
    },
    restart () {
      this.active = 0
    }
  }
}
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
					background-color: #fff3cd;
					border: 1px solid #ffeeba;
					color: #856404;
					line-height: 24px;
					margin: 20px 0 15px;
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
