import {Ref} from 'vue';
/**
 * 系统整体的配置
 */
export interface ProjectConfig {
  //#region 窗体信息
  /** 设备像素比 */
  pixelRatio: number;
  /** 可使用窗口宽度，单位px */
  windowWidth: number;
  /** 可使用窗口高度，单位px */
  windowHeight: number;
  /** 状态栏的高度，单位px */
  statusBarHeight?: number;
  //#endregion

  //#region 头部导航栏
  //是否显示返回按钮
  showNavigationBarBack: boolean;
  //导航标题内容
  navigationBarTitle:string;
  //导航栏高度
  navigationBarHeight: number | string;
  //#endregion

  //底部栏的高度
  layoutBottomHeight: number;
  //跳转外部浏览链接
  iframeModalURL?:string;
  //首页加载导览进度（控制只首次加载）
  loadingGuide?:boolean;
}
