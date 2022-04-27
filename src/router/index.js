import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { RouteRecordRaw } from 'vue-router';
// import HomePage from '../views/HomePage.vue'
import studentList from '../pages/studentList.vue';
import studentListTest from '../pages/studentListTest.vue';



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
    path: '/studentListTest',
    component: studentListTest
  },
  {
    path: '/studentList/1',
    component: () => import('../pages/studentDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
