<template>
    <web-view v-if="appState.iframeModalURL" class="newsView" :src="appState.iframeModalURL">
        <!-- <cover-view className="close-btn" @tap="doClose">
              <cover-image :src="backBgRef" />
        </cover-view> -->
    </web-view>



</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { appStore } from '@/stores';
// import TopNaviBar from '@/components/TopNaviBar.vue';
import { Global } from 'xframelib-taro';
// import Taro from '@tarojs/taro';

// const backBgRef = ref(Global.getResourceURL('./assets/img/back_icon.png'));
const appState = appStore();

onMounted(() => {
    // Taro.hideHomeButton();
    // // 动态修改背景色和文字颜色
    // Taro.setNavigationBarColor({
    // //   frontColor: 'white', // 文字颜色（仅支持 black/white）
    //   backgroundColor: '#ff0000', // 背景色
    // //   animation: {
    // //     duration: 400,
    // //     timingFunc: 'easeIn'
    // //   }
    // })
    // .then(p=>{
    //     showPanel.value=true;
    //     console.log('88888888888')
    // })
})
onUnmounted(() => {
    appState.iframeModalURL = undefined;
})
// function doClose()
// {

// }
</script>
<style lang="scss">

.close-btn {
    position: fixed;
    top: 40rpx;
    left: 20rpx;
    z-index: 999;
    width: 60rpx;
    height: 60rpx;
    background-color: #f00;
    color: #fff;
}

.close-btn image {
    width: 100%;
    height: 100%;
}
</style>