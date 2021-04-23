<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="PortalIndex">首页</el-menu-item>
    <el-menu-item index="HospitalIntroduction">医院概述</el-menu-item>
    <el-menu-item index="PublicNotice">通知公告</el-menu-item>
    <el-menu-item index="3">健康知识普及</el-menu-item>
    <el-menu-item index="4">价格公示</el-menu-item>
    <el-menu-item index="5">地图导航</el-menu-item>
    <el-menu-item index="6">科室导航</el-menu-item>
    <el-submenu index="7">
      <template slot="title">个人中心</template>
      <el-menu-item index="7-1">预约挂号</el-menu-item>
      <el-menu-item index="7-2">门诊记录</el-menu-item>
      <el-menu-item index="7-3">住院办理</el-menu-item>
      <el-menu-item index="7-3">自我诊断</el-menu-item>
      <el-menu-item index="7-3">检验结果</el-menu-item>
      <el-menu-item index="7-3">自主结算</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    activeIndex: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // debugger;
      console.log(key, keyPath);
      let params = {
        activeIndex: key
      };
      this.$router.push({ name: key, params: params });
    }
  }
};
</script>

<style scoped></style>
