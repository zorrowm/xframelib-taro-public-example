<template>
  <view class="webview-container">
        <web-view  v-if="appState.iframeModalURL" :src="appState.iframeModalURL" @load="doLoadView" >  
      <cover-view v-if="showBackPanel" className="close-btn" @tap="doClose">
            <cover-view>关闭</cover-view>
            <!-- <cover-image :src="backBgRef" /> -->
          </cover-view>
      </web-view>

    </view>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted,ref } from 'vue';
import { appStore } from '@/stores';
const appState=appStore();
const showBackPanel=ref(false);
onMounted(()=>{

})
onUnmounted(()=>{
    appState.iframeModalURL=undefined;
})
function doClose()
{

}
function doLoadView()
{
  showBackPanel.value=true;
  console.log('88888888888')
}
</script>
<style lang="scss">
.webview-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.close-btn {
  position: fixed;
  top: 30rpx;
  right: 30rpx;
  z-index: 9999;
  width: 60rpx;
  height: 60rpx;
  background-color: #f00;
  color:#fff;
}

.close-btn image {
  width: 100%;
  height: 100%;
}
</style>