import "xframelib-taro/dist/index.css";
import type { App } from "vue";
import { getRightWidgetConfig } from "src/permission";
import { message } from "src/utils/MessageNotify";
//封装的消息提示
import { init, SvgIconWeb } from "xframelib-taro";
import "../assets/SysConfig.js";
//UnoCSS 必须得有
// import "uno.css";

export default function initBoot(app: App) {
  //初始化Xframelib
  //系统ID,唯一标识
  const sysID = SysConfig.SystemID;
  //初始化
  init(SysConfig, message, sysID);

  //免登录或只登录不验证功能
  getRightWidgetConfig();

  //注册全局组件
  app.component("svg-icon-web", SvgIconWeb);

  // console.log('环境变量', process.env);
  // //绑定全局变量，需参考链接：https://blog.csdn.net/m0_51223745/article/details/133993048
  // //保存网站根地址
  // app.config.globalProperties.$AppURL = process.env.APP_URL;
  // app.provide('$AppURL', process.env.APP_URL);
}
