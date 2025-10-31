import type { IWidgetConfig } from 'xframelib-taro';
import { LayoutContainerEnum } from 'xframelib-taro';

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IWidgetConfig> = [
    {
      layoutID: 'defaultLayout', //归属组
      id: 'ModalContainerWidget',
      label: '弹框容器',
      container: LayoutContainerEnum.top,
      component: () => import('@/wxpack/widgets/layouts/ModalContainerWidget.vue'),
      preload: true,
    },
    {
      layoutID: 'defaultLayout', //归属组
      id: 'tabbarMenuWidget',
      label: '底部菜单栏',
      container: LayoutContainerEnum.bottom,
      component: () => import('@/wxpack/widgets/layouts/MenuBarWidget/TabbarMenuWidget.vue'),
      preload: true,
    },
    // {
    //   layoutID: 'defaultLayout', //归属组
    //   id: 'WebviewContainerWidget',
    //   label: 'IFrame外部浏览',
    //   container: LayoutContainerEnum.centerFront,
    //   component: () => import('@/wxpack/widgets/layouts/WebviewContainerWidget.vue'),
    //   preload: false,
    // },
];
export default defaultWidgetCofig;

