import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Categories.vue'),
  },
  {
    path: '/registration',
    name: 'registration',
    meta: { layout: 'empty' },
    component: () => import('@/views/Registration.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Detail.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/History.vue'),
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/planning',
    name: 'plannig',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Planning.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Record.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !firebase.auth().currentUser) {
    console.log('if', from, to);
    next('/login?message=login');
  } else {
    next();
  }
});

export default router;
