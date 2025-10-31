<template>
    <div class="widgetBackPanel">
        <div v-if="hasHeader">
            <slot name="leftbar">
                <nut-navbar :title="title" :left-show="isBack" @click-back="onBackClick">
                    <template #left>
                        <slot name="rightbar">
                            <svg-icon-web v-if="!isBack" icon="ep:close" size="30"  class="text-black"
                                @click="closeItem"></svg-icon-web>
                        </slot>
                    </template>
                </nut-navbar>
            </slot>
        </div>
        <div class="panelContainer">
            <slot name="content"></slot>
        </div>
        <slot name="footer"></slot>
    </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deepMerge, Global, LayoutManager, uuid } from 'xframelib-taro';
const props = defineProps({
    hasHeader: {
        type: Boolean,
        default: true,
    },
    isBack: {
        type: Boolean,
        default: true,
    }
});
let CurrentWidgetInfo: any;
const title = ref('测试一下');
let widgetID = '';
if (Global.CurrentWidget) {
    CurrentWidgetInfo = deepMerge(Global.CurrentWidget, {});
    title.value = CurrentWidgetInfo.target.label;
    widgetID = CurrentWidgetInfo.target.id;
}


const panelContentHeight=computed(()=>{

    return props.hasHeader?'calc(100% -  var(--nut-navbar-height))':'100%';
});

function closeItem() {
    if (CurrentWidgetInfo) {
        const isLoaded = (CurrentWidgetInfo.layoutManager as LayoutManager).isWidgetLoaded(widgetID);
        if (isLoaded) {
            CurrentWidgetInfo.layoutManager.unloadWidget(widgetID);
        }
    }
}
function onBackClick() {
    closeItem();
}
const router = useRouter();
const route = useRoute();
onMounted(() => {
    router.push({
        path: route.path,
        query: { id: uuid() }
    });
})
defineExpose({
    close: closeItem
})

</script>

<style lang="scss">
.widgetBackPanel {
    pointer-events: all;
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-items: stretch;

    .panelContainer {
        flex-grow: 1;
        width:100%;
        height:calc(100% -  45px);
        overflow-y:auto;
    }
}
</style>