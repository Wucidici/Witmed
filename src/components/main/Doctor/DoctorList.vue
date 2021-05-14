<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <el-table :data="doctor" style="width: 100%">
      <el-table-column label="医生姓名" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科室" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.departmentType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医生类别" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.doctorType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医生性别" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.doctorGender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="每日接诊数" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.appointNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="剩余挂号数" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.remainNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row.id)"
              circle
            ></el-button>
          </el-tooltip>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"
            circle
          ></el-button>
        </template>
      </el-table-column>

      <doctor-detail
        :id="rowid"
        :visible.sync="needShowDialog"
        v-if="needShowDialog"
        @resetLoadData="getDoctorList"
      ></doctor-detail>
    </el-table>
    <el-row>
      <br />
      <el-button type="primary" round @click="addDoctor">新增</el-button>
    </el-row>
  </div>
</template>

<script>
import DoctorDetail from './DoctorDetail.vue';
export default {
  components: { DoctorDetail },
  data() {
    return {
      needShowDialog: false,
      isVisible: true,
      medicine: {},
      doctor: {},
      rowid: ''
    };
  },

  mounted() {
    this.getDoctorList();
  },
  methods: {
    getDoctorList() {
      this.axios.get('findalldoctor').then(resp => {
        console.log(resp);
        this.doctor = resp.data;
      });
    },
    handleEdit(id) {
      this.rowid = id;
      this.needShowDialog = true;
    },
    addDoctor() {
      this.rowid = '';
      this.needShowDialog = true;
    },
    handleDelete(id) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.axios.delete('deleteDoctor/' + id).then(resp => {
            if (resp.data == 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.getDoctorList();
            } else {
              this.$message({
                type: 'error',
                message: ' 删除失败' + resp.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        });
    }
  }
};
</script>
