<template>
  <el-dialog title="预约挂号" :visible="visible" :append-to-body="true">
    <el-form
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="真实姓名" prop="userRealName">
            <el-input v-model="form.userRealName" placeholder="请输入真实姓名">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证" prop="userIdCard">
            <el-input v-model="form.userIdCard" placeholder="请输入身份证">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话号码" prop="userPhoneNum">
            <el-input v-model="form.userPhoneNum" placeholder="请输入电话号码">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预约日期" prop="appointDate">
            <el-date-picker
              :disabled="true"
              v-model="form.appointDate"
              type="date"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="科室类别" prop="departmentType">
            <el-select v-model="form.departmentType" placeholder="选择病房类型">
              <el-option label="内科" value="内科"></el-option>
              <el-option label="外科" value="外科"></el-option>
              <el-option label="骨科" value="骨科"></el-option>
              <el-option label="神经科" value="神经科"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="医生类别" prop="doctorType">
            <el-select v-model="form.doctorType" placeholder="选择病房类型">
              <el-option label="专家号" value="专家号"></el-option>
              <el-option label="普通号" value="普通号"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="form.wardType != ''" :span="12">
          <el-form-item label="医生姓名" prop="doctorName">
            <el-select
              @change="changeData"
              v-model="form.temp"
              placeholder="请选择"
            >
              <el-option
                v-for="item in doctorOptions"
                :key="item.id"
                :label="item.doctorName"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col v-show="form.temp != ''" :span="12">
          <el-form-item label="排队号" prop="ranking">
            <el-input :disabled="true" v-model="form.ranking"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-show="form.temp != ''" :span="12">
          <el-form-item label="医生性别" prop="doctorGender">
            <el-input :disabled="true" v-model="form.doctorGender"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="detailClose">关闭</el-button>
      <el-button type="primary" @click="save('form')">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    disabled: false,
    visible: {
      default: false
    },
    dialogFormVisible: false,
    id: {
      required: true
    }
  },
  data() {
    return {
      formLoading: true, //表单的loading参数
      doctorOptions: {},
      form: {
        userId: '',
        doctorId: '',
        doctorName: '',
        userRealName: '',
        userPhoneNum: '',
        userIdCard: '321322199903030303',
        userName: '',
        departmentType: '',
        doctorType: '',
        doctorGender: '',
        ranking: '', //排队号
        appointDate: '',
        temp: ''
      },
      formLabelWidth: '120px',
      rules: {
        userRealName: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符' },
          { pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文' }
        ],
        departmentType: [
          { required: true, message: '科室类别不能为空', trigger: 'blur' }
        ],
        doctorType: [
          { required: true, message: '医生类别不能为空', trigger: 'blur' }
        ],
        userIdCard: [
          { required: true, message: '身份证不能为空', trigger: 'blur' },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: '你的身份证格式不正确'
          }
        ],
        userPhoneNum: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error('请输入正确的手机号'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        doctorName: [
          { required: true, message: '医生姓名不能为空', trigger: 'change' }
        ]
      }
    };
  },

  watch: {
    'form.departmentType': function(nval, oval) {
      this.axios
        .get(
          'getDoctorByType/' +
            this.form.doctorType +
            '/' +
            this.form.departmentType
        )
        .then(resp => {
          console.log(resp.data);
          this.doctorOptions = resp.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.form.temp = '';
      this.form.ranking = '';
      this.form.doctorGender = '';
    },
    'form.doctorType': function(nval, oval) {
      this.axios
        .get(
          'getDoctorByType/' +
            this.form.doctorType +
            '/' +
            this.form.departmentType
        )
        .then(resp => {
          console.log(resp.data);
          this.doctorOptions = resp.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.form.temp = '';
      this.form.ranking = '';
      this.form.doctorGender = '';
    }
  },
  mounted() {
    this.form.userName = localStorage.getItem('userName');
    this.form.userId = localStorage.getItem('userId');
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate() + 1;
    console.log(d);
    let time = y + '-' + m + '-' + d;
    this.form.appointDate = time;
  },
  methods: {
    changeData(data) {
      this.form.ranking = data.appointNum - data.remainNum + 1;
      this.form.doctorGender = data.doctorGender;
      this.form.doctorId = data.id;
      this.form.doctorName = data.doctorName;
      console.log(data);
    },

    save(formName) {
      this.$confirm('是否提交', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          var that = this;
          this.axios.post('createAppointRecord', this.form).then(resp => {
            console.log(resp);
            if (resp.data == 1) {
              this.$message({
                type: 'success',
                message: ' 提交成功'
              });
              this.axios.get('reduceRemainNum/' + this.form.doctorId);
              // 子组件触发父组件方法
              that.$emit('resetLoadData');
              // 修改组件可见性为false
              that.$emit('update:visible', false);
            } else {
              this.$message({
                type: 'error',
                message: ' 提交失败' + resp.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          });
        });
    },
    detailClose() {
      if (this.salesorderLineId) {
        this.$refs.editForm.resetFields();
      }
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style scoped></style>
