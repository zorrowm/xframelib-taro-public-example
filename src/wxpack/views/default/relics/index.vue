<template>
  <!-- <button @click="loadRelic360Widget">文物360全景</button> -->
  <div class="relicViewer">
    <div class="viewerContainer">

      <div class="leftArrow">
        <svg-icon-web icon="ep:arrow-left-bold" :size="30" @click="handlePrev"></svg-icon-web>
      </div>
      <!-- <div class="viewer360"> -->
        <nut-swiper ref="swiperRef" class="viewer360" @change="handleChange">
      <nut-swiper-item v-for="(item, index) in swiperList" :key="index" class="imageItem">
        <image :src="getRightURL(item.url)" alt="" style="width: 100%" draggable="false" />
      </nut-swiper-item>
    </nut-swiper>

      <!-- </div> -->
      <div class="rightArrow">
        <svg-icon-web icon="ep:arrow-right-bold" :size="30" @click="handleNext"></svg-icon-web>
      </div>
      <div class="logo360" @click="loadRelic360Widget"></div>
    </div>
    <div class="relicTitle">
      {{ imgName }}
    </div>
    <div class="bottomScan">
      <div class="scanBtn" @click="doScanCode"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { appStore } from "@/stores";
import { Global,PathTourist } from "xframelib-taro";
import Taro from "@tarojs/taro";
import { getRightURL } from "@/utils/sysTool";

const appState = appStore();
onMounted(() => {
});

const swiperList = ref([
  { name: "清乾隆紫地粉彩八宝纹贲巴瓶1", url: '/assets/img/home/swiper1.jpg' },
  { name: "清乾隆紫地粉彩八宝纹贲巴瓶2", url: '/assets/img/home/swiper2.png' },
  { name: "清乾隆紫地粉彩八宝纹贲巴瓶3", url: '/assets/img/home/swiper3.jpg' },
  { name: "清乾隆紫地粉彩八宝纹贲巴瓶4", url: '/assets/img/home/swiper4.jpg' },
  { name: "清乾隆紫地粉彩八宝纹贲巴瓶5", url: '/assets/img/home/swiper5.jpg'},
]);
const swiperRef = ref()
const handlePrev = () => {
  swiperRef.value?.prev();
}
const handleNext = () => {
  swiperRef.value?.next();
}

const imgName = ref(swiperList.value[0].name);
function handleChange(idx) {
  imgName.value = swiperList.value[idx].name;
}

function loadRelic360Widget() {
  // Global.Message.info('文物360全景！');
  //relic360Widget
  PathTourist.toPage('/wxpackZ/pages/relicPanoWebPage')

}
function doScanCode()
{
// 只允许从相机扫码
Taro.scanCode({
  onlyFromCamera: true,
  success: (res) => {
    console.log('扫描结果',res);
    Global.Message.info(res.result);
  },
  fail:(res)=>{
    Global.Message.warn('扫码失败！');
  }
})
}
</script>
<style lang="scss">
.relicViewer {
  height: 100%;
  width: 100%;
  @include bgImage('/assets/img/relics/relicBg.png');
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .relicTitle
  {
    width:90%;
    height:40px;
    line-height:40px;
    text-align: center;
    font-size:28px;
    color:#fff;
  }
  .viewerContainer {
    width: 95%;
    height: 50%;
    display: flex;
    justify-content:space-around;
    align-items: center;
    position:relative;
    .viewer360 {
      flex-grow: 1;
      height: 100%;
      // background-color: #f00;

      .imageItem
      {
        height:100%;
        display:flex;
        align-items: center;
        justify-content: center;
      }
    }

    .logo360
    {
      position:absolute;
      right:-20px;
      top:-100px;
      width:100px;
      height:100px;
      @include bgImage('/assets/img/relics/360.png');
    }

  }

  .bottomScan {
    position: absolute;
    bottom: 8%;
    left: 0;
    right: 0;
    // background-color: #f00;
    display: flex;
    justify-content: center;
    .scanBtn
    {
      width:56px;
      height:56px;
      @include bgImage('/assets/img/relics/scan.png');
    }
    
  }


}
</style>
