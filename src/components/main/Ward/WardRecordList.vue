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
    <el-table :data="wardRecord" style="width: 100%">
      <el-table-column label="Id" width="40">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户Id" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="住院日期" width="140">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.recordCheckInDate | formatDate
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userRealName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="身份证号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userIdCard }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院天数" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.recordNumOfDay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.wardAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间类别" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.wardType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="房间号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.wardRoomNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="查看详细信息"
            placement="top"
          >
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
      <!-- 住院添加和修改组件 -->
      <ward-record-detail
        :id="rowid"
        :visible.sync="needShowDialog"
        v-if="needShowDialog"
        @resetLoadData="getWardList"
      ></ward-record-detail>
    </el-table>
  </div>
</template>

<script>
import WardRecordDetail from './WardRecordDetail.vue';
export default {
  components: { WardRecordDetail },
  data() {
    return {
      needShowDialog: false,
      isVisible: true,
      wardRecord: {},
      rowid: ''
    };
  },
  mounted() {
    this.getWardList();
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? '0' + MM : MM;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;

      return y + '-' + MM + '-' + d;
    }
  },

  methods: {
    getWardList() {
      this.axios.get('findallwardrecord').then(resp => {
        console.log(resp);
        this.wardRecord = resp.data;
      });
    },
    handleEdit(id) {
      this.rowid = id;
      this.needShowDialog = true;
    },

    handleDelete(id) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.axios.delete('deletewardrecord/' + id).then(resp => {
            if (resp.data == 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.getWardList();
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
