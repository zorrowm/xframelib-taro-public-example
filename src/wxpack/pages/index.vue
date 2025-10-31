<template>
    <view :style="appStyle" class="appContainer">
        <router-view></router-view>
    </view>

</template>

<script lang="ts" setup>
import { OffEventHandler, OnEventHandler } from 'src/events';
import { computed, onMounted, onUnmounted } from 'vue';
import { Global, SysEvents } from 'xframelib-taro';
import WidgetsEvent from '@/events/modules/WidgetsEvent';
import Taro from '@tarojs/taro';
import { appStore } from '@/stores';
import routesArray from '../router/index';
import  { PathTourist } from 'xframelib-taro';


// 获取窗口信息
const { pixelRatio, windowWidth, windowHeight, statusBarHeight } = Taro.getWindowInfo();


const appStyle = computed(() => {
    return `--window-height:${windowHeight}px; --status-bar-height:${statusBarHeight}px`;
});

function requestErrorHandler(errData: any) {
    if (!errData.isExceptionInfo) {
        const errInfo = `${errData.message}\n$${errData.result}`;
        Global.Message.warn(errInfo);
    }
    console.warn(errData, '请求错误');
}
/**
    * 统一卸载Widget
    * @param widgetID
    */
function doUnloadWidgetHandler(widgetID: string) {
    if (widgetID) {
        const currentLayoutManager = Global.getLayoutManager(widgetID);
        if (currentLayoutManager) {
            currentLayoutManager.unloadWidget(widgetID);
        }
    }
}

onMounted(() => {
    const routes = routesArray;
    //初始化-视图路由
    PathTourist.initRoutes(routes, '/default');

    const appState = appStore();
    appState.$patch({
        pixelRatio, windowWidth, windowHeight, statusBarHeight, navigationBarTitle: Global.Config.SiteTitle
    });

    //统一捕捉处理Axios请求异常
    OnEventHandler(SysEvents.AxiosRequestErrorEvent, requestErrorHandler);
    OnEventHandler(WidgetsEvent.WidgetClosed, doUnloadWidgetHandler);
    // WebCacheTool.set('1', 'test1213132');
    //去上次的页面
    PathTourist.toInitView();
});

onUnmounted(() => {
    OffEventHandler(SysEvents.AxiosRequestErrorEvent, requestErrorHandler);
    OffEventHandler(WidgetsEvent.WidgetClosed, doUnloadWidgetHandler);
})

</script>