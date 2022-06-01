<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside v-if="renderMenu" v-show="!hideMenu" width="`${menuWidth}px`">
          <Menu
            :collapsed="!collapsed"
            :menu-width="menuWidth"
            @setCollapsed="setCollapsed"
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

  const appStore = useAppStore();
  const offsetTop = computed(() => {
    return appStore.navbar ? 32 : 0;
  });

  const collapsed = computed(() => {
    return appStore.menuCollapse;
  });
  function setCollapsed() {
    appStore.updateSettings({ menuCollapse: !collapsed.value });
  }

  const navbarHeight = `60px`;
  const navbar = computed(() => appStore.navbar);
  const renderMenu = computed(() => appStore.menu);
  const hideMenu = computed(() => appStore.hideMenu);
  const menuWidth = computed(() => {
    return appStore.menuCollapse ? 48 : appStore.menuWidth;
  });
  const paddingStyle = computed(() => {
    const paddingLeft =
      renderMenu.value && !hideMenu.value
        ? { paddingLeft: `${menuWidth.value}px` }
        : {};
    const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {};
    return { ...paddingLeft, ...paddingTop };
  });
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
      border-right: 1px solid #ccc;
    }
    .main-content {
      margin-top: 1px;
    }
  }
</style>
