import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/app'

const routes = [
  {
    path: '/categories',
    name: 'Categories',
    meta: {
      layout: 'Main',
      auth: true
    },
    component: () => import('../views/Categories')
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'Main',
      auth: true
    },
    component: () => import('../views/Home')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: {
      layout: 'Main',
      auth: true
    },
    component: () => import('../views/Detail')
  },
  {
    path: '/history',
    name: 'History',
    meta: {
      layout: 'Main',
      auth: true
    },
    component: () => import('../views/History')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {
      layout: 'Main',
      auth: true
    },
    component: () => import('../views/Planning')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      layout: 'Main',
      auth: true
    },
    component: () =>  import('../views/Profile')
  },
  {
    path: '/record',
    name: 'Record',
    meta: {
      layout: 'Main',
      auth: true
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

router.beforeEach((to, from, next)=>{
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);
  if(requireAuth && !currentUser){
    next('/login?message=login');
  }
  else next();
});

export default router
