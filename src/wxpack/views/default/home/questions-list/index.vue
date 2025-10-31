<template>
    <div class="question-panel">


        <div v-for="i in 10" :key="i" class="questionItem">
            <div class="questionContent">{{ i }}</div>
        </div>
        <div class="questionSubmit">
            <CultureButton text="提交"></CultureButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted,ref } from "vue";
import { appStore } from "@/stores";
import CultureButton from "@/wxpack/components/culture-button.vue";
const appState = appStore();
const formData = ref({
  name: '',
  age: ''
})

onMounted(() => {
})
onUnmounted(() => {

})
</script>

<style lang="scss">
.question-panel {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    @include bgImage('/assets/img/questionBg.png');
    background-size: auto 80%;
    background-position: 60% 80%;
    display: flex;
    flex-direction: column;
    align-items:center;
    background-color:#F7F2EB;
    justify-content:flex-start;
    overflow-y: auto;
    gap: 10px 0px;

    .questionItem {
        width: 80%;
        height: 400px;
        @include bgImage('/assets/img/question-item-bg.png');
        flex-grow: 0; /* 阻止容器扩展 */
        flex-shrink: 0; /* 阻止容器收缩 */

        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }
    .questionSubmit
    {
        margin-bottom:80px;
    }
}
</style>