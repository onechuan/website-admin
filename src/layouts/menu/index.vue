<template>
  <el-menu
    default-active="2"
    class="el-menu-main"
    :class="{ 'el-menu-main--expand': isExpand }"
    :collapse="!isExpand"
    :collapse-transition="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="expand-btn" index="0" @click="onClickExpand">
      <el-icon v-if="isExpand"><Fold /></el-icon>
      <el-icon v-else><Expand /></el-icon>
    </div>
    <sub-menu
      v-for="menuItem in menuTree"
      :key="(menuItem.meta.order as number)"
      :menu-tree="menuItem"
    />
  </el-menu>
</template>

<script lang="ts" setup>
  import { RouteRecordNormalized, RouteRecordRaw, useRouter } from 'vue-router';
  import { User, Expand, Fold, Grid } from '@element-plus/icons-vue';
  import { useAppStore } from '@/store';
  import { computed } from 'vue';
  import usePermission from '@/hooks/usePermission';
  import SubMenu from './sub-menu.vue';

  const router = useRouter();
  const appStore = useAppStore();
  const permission = usePermission();

  const appRoutes = computed(() => {
    if (appStore.menuFromServer) {
      return appStore.appServerMenuConfig;
    }
    return router
      .getRoutes()
      .filter((el) => el.meta.requiresAuth && el.meta.order !== undefined);
  });

  function travel(_routes: RouteRecordRaw[], layer: number) {
    if (!_routes) return null;
    const collector: RouteRecordRaw[] = _routes.map(
      (routeItem: RouteRecordRaw) => {
        // 权限未通过
        if (!permission.accessRouter(routeItem)) {
          return null;
        }
        // 子节点
        if (routeItem.meta?.hideChildrenInMenu || !routeItem.children) {
          routeItem.children = [];
          return routeItem;
        }
        // route filter hideInMenu true
        routeItem.children = routeItem.children.filter(
          (x) => x.meta?.hideInMenu !== true
        );

        // Associated child node
        const subItem = travel(routeItem.children, layer + 1);

        if (subItem.length) {
          routeItem.children = subItem;
          return routeItem;
        }
        // the else logic
        if (layer > 1) {
          routeItem.children = subItem;
          return routeItem;
        }

        if (routeItem.meta?.hideInMenu === false) {
          return routeItem;
        }

        return null;
      }
    );
    return collector.filter(Boolean);
  }

  const menuTree = computed(() => {
    const cloneRoutes = JSON.parse(JSON.stringify(appRoutes.value));
    // 按照序号进行排序
    cloneRoutes.sort((x: RouteRecordNormalized, y: RouteRecordNormalized) => {
      return ((x.meta.order as number) || 0) - ((y.meta.order as number) || 0);
    });
    return travel(cloneRoutes, 0);
  });

  console.log('menuTree', menuTree);

  defineProps({
    isExpand: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['changeExpandStatus']);

  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };

  function onClickExpand() {
    emit('changeExpandStatus');
  }

  function onClickMenuItem(route: string) {
    router.push(route);
  }
</script>

<style lang="scss">
  .el-menu-main {
    width: 63px;
    height: calc(100vh - 61px);
    &--expand {
      width: 200px;
    }
    .expand-btn {
      height: 50px;
      line-height: 50px;
      width: 100%;
      text-align: center;
    }
  }
</style>
