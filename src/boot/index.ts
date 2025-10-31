import type { App } from "vue";
import setupStore from "@/stores";
import { initRouter } from "./initRouter";
import initXframe from "./initXframe";

export default function initBoot(app: App) {
 //1、挂载stores
  setupStore(app);
  //2、初始化框架库
  initXframe(app);
  //3、挂载路由
  initRouter(app);
}
