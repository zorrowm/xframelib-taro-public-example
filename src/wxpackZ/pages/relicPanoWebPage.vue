<template>
    <web-view  class="paroView" :src="paroURL">
    </web-view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Global } from 'xframelib-taro';

const paroURL=ref(Global.Config.ServiceURL.ParoURL);
onMounted(() => {
    Global.BackRouteView={
        name:'relics'
    };
    // setTimeout(()=>{
    //     Taro.setNavigationBarTitle({
    //     title:'全景图导览'
    // });
    // },2000);
})
onUnmounted(() => {
})
</script>
