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
    <el-table :data="ward" style="width: 100%">
      <el-table-column label="地址" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.wardAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间类别" width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.wardType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="床位数量" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.wardBednum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间号" width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.wardRoomnum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="剩余床位数" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.wardRemiannum }}</span>
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
      <!-- 住院添加和修改组件 -->
      <ward-detail
        :id="rowid"
        :visible.sync="needShowDialog"
        v-if="needShowDialog"
        @resetLoadData="getWardList"
      ></ward-detail>
    </el-table>
    <el-row>
      <br />
      <el-button type="primary" round @click="addward">新增</el-button>
    </el-row>
  </div>
</template>

<script>
import WardDetail from './WardDetail.vue';
export default {
  components: { WardDetail },
  data() {
    return {
      needShowDialog: false,
      isVisible: true,
      ward: {},
      rowid: ''
    };
  },

  mounted() {
    this.getWardList();
  },
  methods: {
    getWardList() {
      this.axios.get('findallward').then(resp => {
        console.log(resp);
        this.ward = resp.data;
      });
    },
    handleEdit(id) {
      this.rowid = id;
      this.needShowDialog = true;
    },
    addward() {
      this.rowid = '';
      this.needShowDialog = true;
    },
    handleDelete(id) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.axios.delete('deleteward/' + id).then(resp => {
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
