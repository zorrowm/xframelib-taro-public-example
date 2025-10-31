<template>
    <WidgetBackPanel :isBack="false" class="collectPanel">
        <template #content>
            <div class="grid-item" v-for="i in 20" :key="i">
                <div class="contentItem" @click="goDetailView(i)">  
                    <div class="topIcon">
                        <svg-icon-web icon="fxemoji:beating-heart" color="#f00" :size="40"></svg-icon-web>
                    </div>
                </div>
                <div class="item-bottom-title">   文物名称</div>
            </div>
        </template>
    </WidgetBackPanel>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted } from 'vue';
import WidgetBackPanel from '@/components/WidgetBackPanel.vue';
import { Global, PathTourist } from 'xframelib-taro';

function goDetailView(idx:number)
{
    if(Global.CurrentWidget)
    {
        const widgetID=Global.CurrentWidget.target.id;
        if(Global.CurrentWidget.layoutManager)
        {
            Global.CurrentWidget.layoutManager?.unloadWidget(widgetID);
        }
    }
    PathTourist.toView({ name:'detailShow', params: { pid:idx } });
}
onMounted(()=>{
})
onUnmounted(()=>{
})
</script>
<style lang="scss">
.collectPanel
{
    .panelContainer 
    {
        padding: 30px 0;
        display:flex;
        flex-wrap: wrap;
        gap:20px;
        justify-content:space-around;
        background-color: #fdf4ed;
    }

    .grid-item
    {
        width:45%;
        height:250px;
        background-color: #fff;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        gap:10px;
    }
    .contentItem
    {
        width:90%;
        @include bgImage('/assets/img//home/swiper4.jpg');
        background-size: contain;
        background-position: center;
        flex-grow: 1;
        border-radius: 10px;
        position:relative;
        .topIcon
        {
            position:absolute;
            right:-5px;
            top:-5px;
        }
    }
    .item-bottom-title
    {
        text-align: center;
        width: 100%;
        height:40px;
        line-height:40px;
        background: #FFD37C;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        color: #974E34;
        font-size:16px;
    }
}

</style>