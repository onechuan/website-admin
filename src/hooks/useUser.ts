import { useRouter } from 'vue-router';
import { ElMessage } from "element-plus"

import { useUserStore } from '@/store';

export default function useUser() {
  const router = useRouter();
  const userStore = useUserStore();
  // 退出登录的跳转
  const logout = async (logoutTo?: string) => {
    await userStore.logout();
    // 获取当前路由的值
    const currentRoute = router.currentRoute.value;
    ElMessage.success('登出成功');
    // 跳转到指定路由
    router.push({
      name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'login',
      query: {
        ...router.currentRoute.value.query,
        redirect: currentRoute.name as string,
      },
    });
  };
  return {
    logout,
  };
}
