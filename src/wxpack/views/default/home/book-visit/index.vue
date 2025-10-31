<template>
    <div>
        <nut-swiper :init-page="1" :auto-play="3000" pagination-visible pagination-color="#eee"
            pagination-unselected-color="#808080">
            <nut-swiper-item v-for="(item, index) in swiperList" :key="index" style="height:350px">
                <image :src="getRightURL(item.url)" alt="" class="swiperImg" draggable="false" />
            </nut-swiper-item>
        </nut-swiper>

        <div class="flex flex-row align-middle justify-around my-20px">
            <div class="partPanel personPart" @click="gotoMeiTuan">
                岱庙门票
            </div>
            <div class="partPanel teamPart" @click="handlePush('visit-list')">
                天贶殿
            </div>
        </div>

        <div class="bottomTicketInfo bg-#FFD37C rounded-md flex items-center">
            <div>
                <div class="titleLine">参观须知</div>
                <div class="mt-5">
                    1. 门票价格：20元/人（需凭有效证件购票入园，优惠政策以景区公示为准）；
                </div>
                <div class="mt-5">
                    2. 天贶殿参观要求：进入天贶殿需佩戴鞋套，游客可自备，也可在景区现场购买，售价3元/套。
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { appStore } from "@/stores";
import { Global } from "xframelib-taro";
import { getRightURL } from "@/utils/sysTool";
import Taro from "@tarojs/taro";

const appState = appStore();
const swiperList = [
    { name: "图片一", url: "/assets/img/home/bookVisitbg.png" },
    { name: "图片二", url: '/assets/img/home/swiper2.png' },
    { name: "图片三", url: '/assets/img/home/swiper3.jpg' },
    { name: "图片四", url: '/assets/img/home/swiper4.jpg' },
    { name: "图片五", url: '/assets/img/home/swiper5.jpg' },
];

function gotoMeiTuan() {
    Taro.navigateToMiniProgram({
        appId: 'wxde8ac0a21135c07d', // 美团小程序的AppID
        path: 'ticket/mpvue-pages/pages/poi/poi.html?poiId=1268385', //岱庙地址
        extraData: {
            // 可以传递一些额外数据，但需美团小程序支持接收
        },
        envVersion: 'trial',
        success: function (res) {
            // 打开成功
            console.log('打开成功！')
        },
        fail(err) {
            // 跳转失败
            console.error('跳转失败:', err);
        }
    });
}

onMounted(() => {
})
onUnmounted(() => {

})
function handlePush(url) {
    appState.showLayoutBottom(false);
    Global.Router?.push({ name: url });
}
</script>

<style lang="scss">
.partPanel {
    width: 44%;
    height: 280px;
    border-radius: 9px;
    opacity: 1;
    background: #FFD37C;
    margin-left: 3%;
    margin-right: 3%;

    font-family: MicrosoftYaHei;
    font-size: 30px;
    color: #46735F;
    padding-left: 50px;
    line-height: 280px;
    font-weight: 550;
    letter-spacing: 2px;
}

.personPart {
    @include bgImage('/assets/img/home/personbg.png');
    // background-image: v-bind(personBG);
    // background-repeat: no-repeat;
    /* 禁止重复 */
    background-position: 140% top;
    background-size: auto 110%;
}

.teamPart {
    @include bgImage('/assets/img/home/teambg.png');
    // background-image: v-bind(teamBG);
    // background-repeat: no-repeat;
    background-position: 280% 30%;
    background-size: 80% auto;

}

.bottomTicketInfo {
    height: 300px;
    margin-top: 6%;
    margin-left: 3%;
    margin-right: 3%;
    font-size: 28px;
    padding-left: 20px;
    padding-right: 20px;

    .titleLine {
        font-size: 35px;
        font-weight: 550;
        letter-spacing: 2px;
        margin: 10px 0;
    }
}
</style>