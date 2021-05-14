<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="userName"
      ><el-input v-model="ruleForm.userName"></el-input
    ></el-form-item>
    <el-form-item label="密码" prop="userPassword"
      ><el-input
        type="password"
        v-model="ruleForm.userPassword"
        auto-complete="off"
      ></el-input
    ></el-form-item>
    <el-form-item label="确认密码" prop="checkPass"
      ><el-input
        type="password"
        v-model="ruleForm.checkPass"
        auto-complete="off"
      ></el-input
    ></el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.userPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      activeName: 'second',
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
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post('register', this.ruleForm).then(resp => {
            if (resp.data) {
              this.$notify({
                title: '注册成功',
                message: '注册成功,请登陆',
                type: 'success',
                duration: 1300
              });
            } else {
              this.$notify.error({
                title: '注册失败',
                message: '已存在该用户，请登录',
                duration: 1300
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
