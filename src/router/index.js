import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Photo',
    name: 'Photo',
    component: () => import('../views/Photo.vue')
  },
  {
    path: '/Edit/:file',
    name: 'Edit',
    component: () => import('../views/Edit.vue'),
    props: true
  }
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
