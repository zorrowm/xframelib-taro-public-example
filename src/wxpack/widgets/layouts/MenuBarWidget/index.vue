<template>
  <div :id="keyRef">
    <ChildMenuBar
      v-show="isShow"
      :menuData="childMenus"
      :layoutID="layoutIDRef"
      class="currentChildMenu"
    />
  </div>
</template>

<script setup lang="ts">
import './menuBarStyle.scss';

import ChildMenuBar from 'src/components/WidgetMenuBar/index.vue';
import MenuSettings from 'src/settings/widgetMenuSetting/index';
import { findMenuConfig } from 'src/widgets/WidgetUtils';
import { getCurrentInstance, onMounted, ref } from 'vue';
const childMenus = ref([]);
//修改以下变量 :key="keyRef"
const layoutIDRef = ref('');
const instance = getCurrentInstance();
const wid = instance?.proxy?.$options.id;
const layoutid = instance?.proxy?.$options.layoutID;
const keyRef = ref(wid);
onMounted(() => {
  layoutIDRef.value = layoutid;
  const targetMenu = findMenuConfig(MenuSettings, wid);
  if (targetMenu) {
    childMenus.value.push(...targetMenu.children);
  }
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
