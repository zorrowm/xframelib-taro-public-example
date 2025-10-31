import type { RouteRecordRaw } from 'vue-router';
import { getRouteURL,recursiveRoutes } from 'xframelib-taro';

//@ts-ignore
const components = require.context('./modules',false,/\.ts$/);
const routesCofig: Array<RouteRecordRaw> =recursiveRoutes(components);



const defaultRoute: RouteRecordRaw = {
  path: '/main',
  name: 'mainLayout',
  component: () => import('@/layouts/main/index.vue'),
  meta: {
    title: 'MainLayout布局',
    keepAlive: true,
  },
  // redirect: getRouteURL(routesCofig[0]?.path, '/main'),
  // children: routesCofig,
};

export default defaultRoute;
