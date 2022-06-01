<template>
  <el-sub-menu
    v-if="menuTree?.children?.length"
    :index="(menuTree.meta.order?.toString() as string)"
  >
    <template #title>
      <el-icon><user /></el-icon>
      <span>{{ $t( menuTree?.meta.locale ) }}</span>
    </template>
    <sub-menu
      v-for="menuItem in menuTree?.children"
      :key="(menuItem.meta.order as number)"
      :menu-tree="menuItem"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="(menuTree.meta.order?.toString() as string)"
    @click="goto(menuTree)"
  >
    <el-icon><user /></el-icon>
    <span>{{ $t( menuTree?.meta.locale ) }}</span> 
  </el-menu-item>
</template>

<script lang="ts" setup>
  import { RouteRecordRaw, useRouter } from 'vue-router';
  import { User } from '@element-plus/icons-vue';

  const router = useRouter()

  defineProps<{
    menuTree: RouteRecordRaw;
  }>();

  function goto(item: RouteRecordRaw) {
    router.push({
      name: item.name,
    });
  };
</script>

<style lang="scss" scoped></style>
