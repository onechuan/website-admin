import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import appRoutes from './routes';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },

  ...appRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createRouteGuard(router);

export default router;
