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
          <el-form-item label="药品名称" prop="medicineName">
            <el-input v-model="form.medicineName" placeholder="请输入药品名称">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="药品类别" prop="medicineClass">
            <el-input v-model="form.medicineClass" placeholder="请输入科目">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="库存数量" prop="medicineNum">
            <el-input v-model="form.medicineNum" placeholder="请输入库存数量">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="价格" prop="medicineMoney">
            <el-input v-model="form.medicineMoney" placeholder="请输入价格">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单位" prop="medicineUnit">
            <el-select v-model="form.medicineUnit" placeholder="单位">
              <el-option label="盒" value="盒"></el-option>
              <el-option label="片" value="片"></el-option>
              <el-option label="瓶" value="瓶"></el-option>
              <el-option label="袋" value="袋"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效日期" prop="medicineexpirationdate">
            <el-date-picker
              v-model="form.medicineexpirationdate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产日期" prop="medicineproductdate">
            <el-date-picker
              v-model="form.medicineproductdate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
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
    // var checkOrderAmount = (rule, value, callback) => {
    //   if (
    //     value == null ||
    //     value == undefined ||
    //     value == '' ||
    //     value.length <= 0
    //   )
    //     return;
    //   var reg = new RegExp('^[1-9](\\d{0,9})((\\.\\d{1,2})?)$');
    // };
    return {
      formLoading: true, //表单的loading参数
      form: {
        id: 0,
        medicineName: '',
        medicineClass: '', //药品种类
        medicineNum: 0, //数量
        medicineMoney: 0, //价格
        medicineUnit: '盒', //单位
        medicineproductdate: '', // 生产日期
        medicineexpirationdate: '' //有效日期
      },
      formLabelWidth: '120px',
      rules: {
        medicineName: [
          { required: true, message: '药品名称不能为空', trigger: 'blur' }
        ],
        medicineClass: [
          { required: true, message: '类别不能为空', trigger: 'blur' }
        ],
        medicineNum: [
          { required: true, message: '数量不为空', trigger: 'change' },
          { pattern: /^([0-9])+?$/, message: '数量必须是整数' }
        ],
        medicineMoney: [
          { required: true, message: '价格不为空', trigger: 'change' },
          { pattern: /^([0-9])+(\.[0-9]+)?$/, message: '价格必须是数字的值' }
        ],

        medicineexpirationdate: [
          { required: true, message: '有效期不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (this.id) {
        this.axios
          .get('findmedicinebyid/' + this.id)
          .then(resp => {
            console.log(resp.data);
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
          if (this.id == '') {
            this.axios.post('createmedicine', this.form).then(resp => {
              console.log(resp);
              if (resp.status == 200) {
                this.$message({
                  type: 'success',
                  message: ' 提交成功'
                });
                that.$emit('resetLoadData');
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
            this.axios.post('updatemedicine', this.form).then(resp => {
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
      //   var that = this;
      //   that.formLoading = true;
      //   that.editForm.StudentScoreId = that.StudentScoreId;
      //   that.editForm.StudentId = that.StudentId;
      //   let apiUrl = '../api/StudentScore/UpdateOrCreateStudentScore';
      //   return rt
      //     .post(apiUrl, that.editForm)
      //     .then(res => {
      //       rt.showSuccessToast('保存成功');
      //       that.$emit('resetLoadData');
      //       that.$emit('update:visible', false);
      //     })
      //     .catch(error => {
      //       rt.showErrorToast(error);
      //     });
      //   that.formLoading = false;
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
