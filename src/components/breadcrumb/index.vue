<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <el-breadcrumb-item
      v-for="item in breadcrumbs"
      :key="item.path"
      :to="{ path: item.path }"
      >{{ item.name }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script lang="ts" setup>

  interface IProps {
    breadcrumbs:{
      name: string;
      path: string;
    }[]
  }
  defineProps<IProps>();
</script>

<style lang="scss" scoped>
  .breadcrumb-container {
    margin: 16px 0;
    .el-breadcrumb-item {
      background-color: aqua;
    }
  }
</style>
