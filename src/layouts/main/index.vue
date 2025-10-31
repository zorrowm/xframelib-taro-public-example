<template>
  <LayoutContainer :layoutID="layoutIDRef">
        <!-- <template #main>
            777777777777
          </template> -->
  </LayoutContainer>
</template>

<script lang="ts" setup>
import {onMounted,ref } from 'vue';
import {LayoutContainer } from 'xframelib-taro';

const layoutIDRef = ref('mainLayout');
onMounted(() => {

});
</script>

<style lang="scss">
#mainLayout
{
  
}
</style>
