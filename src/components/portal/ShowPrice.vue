<template>
  <div style="height: 100%">
    <NavBar :active-index="activeIndex"></NavBar>
    <br />
    <el-row :gutter="0">
      <el-col :span="7" tag="标题">
        <div>
          <el-tag type="success">药品名称 </el-tag>
          <el-input
            style="width: 300px; position:relative;"
            type="text"
            placeholder="请输入搜索药品名称"
            v-model="search"
          >
          </el-input>
        </div> </el-col
    ></el-row>

    <br />

    <el-table
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @expand-change="expandSelect"
      :data="
        medicine
          .filter //短路求值
          (
            data =>
              !search ||
              data.medicineName.toLowerCase().includes(search.toLowerCase())
          )
      "
      style="width: 100%; height: calc(100% - 80px); overflow: auto;"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="药品名称">
              <span>{{ props.row.medicineName }}</span>
            </el-form-item>
            <el-form-item label="单位">
              <span>{{ props.row.medicineUnit }}</span>
            </el-form-item>
            <el-form-item label="药品分类">
              <span>{{ props.row.medicineClass }}</span>
            </el-form-item>
            <el-form-item label="药品价格">
              <span>{{ props.row.medicineMoney }}</span>
            </el-form-item>
            <el-form-item label="药品描述:">
              <span>{{ props.row.medicineDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="药品ID" prop="id"> </el-table-column>
      <el-table-column label="药品名称" prop="medicineName"> </el-table-column>
      <el-table-column label="药品价格" prop="medicineMoney"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
export default {
  name: 'showprice',
  data() {
    return {
      activeIndex: 'showprice',
      expands: [],
      search: '',
      medicine: {}
    };
  },
  components: {
    NavBar
  },
  mounted() {
    this.axios.get('findallmedicine').then(resp => {
      console.log(resp);
      this.medicine = resp.data;
    });
  },
  methods: {
    getRowKeys(row) {
      return row.id;
    },
    expandSelect(row, expandedRows) {
      var that = this;
      if (expandedRows.length) {
        that.expands = [];
        if (row) {
          that.expands.push(row.id);
        }
      } else {
        that.expands = [];
      }
    }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-table__body-wrapper {
  overflow: auto !important;
  position: relative;
  /* height: 100%; */
}
</style>
