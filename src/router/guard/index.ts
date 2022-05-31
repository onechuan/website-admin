import { setRouteEmitter } from '@/utils/route-listener';
import { RouteLocationNormalized, Router } from 'vue-router';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to: RouteLocationNormalized) => {
    // emit route change
    setRouteEmitter(to);
  });
}
