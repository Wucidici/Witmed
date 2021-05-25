<template>
  <div>
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
      <el-menu-item index="healthknowledge">健康知识普及</el-menu-item>
      <el-menu-item index="showprice">价格公示</el-menu-item>
      <el-menu-item index="navigation">地图导航</el-menu-item>
      <el-submenu index="7">
        <template slot="title">个人中心</template>
        <el-menu-item index="hospitalization">预约挂号</el-menu-item>
        <el-menu-item index="registeredrecord">挂号记录</el-menu-item>
        <el-menu-item index="hospitalization">住院办理</el-menu-item>
        <el-menu-item index="diagnoseSelf">自我诊断</el-menu-item>
        <el-menu-item index="Login">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
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
    handleCommand(command) {
      if (command === 'loginout') {
        this.$router.push('/');
      }
    },
    handleSelect(key, keyPath) {
      // debugger;
      localStorage.setItem('activeIndex', key);
      console.log(localStorage.getItem('activeIndex'));
      console.log(key, keyPath);
      if (key == '/') this.$router.push('Login');
      let params = {
        activeIndex: key
      };
      this.$router.push({ name: key, params: params });
    }
  }
};
</script>

<style scoped></style>
