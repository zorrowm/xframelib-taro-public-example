<template>
  <div class="listContainer">
    <nut-list :list-data="dataList" class="activities-list">
      <template #default="{ index, item }">
        <div class="list-item">
          <div
            class="titleBG"
            :style="getBackImage(item.contentimageUrl)"
            @click="showActivityDetail(index)"
          ></div>
          <div class="titleContent">
            <div class="titleLabel">{{ item.contentTitle }}</div>
            <div class="titleBottom">
              <div class="activityInfo">
                <div>活动时间：{{ item.startDate }}</div>
                <div>活动地点：{{ item.subTitle }}</div>
              </div>
              <div class="btnBook" @click="doBooking(item.title)">预约</div>
            </div>
          </div>
        </div>
      </template>
    </nut-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { GetContentsv1, getActivityList } from "@/api/TaianMuseumManageSystem";
import { PathTourist } from "xframelib-taro";
const dataList = ref<any[]>([]);

function getBackImage(url: string) {
  const rightURL = "https://taianbwg.gis.digsur.com" + url;
  return `background-image: url(${rightURL})`;
}
function doBooking(title: string) {
  console.log("开始预约:" + title);
  PathTourist.toView({ name: "activity-timepanel", params: { title } });
}
function showActivityDetail(index: number) {
  //
  PathTourist.toView({ name: "activity-detail", params: { index } });
}

async function initList() {
  const paramgg = {
    siteId: 1,
    channelId: 8,
    // groupNames: ['馆内活动'],
    checkedLevels: [1],
  };
  const res = await GetContentsv1(paramgg);
  dataList.value = res.contents;

  const res1 = await getActivityList(8, "All", undefined, undefined, 1);
}

onMounted(() => {});
onUnmounted(() => {});
initList();
</script>

<style lang="scss">
.listContainer {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
.activities-list {
  padding-bottom: 40px;
  overflow: hidden;
  @include bgImage('/assets/img/home/activity_bg.png');
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .list-item {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 90%;
    margin: 10px 5%;
    height: 600px;
    border-radius: 30px;
    border: 2px solid #eee;

    .titleBG {
      flex-grow: 1;
      width: 100%;
      background-color: #fff;
      @include bgImage('/assets/img/home/activity-img.png');
      background-size: 100% auto;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
    }

    .titleContent {
      height: 180px;
      background-color: #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-bottom-left-radius: 50px;
      border-bottom-right-radius: 50px;
      .titleLabel {
        color: #000;
        font-weight: 550;
        width: 90%;
        line-height: 80px;
        font-size: 35px;
        border-bottom: 1px solid #b89285;
        margin-bottom: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .titleBottom {
        display: flex;
        justify-content: space-between;
        width: 90%;
        .activityInfo {
          flex-grow: 1;
          font-size: 20px;
          color: #000;
        }
        .btnBook {
          font-size: 26px;
          color: #eee;
          @include bgImage('/assets/img/home/bookbg.png');
          width: 150px;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
      }
    }
  }
}
</style>
