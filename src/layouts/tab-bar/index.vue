<template>
  <div class="tab-bar-container">
    <el-affix :offset="offsetTop">
      <div class="tab-bar-box">
        <div class="tab-bar-scroll">
          <div class="tags-wrap">
            <el-tag
              v-for="(tag, index) in tagList"
              :key="tag.fullPath"
              closable
              @click="goto(tag)"
              @close="tagClose(tag, index)"
              >{{ tag.title }}</el-tag
            >
          </div>
        </div>
        <div class="tag-bar-operation"></div>
      </div>
    </el-affix>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElAffix } from 'element-plus';
  import { useAppStore, useTabBarStore } from '@/store';
  import { useRouter } from 'vue-router';
  import { ITagProps } from '@/store/types';

  const appStore = useAppStore();
  const tabBarStore = useTabBarStore();
  const router = useRouter();

  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });

  const offsetTop = computed(() => {
    return appStore.navbar ? 60 : 0;
  });

  function tagClose(tag: ITagProps, idx: number) {
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
    background-color: $color-bg-2;
    .tab-bar-box {
      display: flex;
      padding: 0 0 0 20px;
      background-color: $color-bg-2;
      border-bottom: 1px solid $color-border;
      .tab-bar-scroll {
        height: 32px;
        flex: 1;
        overflow: hidden;
        .tags-wrap {
          padding: 4px 0;
          height: 42px;
          white-space: nowrap;
          overflow-x: auto;

          :deep(.oc-tag) {
            margin-right: 6px;
            cursor: pointer;
            &:first-child {
              .oc-tag-close-btn {
                display: none;
              }
            }
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
    color: $color-text-2;
    text-decoration: none;
  }
  .link-activated {
    color: $link-6;
    .tag-link {
      color: $link-6;
    }
    & + .oc-tag-close-btn {
      color: $link-6;
    }
  }
  :deep(.oc-affix) {
    z-index: 90;
    background-color: $color-bg-2;
    overflow-x: auto;
  }
</style>
