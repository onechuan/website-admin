<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside :class="{ 'el-aside--expand': isExpand }">
          <Menu
            :is-expand="isExpand"
            @changeExpandStatus="changeExpandStatus"
          />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Menu from '../menu/index.vue';
  import Header from '../header/index.vue';

  const isExpand = ref(true);

  function changeExpandStatus() {
    isExpand.value = !isExpand.value;
  }
</script>

<style lang="scss" scoped>
  .common-layout {
    width: 100%;
    height: 100%;
    .el-header {
      margin: 0;
      padding: 0;
    }
    .el-main {
      background-color: rgba(229, 230, 235, 0.3);
    }
    .el-aside {
      margin-top: 1px;
      width: 60px;
      border-right: 1px solid #ccc;
      &--expand {
        width: 200px;
      }
    }
  }
</style>
