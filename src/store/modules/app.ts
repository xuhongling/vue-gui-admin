import type { ProjectConfig, MenuSetting } from '/#/config';

import { defineStore } from 'pinia';
import { store } from '/@/store';

import { PermissionModeEnum } from '/@/enums/appEnum';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { resetRouter } from '/@/router';
import { storage } from '/@/utils/storage';
import { deepMerge } from '/@/utils';

// menu theme enum
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading?: boolean;
  // project config
  projectConfig: ProjectConfig | null;
}

let timeId: TimeoutHandle;
// 系统默认配置，修改默认参数需要清除浏览器缓存
export const defaultConfig: ProjectConfig = {
  // 权限模式，默认前端角色权限模式
  // ROUTE_MAPPING: 前端模式（菜单由路由生成，默认）
  // ROLE：前端模式（菜单路由分开）
  // BACK: 后台模式，动态获取
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  menuSetting: {
    collapsed: false,
    split: true,
  },
};

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: storage.getLocal(PROJ_CFG_KEY) ? storage.getLocal(PROJ_CFG_KEY) : defaultConfig,
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || 'light';
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      storage.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
    async resetAllState() {
      resetRouter();
      storage.clearAll();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
