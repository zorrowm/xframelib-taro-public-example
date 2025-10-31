const defaultRoutes = [
  {
    path: 'home',
    name:'home',
    component:() => import('@/wxpack/views/default/home/index.vue'),
    meta: {
      title: '',
      index:1
    },
  },
  {
    path: "exhibit",
    name: "exhibit",
    component: () => import("@/wxpack/views/default/exhibition/index.vue"),
    meta: {
      title: '数字展品',
    },
  },
  {
    path: "relics",
    name: "relics",
    component: () => import("@/wxpack/views/default/relics/index.vue"),
    meta: {
      title: '文物讲解',
    },
  },
  {
    path: "user",
    name: "user",
    component: () => import("@/wxpack/views/default/user/index.vue"),
    meta: {
      title: '个人中心',
    },
  },
  ];
  
  export default defaultRoutes;