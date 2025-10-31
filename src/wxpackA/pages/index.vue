<template>
    <div :style="appStyle" class="appContainer">
        <LayoutContainer :layoutID="layoutIDRef">
            <!-- <template #main>
                777777777777
            </template> -->
        </LayoutContainer>
    </div>
</template>

<script lang="ts" setup>
import { OffEventHandler, OnEventHandler } from 'src/events';
import { computed, onMounted, onUnmounted,ref } from 'vue';
import { Global,LayoutContainer, SysEvents } from 'xframelib-taro';
import WidgetsEvent from '@/events/modules/WidgetsEvent';
import { appStore } from '@/stores';
import routesArray from '../routerA/index';
import { PathTourist} from "xframelib-taro";

const appState = appStore();
const appStyle = computed(() => {
    const barHeight=appState.statusBarHeight??0;
    return `--window-height:${appState.windowHeight}px; --status-bar-height:${barHeight}px`;
});
const layoutIDRef = ref('branchALayout');

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
    const routes=routesArray;
    //初始化-视图路由
    PathTourist.initRoutes(routes,'/home');
    //统一捕捉处理Axios请求异常
    OnEventHandler(SysEvents.AxiosRequestErrorEvent, requestErrorHandler);
    OnEventHandler(WidgetsEvent.WidgetClosed, doUnloadWidgetHandler);
    // WebCacheTool.set('1', 'test1213132');
    // if(Global.CurrentRouteA)
    // {
    //     router.push({name:Global.CurrentRouteA})
    // }
});

onUnmounted(() => {
    OffEventHandler(SysEvents.AxiosRequestErrorEvent, requestErrorHandler);
    OffEventHandler(WidgetsEvent.WidgetClosed, doUnloadWidgetHandler);
})

</script>
<style lang="scss">
.appContainer {
    width: 100%;
    height: var(--window-height);
}
</style>