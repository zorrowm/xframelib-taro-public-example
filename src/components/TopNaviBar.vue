<template>
  <div class="custom-navbar">
    <nut-navbar :title="appState.navigationBarTitle" :left-show="false" >
                    <template #left>
                        <slot name="leftbar">
                            <svg-icon-web v-if="appState.showNavigationBarBack&&!appState.showNavigationBarHome" icon="ep:arrow-left-bold" size="25"  class="text-black"
                                @click="handleBack"></svg-icon-web>
                            <svg-icon-web v-else-if="appState.showNavigationBarHome" icon="ep:home-filled" size="25"  class="text-black"
                                @click="handleGoHome"></svg-icon-web>
                        </slot>
                    </template>
    </nut-navbar>
  </div>
</template>

<script setup lang="ts">
import { appStore } from '@/stores';
import { PathTourist} from "xframelib-taro";

const appState = appStore();
// 处理返回逻辑
const handleBack = () => {
  appState.showLayoutBottom(true);
  //后退——浏览历史记录
  PathTourist.toBackView();
}
function handleGoHome()
{
  appState.showLayoutBottom(true);
  PathTourist.routeHistoryStack.length=0;
  //后退——浏览历史记录
  PathTourist.toHome();
}
</script>

<style lang="scss">
.custom-navbar
{
  .title
  {
    font-size:32px;
    color:#111;
    letter-spacing: 2px;
  }
}
</style>