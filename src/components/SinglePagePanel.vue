<template>
    <div :style="pageStyle" class="singlePage">
        <slot name="top">

            <nut-navbar :title="props.title" :left-show="true" @click="handleBack">
            </nut-navbar>

        </slot>
        <slot name="default"></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Taro from '@tarojs/taro';
import { PathTourist } from "xframelib-taro";

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})

// 获取窗口信息
const { windowHeight, statusBarHeight } = Taro.getWindowInfo();
const pageStyle = computed(() => {
    return `--window-height:${windowHeight}px;--status-bar-height:${statusBarHeight}px;height:${windowHeight}px;margin-top:${statusBarHeight}px;`;
});

// 处理返回逻辑
const handleBack = () => {
    //后退——浏览历史记录
    PathTourist.toBackPage();
}

</script>

<style lang="scss">
.singlePage {
    position: relative;
    width: 100%;
}
</style>