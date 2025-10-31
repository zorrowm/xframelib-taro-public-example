<template>
  <ArticleComponent>
    <template #content>
      <div>新闻资讯</div>
    </template>
  </ArticleComponent>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { appStore } from "@/stores";
const appState=appStore();
onMounted(() => {

});
</script>
