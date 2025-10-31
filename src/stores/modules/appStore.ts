import type { _DeepPartial } from "pinia";
import { defineStore } from "pinia";
import projectSetting from "src/settings/projectSetting";
import {Global, Storage } from "xframelib-taro";
import type { ProjectConfig } from "@/models/IConfig";

const PROJ_CONFIG_KEY = 'PROJ_SETTINGS_KEY';
const appStorage = new Storage('');

const defaultObj: ProjectConfig = {
  ...projectSetting,
};

//定义Store函数
const appStore = defineStore("app", {
  state: () =>{
    const cacheValue = appStorage.get(PROJ_CONFIG_KEY);
    const stateData = cacheValue||defaultObj;

    return stateData;
  },
  getters: {
    /**
     * 底部栏是否显示
     * @returns
     */
    isBottomVisible() {
      return !(this.bottomHeight === 0);
    }
  },
  actions: {
    /**
     * 修改导航标题
     * @param title
     */
    setNavigationTitle(title?: string) {
      if (title) {
        this.navigationBarTitle =title;
      } else {
        this.navigationBarTitle = Global.Config.SiteTitle;
      }
    },
    /**
     * 初始化,与局部修改
     * @param partialObj
     */
    setProjectConfig(partialObj: _DeepPartial<ProjectConfig>): void {
      if (partialObj) {
        this.$patch(partialObj);
        this.saveCacheStore();
      }
  
    },
    /**
     * 是否显示底部栏
     * @param isVisible
     */
    showLayoutBottom(isVisible: boolean) {
      if (isVisible) {
        this.$state.layoutBottomHeight =projectSetting.layoutBottomHeight;//默认值
      } else {
        this.$state.layoutBottomHeight = 0;
      }
    },
    //获取缓存
    getCacheStore() {
      let cacheValue = appStorage.get(PROJ_CONFIG_KEY);
      if (!cacheValue) cacheValue = defaultObj;
      return cacheValue;
    },
     //保存
    saveCacheStore() {
      appStorage.set(PROJ_CONFIG_KEY, this.$state);
    },
    /**
     * 清除
     */
    clear() {
      appStorage.remove(PROJ_CONFIG_KEY);
    },
  },
});
export { appStore };
