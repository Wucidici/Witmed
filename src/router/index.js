import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/main/Login';

import PortalIndex from '../components/portal/PortalIndex';
import HospitalIntroduction from '../components/portal/HospitalIntroduction';
import PublicNotice from '../components/portal/PublicNotice';
import DiagnoseSelf from '../components/portal/diagnoseSelf/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/homepage',
      name: 'HomePage',
      component: () => import('@/components/HomePage.vue'),
      children: [
        {
          path: '/publice',
          name: 'noticepublice',
          meta: {
            title: '公告发布'
          },
          component: () => import('../components/main/Notice/NoticePublice.vue')
        },
        {
          path: '/list',
          name: 'noticelist',
          meta: {
            title: '公告列表'
          },
          component: () => import('../components/main/Notice/NoticeList.vue')
        },
        {
          path: '/healthlist',
          name: 'healthlist',
          meta: {
            title: '健康知识列表'
          },
          component: () =>
            import('../components/main/Notice/HealthKonwledge.vue')
        },
        {
          path: '/firstpage',
          name: 'firstpage',
          meta: {
            title: '系统首页'
          },
          component: () => import('../components/main/FirstPage.vue')
        },
        {
          path: '/userlist',
          name: 'userlist',
          meta: {
            title: '用户管理'
          },
          component: () => import('../components/main/UserList.vue')
        },
        {
          path: '/medicinelist',
          name: 'medicinelist',
          meta: {
            title: '药品管理'
          },
          component: () =>
            import('../components/main/Medicine/MedicineList.vue')
        },
        {
          path: '/wardlist',
          name: 'wardlist',
          meta: {
            title: '住院管理'
          },
          component: () => import('../components/main/Ward/WardList.vue')
        },
        {
          path: '/wardrecordlist',
          name: 'wardrecordlist',
          meta: {
            title: '住院记录'
          },
          component: () => import('../components/main/Ward/WardRecordList.vue')
        },
        {
          path: '/doctorlist',
          name: 'doctorlist',
          meta: {
            title: '医生管理'
          },
          component: () => import('../components/main/Doctor/DoctorList.vue')
        }
      ]
    },
    {
      path: '/',
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
    },
    {
      path: '/PortalIndex',
      name: 'PortalIndex',
      component: PortalIndex
    },
    {
      path: '/publicnoticedetail',
      name: 'publicnoticedetail',
      component: () => import('@/components/portal/PublicNoticeDetail.vue')
    },
    {
      path: '/healthKnowledgedetail',
      name: 'healthKnowledgedetail',
      component: () => import('@/components/portal/HealthKnowledgeDetail.vue')
    },
    {
      path: '/diagnoseSelf',
      name: 'diagnoseSelf',
      component: DiagnoseSelf
    },
    {
      path: '/navigation',
      name: 'navigation',
      component: () => import('@/components/portal/Navigation.vue')
    },
    {
      path: '/hospitalization',
      name: 'hospitalization',
      component: () =>
        import('@/components/portal/PersonalCenter/Hospitalization.vue')
    },
    {
      path: '/registeredrecord',
      name: 'registeredrecord',
      component: () =>
        import('@/components/portal/PersonalCenter/RegisteredRecord.vue')
    },
    {
      path: '/showprice',
      name: 'showprice',
      component: () => import('@/components/portal/ShowPrice.vue')
    },
    {
      path: '/healthknowledge',
      name: 'healthknowledge',
      component: () => import('@/components/portal/HealthKnowledge.vue')
    }
  ]
});
