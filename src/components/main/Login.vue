<template>
  <div>
    <img
      src="../../assets/hospital.jpg"
      style="box-shadow:5px 5px 80px #010 ;text-align: center; margin-top: 60px ;margin-left: 100px"
    />
    <div calss="login_container">
      <div class="login">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录" name="first">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="名称" prop="userName"
                ><el-input v-model="ruleForm.userName"></el-input
              ></el-form-item>

              <el-form-item label="密码" prop="userPassword"
                ><el-input
                  type="password"
                  v-model="ruleForm.userPassword"
                  auto-complete="off"
                ></el-input
              ></el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >登录</el-button
                >

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
import register from '@/components/main/register';

export default {
  data() {
    return {
      activeName: 'first',
      ruleForm: {
        userName: '',
        userPassword: '',
        checkPass: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入您的名称', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    // 选项卡切换
    handleClick(tab, event) {},
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post('login', this.ruleForm).then(resp => {
            console.log(resp);
            if (resp.data == null || resp.data == '') {
              this.$notify.error({
                title: '登陆失败',
                message: '用户名或密码错误',
                duration: 1300
              });
            } else {
              if (resp.data.userType) {
                if (resp.data.userType == 1) {
                  this.$message({
                    type: 'success',
                    message: '登录成功'
                  });
                  this.$router.push('/homepage');
                }
                if (resp.data.userType == 2) {
                  this.$message({
                    type: 'success',
                    message: '登录成功'
                  });
                  localStorage.setItem('userName', resp.data.userName);
                  localStorage.setItem('userId', resp.data.id);
                  this.$router.push('/PortalIndex');
                }
              }
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  components: {
    register
  }
};
</script>

<style>
.login_container {
  background: #2b4b6b;
  height: 100%;
  margin-top: 60px;
}
.login {
  position: absolute;
  width: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-tabsitem {
  text-align: center;
  width: 60px;
}
</style>
