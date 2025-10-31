<template>
    <div>
    这是分包A测试页
    <button  @click="doGoback">返回首页</button>
    <button  @click="doGoOther">去分包A的other页</button>
    </div>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { Global } from 'xframelib-taro';
import  { PathTourist } from 'xframelib-taro';


function doGoback()
{
    Global.CurrentRoute='user';
    PathTourist.toHome();
}

function doGoOther()
{
    PathTourist.toView({name:'other'});
}
</script>

<style scoped>

</style>