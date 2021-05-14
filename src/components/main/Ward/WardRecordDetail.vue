<template>
  <el-dialog title="挂号记录" :visible="visible" :append-to-body="true">
    <el-form
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="left"
      disabled
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="病房Id" prop="wardId">
            <el-input v-model="form.wardId"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入真实姓名">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户Id" prop="userId">
            <el-input v-model="form.userId" placeholder="请输入真实姓名">
            </el-input>
          </el-form-item>
        </el-col>
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
          <el-form-item label="住院天数" prop="recordNumOfDay">
            <el-input
              v-model="form.recordNumOfDay"
              placeholder="请输入入住天数"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房间号" prop="wardRoomNum">
            <el-input v-model="form.wardRoomNum" placeholder="请输入入住天数">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="房间地址" prop="wardAddress">
            <el-input :disabled="true" v-model="form.wardAddress"></el-input>
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
          <el-form-item label="病房类型" prop="wardType">
            <el-select v-model="form.wardType" placeholder="选择病房类型">
              <el-option label="普通病房" value="普通病房"></el-option>
              <el-option label="重症病房" value="重症病房"></el-option>
              <el-option label="隔离病房" value="隔离病房"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="detailClose">关闭</el-button>
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
      ttt: {
        d: '1',
        dd: '2',
        ddd: '3'
      },
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (this.id) {
        this.axios
          .get('getwardrecordbyid/' + this.id)
          .then(resp => {
            console.log(resp.data);
            this.form = resp.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
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
