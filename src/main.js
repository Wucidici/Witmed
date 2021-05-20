// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import BaiduMap from 'vue-baidu-map';
import echarts from 'echarts';
//需要挂载到Vue原型上
Vue.prototype.$echarts = echarts;

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  //星号处填写自己申请的百度地图ak
  ak: 'FlkORbukNEhanmLFSKS3splSeHK2OvM5'
});

Vue.use(mavonEditor);

Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:8088/';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
