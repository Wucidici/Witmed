<template>
  <el-dialog title="药品详情" :visible="visible" :append-to-body="true">
    <el-form
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="left"
    >
      <el-row :gutter="20" class="rt-portal-form-row">
        <el-col :span="12">
          <el-form-item label="医生名称" prop="doctorName">
            <el-input v-model="form.doctorName" placeholder="请输入医生名称">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接诊数" prop="appointNum">
            <el-input v-model="form.appointNum" placeholder="请输入接诊数目">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="剩余数量" prop="remainNum">
            <el-input disabled v-model="form.remainNum"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别" prop="doctorGender">
            <el-select v-model="form.doctorGender" placeholder="性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="科室" prop="departmentType">
            <el-select v-model="form.departmentType" placeholder="科室">
              <el-option label="内科" value="内科"></el-option>
              <el-option label="外科" value="外科"></el-option>
              <el-option label="骨科" value="骨科"></el-option>
              <el-option label="神经科" value="神经科"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类别" prop="doctorType">
            <el-select v-model="form.doctorType" placeholder="类别">
              <el-option label="专家号" value="专家号"></el-option>
              <el-option label="普通号" value="普通号"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="detailClose">关闭</el-button>
      <el-button type="primary" @click="save('form')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import LoginVue from '../Login.vue';

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
      form: {
        id: 0,
        doctorName: '',
        doctorType: '',
        doctorGender: '',
        appointNum: 0,
        remainNum: 0,
        departmentType: ''
      },
      formLabelWidth: '120px',
      rules: {
        doctorName: [
          { required: true, message: '医生姓名不能为空', trigger: 'blur' }
        ],
        doctorType: [
          { required: true, message: '医生类别不能为空', trigger: 'blur' }
        ],
        appointNum: [
          { required: true, message: '每日接诊数不能为空', trigger: 'change' },
          { pattern: /^([0-9])+?$/, message: '接诊数必须是整数' }
        ],
        departmentType: [
          { required: true, message: '科室不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    'form.appointNum': function(nval, oval) {
      this.form.remainNum = nval;
    }
  },
  methods: {
    fetchData() {
      if (this.id) {
        this.axios
          .get('getDoctorById/' + this.id)
          .then(resp => {
            this.form = resp.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    save(formName) {
      this.$confirm('是否提交', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          var that = this;
          // 通过传来的id是否为空判断是创建还是修改
          if (this.id == '') {
            this.axios.post('createdoctor', this.form).then(resp => {
              console.log(resp);
              if (resp.status == 200) {
                this.$message({
                  type: 'success',
                  message: ' 提交成功'
                });
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
          } else {
            this.form.id = this.id;
            this.axios.post('updateDoctor', this.form).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  type: 'success',
                  message: ' 修改成功'
                });
                that.$emit('resetLoadData');
                that.$emit('update:visible', false);
              } else {
                this.$message({
                  type: 'error',
                  message: ' 修改失败' + resp.message
                });
              }
            });
          }
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
