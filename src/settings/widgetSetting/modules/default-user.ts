import type { IWidgetConfig } from 'xframelib-taro';
import { LayoutContainerEnum } from 'xframelib-taro';

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IWidgetConfig> = [
    {
      layoutID: 'defaultLayout', //归属组
      id: 'userInfoWidget',
      label: '参观者信息',
      container: LayoutContainerEnum.right,
      component: () => import('@/wxpack/widgets/user/UserInfoWidget.vue'),
      preload: false,
    },
    {
      layoutID: 'defaultLayout', //归属组
      id: 'bookRecordWidget',
      label: '预约记录',
      container: LayoutContainerEnum.left,
      component: () => import('@/wxpack/widgets/user/BookRecordWidget.vue'),
      preload: false,
    },
    {
      layoutID: 'defaultLayout', //归属组
      id: 'recordItemDetailWidget',
      label: '预约记录-详情',
      container: LayoutContainerEnum.right,
      component: () => import('@/wxpack/widgets/user/RecordItemDetailWidget.vue'),
      preload: false,
    },
    {
      layoutID: 'defaultLayout', //归属组
      id: 'collectionListWidget',
      label: '收藏夹',
      container: LayoutContainerEnum.right,
      component: () => import('@/wxpack/widgets/user/CollectionListWidget.vue'),
      preload: false,
    },
];
export default defaultWidgetCofig;

