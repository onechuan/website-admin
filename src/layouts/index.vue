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
        <el-container>
          <el-header class="tab-bar" :height="`${offsetTop}px`"
            ><tab-bar
          /></el-header>
          <el-main>
            <page-layout />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useAppStore } from '@/store';
  import Menu from './menu/index.vue';
  import Header from './header/index.vue';
  import PageLayout from './page-layout.vue';
  import TabBar from './tab-bar/index.vue';

  const isExpand = ref(true);
  const appStore = useAppStore();
  const offsetTop = computed(() => {
    return appStore.navbar ? 32 : 0;
  });

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
    .tab-bar {
      margin-top: 1px;
    }
    .el-main {
      height: calc(100vh - 61px);
      overflow-y: scroll;
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
    .main-content {
      margin-top: 1px;
    }
  }
</style>
