<template>
  <div>
    <NavBar :active-index="activeIndex"></NavBar>
    <el-table
      :data="record"
      style="width: 100%  ;"
      :default-sort="{ prop: 'appointDate', order: 'descending' }"
    >
      <el-table-column prop="appointDate" label="预约日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="doctorName" label="医生姓名" sortable width="180">
      </el-table-column>
      <el-table-column
        prop="departmentType"
        label="科室"
        :formatter="formatter"
      >
      </el-table-column>
      <el-table-column prop="doctorGender" sortable label="医生性别">
      </el-table-column>
      <el-table-column prop="doctorType" sortable label="挂号类别">
      </el-table-column>
      <el-table-column prop="ranking" sortable label="排队号">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import NavBar from '../components/NavBar';
export default {
  data() {
    return {
      record: {}
    };
  },
  components: {
    NavBar
  },
  mounted() {
    this.getRecordList();
  },
  methods: {
    formatter(row, column) {
      return row.departmentType;
    },
    getRecordList() {
      this.axios
        .get('getAppointRecordByUserId/' + localStorage.getItem('userId'))
        .then(resp => {
          console.log(resp);
          this.record = resp.data;
        });
    }
  }
};
</script>
