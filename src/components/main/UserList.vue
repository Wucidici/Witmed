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

    <el-table :data="user" style="width: 100%">
      <el-table-column label="用户姓名" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userPassword }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类型" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.userType | getType
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row.id)"
              circle
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  filters: {
    getType: function(value) {
      return value == 1 ? '管理员' : '用户';
    }
  },

  mounted() {
    this.getDoctorList();
  },
  methods: {
    getDoctorList() {
      this.axios.get('getUserList').then(resp => {
        console.log(resp);
        this.user = resp.data;
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
          this.axios.delete('deleteUser/' + id).then(resp => {
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
