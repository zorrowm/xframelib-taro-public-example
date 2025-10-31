<template>
  <view class="footerWidget">
    <div class="msginfo" >{{ statusInfo }}</div>
  </view>
</template>

<script lang="ts" setup>
import { OnStatusHandler } from 'src/events';

import {  onMounted, ref } from 'vue';
defineOptions({ name: 'FooterCopyrightWidget' });

const statusInfo = ref('提示：正在加载中……'); //提示：正在加载中……


onMounted(() => {
  //监听：全局提示信息
  OnStatusHandler((data:any) => {
    statusInfo.value = '提示：' + data;
  });
});
</script>

<style lang="scss">
.footerWidget {
  position: absolute;
  background-color:#f00;
  bottom: 0px;
  width: 100%;
  font-size: 12px;
  color: #ff0;
  height: 20px;
}
.msginfo {
  margin-left: 5px;
  // color: var(--footer-info-fontcolor);
  margin-top: -20px;
}

.copyright {
  position: relative;
  text-align: center;
  bottom: 0px;
}
</style>
