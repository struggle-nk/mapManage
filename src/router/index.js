import Vue from 'vue'
import Router from 'vue-router'

const home = r => require.ensure([], () => r(require('../components/view')));
const Layout = r => require.ensure([], () => r(require('../components/common/layout')));
Vue.use(Router);

// export default new Router({
const routes = [
  {
    path: '/pages',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/pages/home',
        name: 'homePage',
        component:home,
      },
      {
        path: '/pages/account',
        name: 'account',
        component:()=>import('@/components/view/account/index.vue'),
      },
      {
        path: '/pages/map',
        name: 'map',
        component:()=>import('@/components/view/map/index.vue'),
      },
      {
        path: '/pages/query',
        name: 'query',
        component:()=>import('@/components/view/query/index.vue'),
      },
    ]
  },
  { path: '/', redirect: { name: 'homePage' } }
];

const router = new Router({
  routes
});

export default router
