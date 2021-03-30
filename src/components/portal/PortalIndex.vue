<template>
	<div>
		<NavBar :active-index="activeIndex"></NavBar>
		<el-row>
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<div class="title-container">通知公告</div>
					<el-table
							:data="tableData"
							style="width: 100%; height: calc(100% - 50px)">
						<el-table-column
								prop="date"
								label="日期"
								width="140">
						</el-table-column>
						<el-table-column
								prop="name"
								label="标题">
						</el-table-column>
					</el-table>
				</div>
			</el-col>
			<el-col :span="18">
				<div class="grid-content bg-purple-light">
					<div class="block">
						<span class="demonstration">Click 指示器触发</span>
						<el-carousel trigger="click" height="150px">
							<el-carousel-item v-for="item in 4" :key="item">
								<h3 class="small">{{ item }}</h3>
							</el-carousel-item>
						</el-carousel>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<div class="grid-content bg-purple">
				</div>
			</el-col>
			<el-col :span="18">
				<div class="grid-content bg-purple-light"></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'PortalIndex',
  components: {
    NavBar
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created () {
    if (this.$route.params && this.$route.params.activeIndex) {
      this.activeIndex = this.$route.params.activeIndex
    }
  }
}
</script>

<style scoped lang="scss">
	.title-container {
		height: 50px;
		line-height: 50px;
	}
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
		height: 300px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

</style>
