<template>
  <div class="user-info">
    <div class="header">
      <Breadcrumb :breadcrumbs="breadcrumbs" />
      <el-button type="primary" @click="onClickAddUser">新增用户</el-button>
    </div>
    <div class="main"></div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
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

  // do not use same name with ref
  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  });

  const onSubmit = () => {
    console.log('submit!');
  };
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
    height: 2000px;
    box-sizing: border-box;
  }
</style>
