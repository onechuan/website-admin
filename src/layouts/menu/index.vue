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
    <el-sub-menu index="/user">
      <template #title>
        <el-icon><user /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/user/all" @click="onClickMenuItem('/user')">
        <el-icon><grid /></el-icon>
        <span>查看用户</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4">
      <el-icon><user /></el-icon>
      <span>Navigator One</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { User, Expand, Fold, Grid } from '@element-plus/icons-vue';

  const router = useRouter();

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

  function onClickMenuItem(route: string){
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
