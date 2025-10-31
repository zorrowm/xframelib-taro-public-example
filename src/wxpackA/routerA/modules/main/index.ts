import type { RouteRecordRaw } from 'vue-router';
import { getRouteURL,recursiveRoutes } from 'xframelib-taro';

//@ts-ignore
const components = require.context('./modules',false,/\.ts$/);
const routesCofig: Array<RouteRecordRaw> =recursiveRoutes(components);

const defaultRoute: RouteRecordRaw = {
  path: '/main',
  name: '默认首页',
  component:()=> import('@/layouts/branchA/index.vue'),
  meta: {
    title: '',
    keepAlive: true,
  },
  redirect: getRouteURL(routesCofig[0]?.path, '/main'),
  children: routesCofig,
};

export default defaultRoute;
