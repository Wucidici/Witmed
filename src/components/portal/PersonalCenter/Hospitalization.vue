<template>
  <div>
    <NavBar :active-index="activeIndex"></NavBar>
    <el-row :gutter="10">
      <el-col style="height:700px !important" :span="12">
        <el-button
          style=" margin-top: 10%;
          width: 50%;
          height: 60%;
          font-size: 50px;
          margin-left:25%;
          font-family: fantasy;
          !important;"
          type="primary"
          round
          @click="adddetail"
          >预约挂号</el-button
        >
      </el-col>
      <el-col style="height:700px !important" :span="12">
        <el-button
          type="success"
          style=" margin-top: 10%;
          width: 50%;
          height: 60%;
          margin-right:25%;
          font-size: 50px;
         font-family: fantasy;
         !important;"
          round
          @click="addappoint"
          >住院办理</el-button
        >
      </el-col>
    </el-row>
    <hospital-detail
      :id="rowid"
      :visible.sync="needShowDialog"
      v-if="needShowDialog"
      @resetLoadData="getMedicineList"
    ></hospital-detail>
    <appointment-registration
      :id="rowid"
      :visible.sync="needShowDialogs"
      v-if="needShowDialogs"
      @resetLoadData="getMedicineList"
    ></appointment-registration>
  </div>
</template>

<script>
import NavBar from '../components/NavBar';
import HospitalDetail from './components/HospitalDetail';
import AppointmentRegistration from './components/AppointmentRegistration.vue';

export default {
  data() {
    return {
      activeIndex: 'hospitalization',
      needShowDialog: false,
      needShowDialogs: false,
      isVisible: true,
      rowid: ''
    };
  },
  components: {
    NavBar,
    HospitalDetail,
    AppointmentRegistration
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
    adddetail() {
      this.rowid = '';
      this.needShowDialogs = true;
    },
    addappoint() {
      this.rowid = '';
      this.needShowDialog = true;
    }
  }
};
</script>

<style scoped></style>
