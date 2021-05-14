<template>
  <el-dialog title="病房详情" :visible="visible" :append-to-body="true">
    <el-form
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="left"
    >
      <el-row :gutter="20" class="rt-portal-form-row">
        <el-col :span="12">
          <el-form-item label="住院地址" prop="wardAddress">
            <el-input v-model="form.wardAddress" placeholder="请输入住院地址">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="病房类型" prop="wardType">
            <el-select v-model="form.wardType" placeholder="病房类型">
              <el-option label="普通病房" value="普通病房"></el-option>
              <el-option label="重症病房" value="重症病房"></el-option>
              <el-option label="隔离病房" value="隔离病房"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="床位数量" prop="wardBednum">
            <el-input v-model="form.wardBednum" placeholder="请输入床位数量">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房间号" prop="wardRoomnum">
            <el-input v-model="form.wardRoomnum" placeholder="请输入房间号">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="剩余房间数量" prop="wardRemiannum">
            <el-input
              :disabled="true"
              v-model="form.wardRemiannum"
              placeholder="默认和床位数量相同"
            ></el-input>
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
        wardAddress: '', //地址
        wardType: '普通病房', //类别
        wardBednum: 0, //床位数量
        wardRoomnum: 0, //房间号
        wardRemiannum: 0 //bing
      },
      formLabelWidth: '120px',
      rules: {
        wardAddress: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        wardType: [
          { required: true, message: '类别不能为空', trigger: 'blur' }
        ],
        wardBednum: [
          { required: true, message: '床位数量不为空', trigger: 'change' },
          { pattern: /^([0-9])+?$/, message: '数量必须是整数' }
        ],
        wardRoomnum: [
          { required: true, message: '房间号不能为空', trigger: 'change' }
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
          .get('getwardbyid/' + this.id)
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
          // 通过传来的id是否为空判断是创建还是修改
          if (this.id == '') {
            // 调用后端接口创建病房信息
            this.axios.post('createward', this.form).then(resp => {
              console.log(resp);
              if (resp.data == 1) {
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
            this.axios.post('updateward', this.form).then(resp => {
              if (resp.data == 1) {
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
