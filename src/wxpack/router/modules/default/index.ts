import type { RouteRecordRaw } from 'vue-router';
import { getRouteURL,recursiveRoutes } from 'xframelib-taro';

//@ts-ignore
const components = require.context('./modules',false,/\.ts$/);
const routesCofig: Array<RouteRecordRaw> =recursiveRoutes(components);

const defaultRoute: RouteRecordRaw = {
  path: '/default',
  name: 'default',
  component:()=> import('@/layouts/default/index.vue'),
  meta: {
    title: '',
    keepAlive: true,
  },
  redirect: getRouteURL(routesCofig[0]?.path, '/default'),
  children: routesCofig,
};

export default defaultRoute;
