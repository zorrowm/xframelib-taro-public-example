import type { RouteRecordRaw } from 'vue-router';

//#region ******************下面为主包的 业务视图路由*************************
const routesArray: Array<RouteRecordRaw> = [];
      //@ts-ignore
      const components = require.context('./modules',true,/index.ts$/);
      if(components)
      components.keys().forEach((path) => {
        const comp = components(path).default as any;
        routesArray.push(comp);
      });
//#endregion
export default routesArray;
