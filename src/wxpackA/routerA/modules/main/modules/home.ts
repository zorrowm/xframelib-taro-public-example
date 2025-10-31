const defaultRoutes = [
  {
    path: 'home',
    name:'home',
    component:() => import('@/wxpackA/views/test.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: "other",
    name: "other",
    component: () => import("@/wxpackA/views/other.vue"),
    meta: {
      title: '测试other',
    },
  },

  ];
  
  export default defaultRoutes;