<template>
  <div v-show="isShow" class="menuBarWidget">
    <WidgetMenuBar layoutID="bigScreenLayout" iconColor="#333" iconSize="50" />
  </div>
</template>

<script setup lang="ts">
import WidgetMenuBar from 'src/components/WidgetMenuBar/index.vue';
import { ref } from 'vue';
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
.menuBarWidget {
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: #b74c33;

  .menuBarItem {
    height:50px;
    line-height: 50px;
    img {
      width: 40px;
      height:40px;
      vertical-align: middle;
    }
  }

  .active {
    background-color: #00aaff !important;
  }
}
</style>
