<template>
  <SinglePagePanel >
    <div class="page404" >
    <img :src="pic404"></img>
    <h4>当前页面不存在...</h4>
    <button @click="goback">返回前一页</button>
    </div>

  </SinglePagePanel>

  </template>
  
  <script lang="ts" setup>
  import SinglePagePanel from '@/components/SinglePagePanel.vue';
  import { PathTourist} from "xframelib-taro";
   import {ref} from 'vue';
   import { getRightURL } from "@/utils/sysTool";
   
  const pic404=ref(getRightURL("/assets/img/404.gif"));
  function goback()
  {
    PathTourist.toBackPage();
  }
  
  </script>
  
  <style lang="scss">
  .page404{
    height:100%;
    width:100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    // background-color: white;
  }
  </style>
  