
<template>
<div>
  <img src="../../assets/hospital.jpg" style="box-shadow:5px 5px 80px #010">
<div calss="login_container">
	<div class="login">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="登录" name="first">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="名称" prop="name"><el-input v-model="ruleForm.name"></el-input></el-form-item>

					<el-form-item label="密码" prop="pass"><el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input></el-form-item>

					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>

						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>

			<el-tab-pane label="注册" name="second">
				<register></register>
			</el-tab-pane>
		</el-tabs>
	</div>
  </div>
</div>

</template>

<script>
import register from '@/components/main/register'

export default {
  data () {
    return {
      activeName: 'first',
      ruleForm: {
        name: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [{ required: true, message: '请输入您的名称', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  methods: {
    // 选项卡切换
    handleClick (tab, event) {},
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$router.push('/')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  components: {
    register
  }
}
</script>

<style>
.login_container{
    background: #2b4b6b;
    height:100%;
}
.login {
  position: absolute;
	width: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

}

.el-tabsitem {
	text-align: center;
	width: 60px;
}
</style>
