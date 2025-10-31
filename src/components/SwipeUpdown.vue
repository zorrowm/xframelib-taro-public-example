<template>
    <!-- 上滑、下滑手势操作组件 -->
    <div
    @touchstart="onTouchStart"  
    @touchmove="onTouchMove"     
    >
    <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit=defineEmits(['swipe']);
// 触摸起点 Y 坐标
const startY = ref(0)
// 滑动阈值（过滤轻微触摸，避免误判）
const threshold = 30  // 单位：px
//当前：滑动状态，0为初始值  1已经上滑  -1已经下滑了
let swipeState=0;
// 触摸开始：记录起点
const onTouchStart = (e) => {
  // 取第一个触摸点的 Y 坐标（兼容多指触摸）
  startY.value = e.touches[0].clientY
}

// 触摸移动：实时计算位移（可选，根据需求决定是否在移动中触发逻辑）
const onTouchMove = (e) => {
  const currentY = e.touches[0].clientY
  const deltaY = currentY - startY.value  // 位移差（正：下滑，负：上滑）

  // 超过阈值时触发滑动逻辑（移动过程中实时响应）
  if (deltaY > threshold) {
    if(swipeState!=-1)
    {
        console.log('进行下滑')
        emit('swipe',-1);
        swipeState=-1;
    }
    // 执行下滑逻辑（如：显示下拉菜单）
  } else if (deltaY < -threshold) {
    // console.log('正在上滑')
    if(swipeState!=1)
    {
        console.log('进行上滑')
        emit('swipe',1);  
        swipeState=1;
    }
  
    // 执行上滑逻辑（如：隐藏下拉菜单）
  }
}
</script>

<style lang="scss">

</style>