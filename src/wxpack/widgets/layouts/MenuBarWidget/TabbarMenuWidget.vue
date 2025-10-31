<template>
    <div :id="keyRef" class="defaultTabbarMenu">
        <DefaultTabMenuBar v-show="isShow" :menuData="childMenus" :layoutID="layoutIDRef"
            :selectedItem="selectedItem" />
    </div>
</template>

<script setup lang="ts">
import DefaultTabMenuBar from 'src/components/WidgetMenuBar/index.vue';
import { getCurrentInstance, onMounted, ref,watch } from 'vue';
import DefaultBarMenuSettings from 'src/settings/widgetMenuSetting/defaultBarMenu';
import { useRoute } from 'vue-router';
const childMenus = ref(DefaultBarMenuSettings);
const layoutIDRef = ref('');
const instance = getCurrentInstance();
const wid = instance?.proxy?.$options.id;
const layoutid = instance?.proxy?.$options.layoutID;
const keyRef = ref(wid);

const route = useRoute();
const selectedItem = ref("首页")

function init()
{   
     for (let i = 0; i < DefaultBarMenuSettings.length; i++) {
        const tmpMenuItem = DefaultBarMenuSettings[i];
        if (tmpMenuItem.path === route.path) {
            selectedItem.value = tmpMenuItem.name;
            break;
        }
    }

}

watch(()=>route.path,value=>{
    if(value)
    init();
})

onMounted(() => {
    layoutIDRef.value = layoutid;
    init();

});

/**
 * 对外暴露接口
 */
const isShow = ref(true);
function changeVisible(isVisible: boolean = false) {
    isShow.value = isVisible;
}
defineExpose({ changeVisible, isShow });
</script>

<style lang="scss">
.defaultTabbarMenu {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #b74c33;

    .menuBar {
        .menuBarItem {
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            color: #eee;
            font-weight: 600;
            .item-img {
                width:60px;
                height:60px;
                margin-bottom:10px;
            }
        }

    }
    .active {
        background-color: #00aaff !important;
    }
}
</style>