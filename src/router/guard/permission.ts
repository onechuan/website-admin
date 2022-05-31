import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import usePermission from '@/hooks/usePermission';
import { useUserStore } from '@/store';
import { isLogin } from '@/utils/token';
import appRoutes from '@/router/routes';

export default function setupPermissionGuard(router: Router) {
  // 全局路由守卫
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    // 路由判断
    async function crossroads() {
      const Permission = usePermission();
      // 校验路由所属角色通过
      if (Permission.accessRouter(to)) next();
      else {
        // 获取被准许通过的路由
        const destination = Permission.findFirstPermissionRoute(
          appRoutes,
          userStore.role.toString()
        ) || {
          name: 'notFound',
        };
        // 跳转到许可路由
        next(destination);
      }
      NProgress.done();
    }
    // 判断是否存在token，是否已经登录
    if (isLogin()) {
      // 判断有角色信息
      if (userStore.role) {
        // 根据角色判断权限
        crossroads();
      } else {
        try {
          await userStore.info();
          crossroads();
        } catch (error) {
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          });
          NProgress.done();
        }
      }
    } else {
      if (to.name === 'login') {
        next();
        NProgress.done();
        return;
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
      NProgress.done();
    }
  });
}
