<template>
  <el-dialog title="住院办理" :visible="visible" :append-to-body="true">
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
          <el-form-item label="入住日期" prop="recordCheckInDate">
            <el-date-picker
              v-model="form.recordCheckInDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入住天数" prop="recordNumOfDay">
            <el-input
              v-model="form.recordNumOfDay"
              placeholder="请输入入住天数"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="病房类型" prop="wardType">
            <el-select v-model="form.wardType" placeholder="选择病房类型">
              <el-option label="普通病房" value="普通病房"></el-option>
              <el-option label="重症病房" value="重症病房"></el-option>
              <el-option label="隔离病房" value="隔离病房"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="form.wardType != ''" :span="12">
          <el-form-item label="房间号" prop="wardRoomNum">
            <el-select
              ref="roomnum"
              @change="changeData"
              v-model="form.temp"
              placeholder="请选择"
            >
              <el-option
                v-for="item in wardRoomNumOptions"
                :key="item.id"
                :label="item.wardRoomnum"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col v-show="form.wardRoomNum != ''" :span="12">
          <el-form-item label="房间地址" prop="wardAddress">
            <el-input :disabled="true" v-model="form.wardAddress"></el-input>
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
      wardRoomNumOptions: {},
      form: {
        userId: '',
        wardId: '',
        recordCheckInDate: '',
        recordNumOfDay: '',
        userRealName: '',
        userPhoneNum: '',
        userIdCard: '321322199903030303',
        userName: '',
        wardType: '',
        wardAddress: '',
        wardRoomNum: '',
        temp: ''
      },
      formLabelWidth: '120px',
      rules: {
        userRealName: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符' },
          { pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文' }
        ],
        wardType: [
          { required: true, message: '类别不能为空', trigger: 'blur' }
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
        wardRoomnum: [
          { required: true, message: '房间号不能为空', trigger: 'change' }
        ],
        recordNumOfDay: [
          { required: true, message: '入住天数', trigger: 'blur' },
          { pattern: /^([0-9])+?$/, message: '入住天数只能为整数' }
        ]
      }
    };
  },
  watch: {
    'form.wardType': function(nval, oval) {
      this.axios
        .get('getwardbytype/' + this.form.wardType)
        .then(resp => {
          console.log(resp.data);
          this.wardRoomNumOptions = resp.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.form.wardRoomNum = '';
      this.form.temp = '';
    }
  },
  mounted() {
    this.form.userName = localStorage.getItem('userName');
    this.form.userId = localStorage.getItem('userId');
  },
  methods: {
    changeData(data) {
      this.form.wardRoomNum = data.wardRoomnum;
      this.form.wardAddress = data.wardAddress;
      this.form.wardId = data.id;
      console.log(data);
    },

    save(formName) {
      this.$confirm('是否提交', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          var that = this;
          this.axios.post('createwardrecord', this.form).then(resp => {
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
