import type { IWidgetConfig } from 'xframelib-taro';
import { LayoutContainerEnum } from 'xframelib-taro';

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IWidgetConfig> = [
  {
    layoutID: 'mainLayout', //归属组
    id: 'FooterCopyrightWidget2',
    label: '底部栏',
    container: LayoutContainerEnum.bottom,
    component: () => import('@/wxpack/widgets/layouts/FooterCopyrightWidget.vue'),
    preload: true, //需要根据配置判断是否加载
  },
  {
    layoutID: 'mainLayout', //归属组
    id: 'ModalContainerWidget',
    label: '弹框容器',
    container: LayoutContainerEnum.top,
    component: () => import('@/wxpack/widgets/layouts/ModalContainerWidget.vue'),
    preload: true,
  },
];

export default defaultWidgetCofig;
