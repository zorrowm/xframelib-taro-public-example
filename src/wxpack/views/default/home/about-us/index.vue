<template>
  <ArticleComponent>
    <template #content>
      <div class="text">
        泰安市博物馆，1986年依托于岱庙建馆，是一座集文物、园林、古建筑于一体的综合性博物馆。是保护、研究和展示泰山历史文化遗产的教育机构和泰安市对外宣传的重要窗口。主要负责全市文物的征集、收藏、陈列宣传和岱庙内文物的保护研究及景区日常管理工作。
      </div>
      <image :src="newsImg1Ref" alt="" />
      <div class="text">
        泰安市博物馆现为国家二级博物馆，馆藏文物20848件套，主要包括祭器、宗教民俗、出土器物、碑刻、碑帖、古籍和其他文物藏品7大类。其中文物藏品15737件套件，古籍图书5111件套。主要类别有：石器、陶器、瓷器、铁器、铜器、金银器、玉石器、印玺、砚墨、珐琅器、竹木牙角、字画、刺绣、碑帖、革命文物、钱币、碑刻石雕、古籍等。馆藏文物中一级139件套，二级473件套，三级3025件套，古籍善本10122册。
      </div>
      <image :src="newsImg2Ref" alt="" />
    </template>
  </ArticleComponent>
</template>

<script setup>
import { onMounted, onUnmounted,ref } from "vue";
import ArticleComponent from "src/components/ArticleComponent.vue";
import { appStore } from "@/stores";
import { Global } from "xframelib-taro";
import { getRightURL } from "@/utils/sysTool";

const appState=appStore();
const newsImg1Ref=ref(getRightURL("/assets/img/home/news1.png"));
const newsImg2Ref=ref(getRightURL("/assets/img/home/news2.png"));
onMounted(()=>{
})

onUnmounted(()=>{
  
})

</script>

