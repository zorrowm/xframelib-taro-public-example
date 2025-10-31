import { getRouteURL } from 'xframelib-taro';

const defaultRoutes = [
    {
      path: 'home-group',
      name:'homeGroup',
      meta: {
        title: '首页分组',
        index:20
      },  
    //   redirect: getRouteURL('about-us', '/default/home-group'),
      children:[
        {
            path: "about-us",
            name: "about-us",
            component: () => import("@/wxpack/views/default/home/about-us/index.vue"),
            meta: {
              title: '关于我们',
            },
        }, 
        {
            path: "activities-list",
            name: "activities-list",
            component: () => import("@/wxpack/views/default/home/activities-list/index.vue"),
            meta: {
              title: '馆内活动',
            },
        }, 
        {
          path: "activity-detail",
          name: "activity-detail",
          component: () => import("@/wxpack/views/default/home/activities-list/activityDetail.vue"),
          meta: {
            title: '馆内活动详情',
          },
        }, 
        {
          path: "activity-timepanel",
          name: "activity-timepanel",
          component: () => import("@/wxpack/views/default/home/activities-list/activityTimePanel.vue"),
          meta: {
            title: '馆内活动预定',
          },
        }, 
      {
            path: "book-visit",
            name: "book-visit",
            component: () => import("@/wxpack/views/default/home/book-visit/index.vue"),
            meta: {
              title: '参观预约',
            },
        }, 
        {
            path: "visit-list",
            name: "visit-list",
            component: () => import("@/wxpack/views/default/home/book-visit/visitorList.vue"),
            meta: {
              title: '添加参观者',
            },
        }, 
        {
          path: "visit-addUser",
          name: "visit-addUser",
          component: () => import("@/wxpack/views/default/home/book-visit/visitorAddUser.vue"),
          meta: {
            title: '添加新人',
          },
      }, 
        {
            path: "questions-list",
            name: "questions-list",
            component: () => import("@/wxpack/views/default/home/questions-list/index.vue"),
            meta: {
              title: '问卷调查',
            },
        }, 
        {
            path: "cultural-products",
            name: "cultural-products",
            component: () => import("@/wxpack/views/default/home/cultural-products/index.vue"),
            meta: {
              title: '文创产品',
            },
        }, 
      ]
    },
    {
      path: "detailShow",
      name: "detailShow",
      component: () => import("@/wxpack/views/default/exhibition/detailShow.vue"),
      meta: {
        title: '展品详情',
      },
     }, 
    ];
 export default defaultRoutes;