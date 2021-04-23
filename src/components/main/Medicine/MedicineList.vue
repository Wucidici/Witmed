<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="medicine" style="width: 100%">
      <el-table-column label="药品名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.medicineName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="药品种类" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.medicineClass }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.medicineNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.medicineMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.medicineUnit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="380">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.medicineproductdate | formatDate
          }}</span>
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

      <medicine-detail
        :id="rowid"
        :visible.sync="needShowDialog"
        v-if="needShowDialog"
        @resetLoadData="getMedicineList"
      ></medicine-detail>
    </el-table>
    <el-row>
      <br />
      <el-button type="primary" round @click="addmedicine">新增</el-button>
    </el-row>
  </div>
</template>

<script>
import MedicineDetail from './MedicineDetail.vue';
export default {
  components: { MedicineDetail },
  data() {
    return {
      needShowDialog: false,
      isVisible: true,
      medicine: {},
      notice: {},
      rowid: '',
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
    this.getMedicineList();
  },
  methods: {
    getMedicineList() {
      this.axios.get('findallmedicine').then(resp => {
        console.log(resp);
        this.medicine = resp.data;
      });
    },
    handleEdit(id) {
      this.rowid = id;
      this.needShowDialog = true;
    },
    addmedicine() {
      this.rowid = '';
      this.needShowDialog = true;
    },
    handleDelete(id) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.axios.delete('deletemedicine/' + id).then(resp => {
            if (resp.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.getMedicineList();
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
