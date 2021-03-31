import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/main/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/components/HomePage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});
