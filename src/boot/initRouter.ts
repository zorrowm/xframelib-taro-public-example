import { asyncRouteStore, appStore } from "src/stores";
import type { Router } from "vue-router";
import { Global } from "xframelib-taro";
import { PathTourist} from "xframelib-taro";
import { createRouter, createMemoryHistory } from 'vue-router';
import type { App } from 'vue';


//#region 定义全局的路由守卫

let appState: any;
function createRouterGuards(router: Router) {
  // let toPath = "";
  // router.beforeEach((to, from, next) => {
  //   const toName = to.name as string;
  //   toPath = to.path;
  // });
  router.afterEach((to: any, from, failure) => {
    if (!appState) appState = appStore();
    //设置网页Title
    appState.setNavigationTitle(to.meta.title);

    // 维护路由历史栈（存储访问过的路由path）
    const historyStack = PathTourist.routeHistoryStack;
    const historyCount = historyStack.length;
    if (historyCount === 0) historyStack.push(to.name);
    else if (historyStack[historyCount - 1] !== to.name) {
      // 避免重复添加相同路由（如同一页面刷新）
      historyStack.push(to.name);
    }

    // 在这里设置需要缓存的组件名称
    // const keepAliveComponents = asyncRouteStoreState.keepAliveComponents;
    // const currentComName = to.matched.find((item) => item.name == to.name)
    //   ?.components?.default.name;
    // if (
    //   currentComName &&
    //   !keepAliveComponents?.includes(currentComName) &&
    //   to.meta?.keepAlive
    // ) {
    //   // 需要缓存的组件
    //   keepAliveComponents.push(currentComName);
    // } else if (!to.meta?.keepAlive || to.name == "Redirect") {
    //   // 不需要缓存的组件
    //   const index = asyncRouteStoreState.keepAliveComponents.findIndex(
    //     (name) => name == currentComName
    //   );
    //   if (index != -1) {
    //     keepAliveComponents?.splice(index, 1);
    //   }
    // }
  });

  router.onError((error) => {
    console.debug(error, "路由错误");
    Global.Message.warn("加载视图错误:" + error.message);
  });
}

//#endregion

//#region 全局路由对象的初始化，安装
const router = createRouter({
  routes: [],
  history: createMemoryHistory(),
});
//路由安装
export function initRouter(app: App){
  createRouterGuards(router);
  app.use(router);
  //绑定全局Router
  Global.Router=router;
};
export default router;
//#endregion