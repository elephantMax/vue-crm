import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/categories',
    name: 'Categories',
    meta: {
      layout: 'Main'
    },
    component: () => import('../views/Categories')
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'Main'
    },
    component: () => import('../views/Home')
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: {
      layout: 'Main'
    },
    component: () => import('../views/Detail')
  },
  {
    path: '/history',
    name: 'History',
    meta: {
      layout: 'Main'
    },
    component: () => import('../views/History')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {
      layout: 'Main'
    },
    component: () => import('../views/Planning')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      layout: 'Main'
    },
    component: () =>  import('../views/Profile')
  },
  {
    path: '/record',
    name: 'Record',
    meta: {
      layout: 'Main'
    },
    component: () => import('../views/Record')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'Empty'
    },
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'Empty'
    },
    component: () => import('../views/Register')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
