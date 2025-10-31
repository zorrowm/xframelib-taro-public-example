import type { ProjectConfig } from "@/models/IConfig";
const setting: ProjectConfig = {
  //#region 窗体信息,默认为iphone 12 pro
  pixelRatio: 460,
  /** 可使用窗口宽度，单位px */
  windowWidth: 390,
  /** 可使用窗口高度，单位px */
  windowHeight: 844,
  //#endregion

  //是否显示返回按钮
  showNavigationBarBack: true,
  //标题栏
  navigationBarTitle: '',
  // 导航栏高度
  navigationBarHeight: 70,

  // 是否显示底部信息 copyright
  //底部栏高度
  layoutBottomHeight: 80,
  //#endregion
  //加载显示引导页
  loadingGuide:true
};

export default setting;
