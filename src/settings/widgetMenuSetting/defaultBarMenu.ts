import type { IWidgetMenu } from 'xframelib-taro';
import { MenuItemEnum } from 'xframelib-taro';

const menuCofig: Array<IWidgetMenu> = [
  {
    name: '首页',
    index: 1,
    img: "/assets/img/tab/tab_home.png",
    imgActive: "/assets/img/tab/tab_home_active.png",
    path: '/default',
    type: MenuItemEnum.Route,
  },
  {
    name: '数字展陈',
    index: 2,
    img: "/assets/img/tab/tab_exhibition.png",
    imgActive: "/assets/img/tab/tab_exhibition_active.png",
    path: '/default/exhibit',
    type: MenuItemEnum.Route,
  },
  {
    name: "文物讲解",
    index: 3,
    img: "/assets/img/tab/tab_relics.png",
    imgActive: "/assets/img/tab/tab_relics_active.png",
    path: '/default/relics',
    type: MenuItemEnum.Route,
  },
  {
    name: "个人中心",
    index: 4,
    img: "/assets/img/tab/tab_user.png",
    imgActive: "/assets/img/tab/tab_user_active.png",
    path: '/default/user',
    type: MenuItemEnum.Route,
  },
];

export default menuCofig;
