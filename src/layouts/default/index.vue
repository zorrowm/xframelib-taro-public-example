<template>
  <LayoutContainer :layoutID="layoutIDRef" @containerLoaded="loadedHandler">
    <template #top>
      <TopNaviBar></TopNaviBar>
    </template>
    <template #right>
      <div class="guide-video" v-if="showVideoGuideRef">
        <video 
            class="guide-video"
            :src="guideVideoUrl"
            :autoplay="true"
            :muted="true"
            loop
          ></video>
          <div class="overButton" @click="doCloseVideo">跳过</div>
      </div>
    </template>
  </LayoutContainer>
</template>

<script lang="ts" setup>
import { computed,onMounted,ref } from 'vue';
import {Global,LayoutContainer } from 'xframelib-taro';
import TopNaviBar from '@/components/TopNaviBar.vue';
import { appStore } from '@/stores';
import { getRightURL } from '@/utils/sysTool';
const appState = appStore();
// const showVideoGuideRef=ref(true);
const guideVideoUrl=ref(getRightURL('/assets/img/video-guide.mp4'));
const layoutIDRef = ref('defaultLayout');
const bottomHeightRef=computed(()=>{
  return appState.layoutBottomHeight+"px";
});

const showVideoGuideRef=computed(()=>{
  if(appState.loadingGuide===false)
  return false;
return true;
})
//获取服务此Layout的layoutManager
function loadedHandler(evt: any) {
  Global.LayoutManager=evt.layoutManager;
}
function doCloseVideo()
{
  // console.log('0000000000')
  appState.setProjectConfig({
    loadingGuide:false
  });
  // console.log('1111111111',appState.loadingGuide)

}

onMounted(() => {
});
</script>
<style lang="scss">
#defaultLayout
{
  --layout-bottom-height:v-bind(bottomHeightRef);
}
.guide-video
{
  width:100%;
  height:100%;
  position: relative;
  background-color: #fff;
}
.overButton
  {
    position:absolute;
    top: 80px;
    right:80px;
    width:60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color:#fff;
    font-size: 30px;
  }
</style>

