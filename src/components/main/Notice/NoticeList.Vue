<template>
  <el-table :data="notice" style="width: 100%">
    <el-table-column label="日期" width="380">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{
          scope.row.noticeCreatetime | formatDate
        }}</span>
      </template>
    </el-table-column>
    <el-table-column label="标题" width="500">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.noticeTitle }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleEdit(scope.row.id)"
          circle
        ></el-button>
        <el-tooltip class="item" effect="dark" content="发布" placement="top">
          <el-button
            v-if="scope.row.noticeStatus == 0"
            type="success"
            icon="el-icon-check"
            @click="handlePublice(scope.row.id)"
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
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      notice: {},
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? '0' + MM : MM;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;
      let h = date.getHours();
      h = h < 10 ? '0' + h : h;
      let m = date.getMinutes();
      m = m < 10 ? '0' + m : m;
      let s = date.getSeconds();
      s = s < 10 ? '0' + s : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  },

  mounted() {
    this.getNoticeList();
  },
  methods: {
    getNoticeList() {
      this.axios.get('findallnotice').then(resp => {
        console.log(resp);
        this.notice = resp.data;
      });
    },
    handleEdit(id) {
      this.$router.push({
        name: 'noticepublice',
        params: { id: id }
      });
    },
    handlePublice(id) {
      this.$confirm('确认发布', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.axios.post('updatenoticestatus/' + id).then(resp => {
            if (resp.status == 200) {
              this.$message({
                type: 'success',
                message: '发布成功'
              });
              this.getNoticeList();
            } else {
              this.$message({
                type: 'error',
                message: ' 发布失败' + resp.message
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
    },
    handleDelete(id) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.axios.delete('deletenotice/' + id).then(resp => {
            if (resp.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.getNoticeList();
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

      //   this.$router.push({
      //     name: 'NoticeDetail',
      //     params: { id: id }
      //   });
    }
  }
};
</script>
