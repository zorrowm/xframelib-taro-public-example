<template>
  <ul class="menuBar">
    <li v-for="(item, idx) in menuData" :key="idx" :class="getClass(item)" @click="itemClick(item)">
      <svg-icon-web v-if="item.icon" :icon="item.icon" class="iconSizeStyle" />
      <image v-else-if="item.img" class="item-img" :src="getImageURL(item)" />
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
// import * as ActionTool from 'src/actions';
import { OffEventHandler, OnEventHandler } from 'src/events/index';
import MenuSettings from 'src/settings/widgetMenuSetting/index';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { IWidgetMenu, LayoutManager } from 'xframelib-taro';
import { Global, MenuItemEnum, SysEvents } from 'xframelib-taro';
import { getRightURL } from "@/utils/sysTool";

const props = defineProps({
  layoutID: {
    type: String,
    default: 'default',
  },
  menuData: {
    type: Array<IWidgetMenu>,
    default: MenuSettings,
  },
  itemSize: {
    type: String,
    default: '50px',
  },
  selectedItem: {
    type: String,
    default: '',
  }
});
const itemLength = ref(MenuSettings.length);
const router = useRouter();
const selectedMapList = new Map<string, boolean>();
const selectedMap = ref<Map<string, boolean>>(selectedMapList);
function itemClick(menuItem: IWidgetMenu) {
  switch (menuItem.type) {
    case MenuItemEnum.URL:
      window.open(menuItem.path, '_blank');
      break;
    case MenuItemEnum.Route:
      if (menuItem.blank) {
        if (menuItem.path) {
          const routeData = router.resolve({
            path: menuItem.path,
          });
          window.open(routeData.href, '_blank'); //新标签打开
        }
      } else {
        if (menuItem.path) {
          router.push({ path: menuItem.path }); //本地跳转
          selectedMap.value.clear();
          //保存当前记录
          selectedMap.value.set(menuItem.name, true);
        }
      }
      break;
    case MenuItemEnum.Action:
      const method = menuItem.path;
      // if (method && ActionTool[method]) {
      //   ActionTool[method](menuItem);
      //   if (menuItem.selected != undefined) {
      //     menuItem.selected = !menuItem.selected;
      //     //保存当前记录
      //     selectedMap.value.set(menuItem.name, menuItem.selected);
      //   }
      // }
      break;
    case MenuItemEnum.Widget:
      if (menuItem.path) {
        const layoutManager = Global.LayoutMap.get(props.layoutID);
        if (!layoutManager) {
          Global.Message.warn(`LayoutID:${props.layoutID}的Manager不存在`);
          return;
        }
        //控制加载或可见性
        controlMenuWidget(layoutManager, menuItem);
        menuItem.selected = !menuItem.selected;
        //保存当前记录
        selectedMap.value.set(menuItem.name, menuItem.selected);
      } else {
        Global.Message.warn(`加载${menuItem.name} Widget:缺少WidgetID!`);
      }
      break;
  }
}
function controlMenuWidget(layoutManager: LayoutManager, menuItem: IWidgetMenu) {
  if (!menuItem.path) return;
  if (!menuItem.selected) {
    const isExist = layoutManager.isWidgetLoaded(menuItem.path);
    if (!isExist) {
      layoutManager.loadWidget(menuItem.path);
      console.log('加载Widget：' + menuItem.path);
      
    } else {
      console.log('显示widget: ' + menuItem.path);
      layoutManager.changeWidgetVisible(menuItem.path, true);
    }
  } else {
    if (menuItem.unload) {
      console.log('卸载widget: ' + menuItem.path);
      layoutManager.unloadWidget(menuItem.path);
    } else {
      console.log('隐藏widget: ' + menuItem.path);
      layoutManager.changeWidgetVisible(menuItem.path, false);
    }
    //联动修改子菜单
    if (menuItem.children) {
      menuItem.children.forEach((childItem) => {
        if (childItem.selected) {
          console.log(`递归控制${menuItem.path}的子Widget:` + childItem.path);
          controlMenuWidget(layoutManager, childItem);
          childItem.selected = !childItem.selected;
        }
      });
    }
  }
}

function getClass(item: IWidgetMenu) {
  if (item.img)
    return 'menuBarItem';
  if (selectedMap.value?.has(item.name) && selectedMap.value.get(item.name)) {
    return 'menuBarItem active';
  } else {
    return 'menuBarItem';
  }
}

function getImageURL(item: IWidgetMenu) {
  if (selectedMap.value?.has(item.name) && selectedMap.value.get(item.name)) {
    return getRightURL(item.imgActive);
  } else {
    return getRightURL(item.img);
  }
}

function unloadWidgetHandler(evt) {
  if (evt.layoutID === props.layoutID) {
    const widgetID = evt.widgetID;
    const target = props.menuData.find((item) => {
      return item.type === 0 && item.path === widgetID && item.unload != false;
    });
    if (target) {
      target.selected = false;
      //保存当前记录
      selectedMap.value.delete(target.name);
    }
  }
}
watch(() => props.selectedItem, value => {

  selectedMap.value.clear();
  if (value)
    selectedMap.value.set(value, true);
}, {
  immediate: true
})
onMounted(() => {
  OnEventHandler(SysEvents.WidgetUnLoadedEvent, unloadWidgetHandler);
});

onUnmounted(() => {
  OffEventHandler(SysEvents.WidgetUnLoadedEvent, unloadWidgetHandler);
});
</script>

<style lang="scss">
.menuBar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  .menuBarItem {
    font-size: 24px;
    padding: 2px;
    height: v-bind(itemSize);
    .iconSizeStyle,.item-img {
      width:60px;
      height:60px;
      color: #aaa;
    }
  }
}

.active {
  background-color: #ddd;
}
</style>
