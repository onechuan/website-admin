import { useAppStore } from '@/store';
import { Router } from 'vue-router';

const whiteList = [
  { name: 'notFound', children: [] },
  { name: 'login', children: [] },
];

export default function setupServerPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 针对来自服务器的菜单配置进行处理
    const appStore = useAppStore();
    if (appStore.menuFromServer) {
      const serverMenuConfig = [...appStore.appServerMenuConfig, ...whiteList];
      let exist = false;
      while (serverMenuConfig.length) {
        const menuItem = serverMenuConfig.shift();
        if (menuItem.name === to.name) exist = true;
        if (menuItem.children) {
          serverMenuConfig.push(...menuItem.children);
        }
      }
      if (exist) next();
      else next({ name: 'notFound' });
    } else {
      next();
    }
  });
}
