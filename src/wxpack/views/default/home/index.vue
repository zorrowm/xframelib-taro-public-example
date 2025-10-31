<template>
  <view>
    <!-- <NaviHeaderComponent :title="'泰山岱庙'" :is-back="false" :color="'#fff'" /> -->
    <nut-swiper
      :init-page="1"
      :auto-play="3000"
      pagination-visible
      pagination-color="#eee"
      pagination-unselected-color="#808080"
      @change="handleChange"
    >
      <nut-swiper-item
        v-for="(item, index) in swiperList"
        :key="index"
        style="height: 350px"
      >
        <image
          :src="getRightURL(item.url)"
          alt=""
          class="swiperImg"
          draggable="false"
        />
      </nut-swiper-item>
    </nut-swiper>
    <div class="imgName">{{ imgName }}</div>

    <view class="middleContainer">
      <img :src="imgLeftRef" alt="" class="yunwen_left" draggable="false" />
      <img :src="imgLeftRef" alt="" class="yunwen_right" draggable="false" />
      <div class="menuList">
        <div
          v-for="item in homeMenu"
          class="menuItem"
          @click="handlePush(item.url)"
        >
          <div class="menuBtn" :style="getBackgroundStyle(item.icon)"></div>
          <div style="color: #333; font-size: 12px; margin-top: 5px">
            {{ item.name }}
          </div>
        </div>
      </div>

      <div style="padding: 0 25px">新闻资讯</div>
      <div class="newsPanel">
        <div class="newsContainerList">
          <div
            v-for="item in newsList"
            class="newsContainer"
            :style="{
              backgroundImage: `url(https://taianbwg.gis.digsur.com${item.imageUrl})`,
            }"
            @click="handleIFameURL(item.navigationUrl)"
          ></div>
        </div>
      </div>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Global, PathTourist } from "xframelib-taro";
import { appStore } from "@/stores";
// import newsList from "@/assets/newsList.json";
import { getRightURL } from "@/utils/sysTool";
import { GetContentsv1 } from "@/api/TaianMuseumManageSystem";

const appState = appStore();
const imgLeftRef = ref(getRightURL("/assets/img/home/yunwen_left.png"));
const swiperList = [
  { name: "图片一", url: "/assets/img/home/swiper1.jpg" },
  { name: "图片二", url: "/assets/img/home/swiper2.png" },
  { name: "图片三", url: "/assets/img/home/swiper3.jpg" },
  { name: "图片四", url: "/assets/img/home/swiper4.jpg" },
  { name: "图片五", url: "/assets/img/home/swiper5.jpg" },
];

const imgName = ref("");
function handleChange(idx) {
  imgName.value = swiperList[idx].name;
}

function getBackgroundStyle(icon: string) {
  const bgURL = getRightURL(icon);
  return {
    backgroundImage: `url(${bgURL})`,
  };
}

const homeMenu = [
  {
    name: "关于我们",
    icon: "/assets/img/home/aboutus_icon.png",
    url: "about-us",
  },
  {
    name: "馆内活动",
    icon: "/assets/img/home/guanneifuwu_icon.png",
    url: "activities-list",
  },
  {
    name: "参观预约",
    icon: "/assets/img/home/book_icon.png",
    url: "book-visit",
  },
  {
    name: "问卷调查",
    icon: "/assets/img/home/questionnaire_icon.png",
    url: "questions-list",
  },
  {
    name: "文创产品",
    icon: "/assets/img/home/wenchuang_icon.png",
    url: "cultural-products",
  },
];

// onMounted(()=>{

// })
const newsList = ref([]);
async function initNewsList() {
  const param = {
    siteId: 1,
    channelId: 5,
    groupNames: ["近期资讯"],
    checkedLevels: [1],
  };
  const res = await GetContentsv1(param);
  newsList.value = res.contents;
}

function handlePush(url) {
  appState.showLayoutBottom(false);
  PathTourist.toView({
    name:url
  });
}
function handleIFameURL(url: string) {
  appState.iframeModalURL = "https://taianbwg.gis.digsur.com/" + url;
  // Global.CurrentWidget = {
  //   layoutManager: Global.LayoutManager,
  //   target: {
  //     id: "WebviewContainerWidget",
  //     label: name
  //   }
  // }

  // Global.LayoutManager?.loadWidget('WebviewContainerWidget');
  PathTourist.toPage("/wxpackZ/pages/webViewPage");
  console.log("77777", url);
}
onMounted(() => {
  initNewsList();
  if (Global.BackRouteView) {
    const routePath = Global.BackRouteView;
    Global.BackRouteView = undefined;
    setTimeout(() => {
      PathTourist.toView(routePath);
    }, 50);
  }
});
</script>

<style lang="scss">
.swiperImg {
  height: 800px;
  width: 100%;
  object-fit: contain;
  object-position: center;
}

.imgName {
  position: absolute;
  right: 100px;
  top: 310px;
  z-index: 100;
  color: #fff;
  padding: 10px 5px;
  background-color: #dc8c0acc;
  writing-mode: vertical-rl;
  font-size: 32px;
  letter-spacing: 5px;
}

.middleContainer {
  position: absolute;
  margin-top: -45px;
  background-color: #f7f2eb;
  width: 100%;
  height: 50%;
  border-radius: 45px;

  .menuList {
    display: flex;
    justify-content: space-between;
    padding: 35px 25px;

    .menuItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
    }
  }

  .menuBtn {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background-color: #b74c33;
    background-repeat: "no-repeat";
    background-position: "center";
  }

  .newsPanel {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 20px;
    height: calc(100% - 300px);
    .newsContainerList {
      display: flex;
      gap: 20px;
      overflow-x: scroll;
      white-space: nowrap;
      height: 100%;
      align-items: center;
      .newsContainer {
        width: 35%;
        min-width: 300px;
        height: 100%;
        border-radius: 10px;
        flex-shrink: 0;
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        z-index: "2";
      }
    }
  }

  .yunwen_left {
    position: absolute;
    top: 180px;
    width: 158px;
    height: 36px;
    z-index: 10;
  }

  .yunwen_right {
    position: absolute;
    top: 20px;
    right: 0;
    height: 36px;
    width: 158px;
    z-index: 10;
  }
}
</style>
