<template>
  <div class="tab-bar-container">
    <div class="tab-bar-box">
      <div class="tab-bar-scroll">
        <div class="tags-wrap">
          <el-tag
            v-for="(tag, index) in tagList"
            :key="tag.fullPath"
            :closable="index !== 0"
            @click="goto(tag)"
            @close="tagClose(tag, index)"
            >{{ $t(tag.title) }}</el-tag
          >
        </div>
      </div>
      <div class="tag-bar-operation"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useTabBarStore } from '@/store';
  import { RouteLocationNormalized, useRouter } from 'vue-router';
  import { ITagProps } from '@/store/types';
  import { listenerRouteChange } from '@/utils/route-listener';

  const tabBarStore = useTabBarStore();
  const router = useRouter();

  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });

  listenerRouteChange((route: RouteLocationNormalized) => {
    if (
      !route.meta.noAffix &&
      !tagList.value.some((tag) => tag.fullPath === route.fullPath)
    ) {
      console.log('update', route);
      tabBarStore.updateTabList(route);
    }
  }, true);

  function tagClose(tag: ITagProps, idx: number) {
    console.log('delete', tag, idx);

    tabBarStore.deleteTag(idx, tag);
    if (idx === tagList.value.length) {
      const latest = tagList.value[tagList.value.length - 1];
      router.push({ name: latest.name });
    }
  }

  function goto(tag: ITagProps) {
    router.push({ ...tag });
  }
</script>

<style lang="scss" setup>
  .tab-bar-container {
    position: relative;
    background-color: var(--color-bg-2);
    .tab-bar-box {
      display: flex;
      padding: 0 0 0 20px;
      background-color: var(--color-bg-2);
      border-bottom: 1px solid var(--color-border);
      .tab-bar-scroll {
        height: 32px;
        flex: 1;
        overflow: hidden;
        .tags-wrap {
          padding: 4px 0;
          height: 42px;
          white-space: nowrap;
          overflow-x: auto;
          .el-tag {
            cursor: pointer;
            margin-right: 5px;
          }
        }
      }
    }

    .tag-bar-operation {
      width: 100px;
      height: 32px;
    }
  }

  .tag-link {
    color: var(--color-text-2);
    text-decoration: none;
  }
  .link-activated {
    color: var(--link-6);
    .tag-link {
      color: var(--link-6);
    }
    & + .oc-tag-close-btn {
      color: var(--link-6);
    }
  }
  :deep(.oc-affix) {
    z-index: 90;
    background-color: var(--color-bg-2);
    overflow-x: auto;
  }
</style>
