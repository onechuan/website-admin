import { setRouteEmitter } from '@/utils/route-listener';
import { RouteLocationNormalized, Router } from 'vue-router';
import setupPermissionGuard from './permission';
import setupServerPermissionGuard from './serverPermission';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to: RouteLocationNormalized) => {
    // emit route change
    setRouteEmitter(to);
  });
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
  setupServerPermissionGuard(router);
  setupPermissionGuard(router);
}
