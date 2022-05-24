<template>
  <div class="header">
    <Breadcrumb :breadcrumbs="breadcrumbs" />
    <el-button type="primary" @click="onClickAddUser">新增用户</el-button>
  </div>
  <div class="main">
    <CardBox />
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import Breadcrumb from '@/components/breadcrumb/index.vue';
  import CardBox from '@/components/card-box/index.vue';

  const router = useRouter();
  const breadcrumbs = [
    {
      name: '用户管理',
      path: '/user',
    },
    {
      name: '查看用户',
      path: '/user',
    },
  ];

  function onClickAddUser() {
    router.push('/user/add');
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main {
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
  }
</style>
