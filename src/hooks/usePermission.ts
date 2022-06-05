import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';

export default function usePermission() {
  const userStore = useUserStore();
  return {
    // 访问路由 校验权限
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresAuth ||
        !route.meta?.roles ||
        (route.meta?.roles as string[])?.includes('*') ||
        (route.meta?.roles as string[])?.includes(userStore.role.toString())
      );
    },
    // 获取首个通过的路由
    findFirstPermissionRoute(_routers: any, role = '1') {
      const cloneRouters = [..._routers];
      // 遍历循环获取到被通过的路由
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role);
          })
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
    // You can add any rules you want
  };
}
