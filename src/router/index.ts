import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

import { DEFAULT_LAYOUT } from './constants';

const Dashboard = () => import('@/pages/dashboard/index.vue');
const User = () => import('@/pages/user/index.vue');
const AddUser = () => import('@/pages/user/add.vue');
const Login = () => import('@/pages/login/index.vue');

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: DEFAULT_LAYOUT,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
      {
        path: '/user',
        name: 'user',
        component: User,
      },
      {
        path: '/user/add',
        name: 'addUser',
        component: AddUser,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
