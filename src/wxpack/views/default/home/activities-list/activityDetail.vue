<template>
  <div class="activeDetail">
    <div class="detailContent">
      活动详情
    </div>
    <cultureButton text="点击报名" @click="doEnterName"></cultureButton> 
  </div>
</template>

<script setup lang="ts">
import cultureButton from '@/wxpack/components/culture-button.vue';

function doEnterName()
{
  
}
</script>

<style lang="scss">
.activeDetail {
  position: relative;
  height: 100%;
  background-color: #DC8C0A;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  align-items: center;


  .detailContent {
    flex-grow: 1;
    background-color: #eee;
    border-radius: 30px;
    width:80%;
    margin-top: 2%;
    padding:20px;
  }

}
</style>