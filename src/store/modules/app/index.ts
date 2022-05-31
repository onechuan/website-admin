import { defineStore } from 'pinia';
import defaultSettings from '@/config/settings.json';
import { RouteRecordNormalized } from 'vue-router';
import { IAppState } from './types';

const useAppStore = defineStore('app', {
  state: (): IAppState => ({ ...defaultSettings }),
  getters: {
    appCurrentSetting(state: IAppState): IAppState {
      return { ...state };
    },
    appDevice(state: IAppState) {
      return state.device;
    },
    appServerMenuConfig(state: IAppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    },
  },
  actions: {
    // Update app settings
    updateSettings(partial: Partial<IAppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },
    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('oc-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('oc-theme');
      }
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
  },
});

export default useAppStore;
