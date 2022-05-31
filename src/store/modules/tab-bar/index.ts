import { RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';
import { ITabBarState, ITagProps } from './types';

function formatTag(route: RouteLocationNormalized): ITagProps {
  const { name, meta, fullPath, query } = route;
  return {
    title: (meta?.locale as string) || '',
    name: name.toString(),
    fullPath,
    query,
  };
}

const useTabBarStore = defineStore('tabBar', {
  state: (): ITabBarState => ({
    cacheTabList: new Set(),
    // Set the first element dynamically as needed
    tagList: [
      {
        title: 'menu.dashboard.workplace',
        name: 'Workplace',
        fullPath: '/dashboard/workplace',
      },
    ],
  }),
  getters: {
    getTabList(): ITagProps[] {
      return this.tabList;
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList);
    },
  },
  actions: {
    updateTabList(route: RouteLocationNormalized) {
      this.tagList.push(formatTag(route));
      if (!route.meta.ignoreCache) {
        this.cacheTabList.add(route.name as string);
      }
    },
    deleteTag(index: number, tag: ITagProps) {
      this.tabList.splice(index, 1);
      this.cacheTabList.delete(tag.name);
    },
  },
});

export default useTabBarStore;
