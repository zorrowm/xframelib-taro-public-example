<template>
    <div>
    这是分包A测试页——other
    <button  @click="doGobackA">去分包首页</button>
    <button  @click="doGoback">返回主包首页</button>
    </div>
</template>

<script setup lang="ts">
import { Global } from 'xframelib-taro';
import  { PathTourist } from 'xframelib-taro';

function doGoback()
{
    Global.CurrentRoute='user';
    PathTourist.toHome();
}

function doGobackA()
{
    PathTourist.toView({name:'home'});
}
</script>

<style scoped>

</style>