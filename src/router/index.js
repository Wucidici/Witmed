import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/main/Login';

import PortalIndex from '../components/portal/PortalIndex';
import HospitalIntroduction from '../components/portal/HospitalIntroduction';
import PublicNotice from '../components/portal/PublicNotice';

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
    },
    {
      path: '/PortalIndex',
      name: 'PortalIndex',
      component: PortalIndex
    },
    {
      path: '/HospitalIntroduction',
      name: 'HospitalIntroduction',
      component: HospitalIntroduction
    },
    {
      path: '/PublicNotice',
      name: 'PublicNotice',
      component: PublicNotice
    }
  ]
});
