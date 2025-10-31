<template>
    <div class="cultureButton">
        {{ text }}
    </div>
</template>

<script setup lang="ts">
defineProps({
    text:{
        type:String,
        default:'确定'
    }
})

</script>

<style lang="scss">
  .cultureButton {
    font-size: 26px;
    color: #eee;
    @include bgImage('/assets/img/home/bookbg.png');
    width: 180px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    margin: 5% 0;
  }
</style>