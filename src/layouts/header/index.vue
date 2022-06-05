<template>
  <div class="navbar">
    <div class="left-side">
      <el-space>
        <img
          alt="logo"
          src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        />
        <h1>一码平川管理系统</h1>
      </el-space>
    </div>
    <ul class="right-side">
      <li>
        <el-tooltip content="搜索">
          <el-button class="nav-btn" :icon="Search" circle> </el-button>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip content="主题">
          <el-button class="nav-btn" :icon="Sunny" circle> </el-button>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip content="通知">
          <el-button class="nav-btn" :icon="Bell" circle> </el-button>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip content="设置">
          <el-button class="nav-btn" :icon="Setting" circle> </el-button>
        </el-tooltip>
      </li>
      <li>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-avatar
              src="https://p6-passport.byteacctimg.com/img/user-avatar/aba52490859e37e949e0c9f6214aff0f~300x300.image"
            >
            </el-avatar>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>用户中心</el-dropdown-item>
              <el-dropdown-item>用户设置</el-dropdown-item>
              <el-dropdown-item @click="handleLogout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { Search, Bell, Setting, Sunny } from '@element-plus/icons-vue';

  import { useUserStore } from '@/store';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const router = useRouter();
  // 退出登录
  function handleLogout() {
    userStore.logout();

    router.push('/login');
    ElMessage.success('Logout is success~~');
  }
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    .left-side {
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
    .right-side {
      display: flex;
      padding-right: 20px;
      list-style: none;
      li {
        display: flex;
        align-items: center;
        padding: 0 10px;
        .el-dropdown-link {
          cursor: pointer;
        }
      }
    }
  }
</style>
