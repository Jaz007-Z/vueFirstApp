import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { RouteRecordRaw } from 'vue-router';
// import HomePage from '../views/HomePage.vue'
import studentList from '../pages/studentList.vue';
import tabsBase from '../components/base/tabsBase.vue'



const routes = [
  {
    path: '/',
    redirect: '/studentList'
  },
  {
    path: '/studentList',
    component: studentList
  },
  {
    path: '/studentList/:id',
    component: () => import('../pages/studentDetails.vue')
  },
  {
    path: '/studentList/:id/edit',
    component: () => import('../pages/studentEdit.vue')
  },
  {
    path: '/studentList/add',
    component: () => import('../pages/studentAdd.vue')
  },
  // {
  //   path: '/studentList/add',
  //   component: () => import('../pages/studentAdd.vue')
  // },
  {
    path: '/classList',
    component: () => import('../pages/classList.vue')
  },
  {
    path: '/classList/:id',
    component: () => import('../pages/classDetails.vue')
  },
  {
    path: '/classList/add',
    component: () => import('../pages/classAdd.vue')
  },


  //tabs
  {
    path: '/tabs/',
    component: tabsBase,
    children: [
      {
        path: '',
        redirect: 'tab1',
      },
      {
        path: 'tabClasses',
        component: () => import('../pages/classList.vue'),
      },
      {
        path: 'tabStudents',
        component: () => import('../pages/studentList.vue'),
      },
      // {
      //   path: 'tab3',
      //   component: () => import('@/views/Tab3.vue'),
      // },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
