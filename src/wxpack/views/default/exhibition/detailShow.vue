<template>
    <div class="detailShow">
        <div class="topShow">
            <image class="detailImage"
                src="https://mmbiz.qpic.cn/mmbiz/Aa1NMHlr2jPoKNKrh7G6t7kApbmkf5BL6Uo3IgRV7SOTAdIruTtxXgAYib1IIJGEKyOq89eI9zj9QzHbtChPUWQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1">
            </image>
            <div class="detailInfo" v-html="detailInfoRef"></div>
        </div>
        <div class="soundShow">
            <div class="titleBar">
                <div class="titleInfo">测试名称</div>
                <div @click="doChangeCollect"> <svg-icon-web icon="ant-design:heart-filled" size="30"
                        :style="collectStyle"></svg-icon-web></div>
            </div>
            <div class="soundPanel">
                <AudioPlayer src='https://zorrowm.github.io/weixin/taian/assets/img/test.mp3'></AudioPlayer>
            </div>
        </div>
        <div class="textShow">
            <SwipeUpdown class="soundBottom" @swipe="collapeTextPanel">
                <div>
                    <svg-icon-web v-if="!isShow" icon="ep:arrow-up" :size="24" class="text-gray"></svg-icon-web>
                    <svg-icon-web v-else icon="ep:arrow-down" :size="24" class="text-gray"></svg-icon-web>
                </div>
                <div class="text-#B74C33">{{ bottomInfo }}</div>
            </SwipeUpdown>
            <div class="textContent" v-if="isShow"></div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, computed,onMounted } from 'vue';
import AudioPlayer from '@/components/AudioPlayer.vue';
import SwipeUpdown from '@/components/SwipeUpdown.vue';
import { Global } from 'xframelib-taro';
import { useRoute } from 'vue-router';

const route=useRoute();
const detailInfoRef = ref("<p>高：21.7cm </p><p>口径：6.4cm </p><p>腹径：11cm </p>底径：5.9cm");
const textPanelHeight = ref('50px');
const isShow = ref(false);
function collapeTextPanel(e) {
    if (e === 1)//向上滑动
    {
        if (!isShow.value) {
            textPanelHeight.value = "100%";
            isShow.value = true;
        }
    }
    else {
        if (isShow.value) {
            textPanelHeight.value = "50px";
            isShow.value = false;
        }
    }
}
const bottomInfo = computed(() => {
    return isShow.value ? '下滑隐藏面板' : '上滑看文字讲解';
});
//是否被收藏了
const isCollect = ref(false);
const collectStyle = computed(() => {
    return isCollect.value ? "color:#f00" : "color:#aaa";
})
function doChangeCollect() {
    //TODO: 提交收藏处理
    isCollect.value = !isCollect.value;
}

onMounted(()=>{
    const pid=route.query.pid;
    // TODO:请求藏品详情

    console.log('文物链接参数:'+pid);
})
</script>

<style lang="scss">
.detailShow {
    position: relative;
    width: 100%;
    height: 100%;

    .topShow {
        position: relative;
        height: 60%;
        width: 100%;
        background-color: #B74C33;
        display: flex;
        align-items: center;
        justify-content: center;

        .detailImage {
            width: 100%;
        }

        .detailInfo {
            position: absolute;
            top: 5%;
            left: 5%;
            width: 300px;
            height: 300px;
            overflow: hidden;
            // background-color: #fff;
            color: #FFD37C
        }
    }

    .soundShow {
        height: 40%;
        width: 100%;
        border-radius: 20px;
        background-color: #F7F2EB;
        display: flex;
        flex-direction: column;
        align-items: center;

        .titleBar {
            height: 20%;
            width: 90%;
            // background-color: #ddd;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .titleInfo {
                font-size: 28px;
                font-weight: 550;
                color: #000;
            }
        }

        .soundPanel {
            flex: 1;
            display: flex;
            width: 80%;
            justify-content: center;
            align-items: center;
        }

    }

    .textShow {
        position: absolute;
        bottom: 0px;
        height: v-bind(textPanelHeight);
        background-color: #F7F2EB;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .soundBottom {
            width: 40%;
            font-size: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-items: center;
        }

        .textContent {
            flex: 1;
            overflow-y: auto;
            background-color: #ff0;
            width: 90%;
        }
    }
}
</style>