<template>
  <bookContainer>
    <div class="activityTimePanel">
      <div class="activityContent">
        <div class="titleInfo">
          <div class="titleIcon"></div>
          XXXXX活动
        </div>
        <div class="dateInfo">活动时间：2025-10-18 ~ 2025-11-30</div>
        <div class="addressInfo">活动地点：XXXXXXXX</div>
      </div>
      <div class="datePanel">
        <div class="titleBG">选择观展日期</div>
        <div class="panelContent">
          <nut-calendar-card
            style="height: 100%"
            v-model="value"
            :disable-day="disableDay"
            @change="onChange"
          >
            <template #default="{ day }">
              {{ day.date <= 9 ? `0${day.date}` : day.date }}
            </template>
            <template #bottom="{ day }">
              <div v-if="getAvalidDay(day.date) === 1" style="color: #f00">
                有票
              </div>
              <div
                v-else-if="getAvalidDay(day.date) === 0"
                style="color: #ddd; background-color: #333"
              >
                无票
              </div>
            </template>
          </nut-calendar-card>
        </div>
      </div>
      <div class="timeSection">
        <div class="titleBG">选择观展时段</div>
        <div class="panelContent panelTimeSection">
          <div class="sectionTimeItem">
            <div>09:00 - 12:30</div>
            <div>可预约</div>
          </div>
          <div class="sectionTimeItem">
            <div>12:30 - 16:00</div>
            <div>不可预约</div>
          </div>
        </div>
      </div>
      <div class="activityVisitor">
        <div class="titleBG">选择参观者 <text>（最多6人）</text></div>
        <div class="panelContent visitorPanel">
          <div class="visitorLine"></div>
          <div class="bottomAddLine" @click="doAddUser">
            <svg-icon-web
              icon="ant-design:plus-outlined"
              color="#f00"
            ></svg-icon-web>
            添加参观者
          </div>
        </div>
      </div>
      <cultureButton title="下一步"></cultureButton>
    </div>
  </bookContainer>
</template>

<script setup lang="ts">
import bookContainer from "@/wxpack/components/book-container.vue";
import cultureButton from "@/wxpack/components/culture-button.vue";
import { ref } from "vue";
import { activitySubmit } from "@/api/TaianMuseumManageSystem";

const value = ref(null);
const onChange = (val: Date) => {
  console.log(val);
};

const today = new Date();
const dayNum = today.getDate();

function getAvalidDay(day: number) {
  const maxDay = dayNum + 10;
  if (day <= dayNum || day >= maxDay) return -1;
  if (day <= dayNum + 3) return 0;
  if (day <= dayNum + 8) return 1;
  else return -1;
}
function disableDay(day: any) {
  const result = getAvalidDay(day.date);
  return result != 1;
}

// function getDayTicket(day:number)
// {
//     const dayNum=getAvalidDay(day);
//         let result='';
//     switch(dayNum)
//     {
//         case 0:
//             result='无票';
//             break;
//         case 1:
//             result='有票';
//             break;
//     }
//     return result;
// }

function doAddUser() {}

async function submitForm() {
  const param = {
    id: 0,
    guid: "",
    createdDate: "2025-09-23T07:48:24.901Z",
    lastModifiedDate: "2025-09-23T07:48:24.901Z",
    orderNum: "",
    huoDongSettingID: 1,
    siteId: 1,
    channelId: 8,
    contentId: 92,
    visitTime: "2025-09-27T00:00:00",
    timeSlot: "9:00-12:00",
    userId: 1,
    phoneNum: "13500000000",
    ipAddress: "",
    status: "All",
    peopleInfos: [
      {
        Name: "张三",
        CardType: "身份证",
        CardNum: "1111111111111",
        PhoneNum: "13711111111",
        QRCode: "",
      },
      {
        Name: "李四",
        CardType: "身份证",
        CardNum: "2222222222",
        PhoneNum: "13666666666",
        QRCode: "",
      },
    ],
    peopleCount: 2,
    orderTime: "2025-09-23T07:48:24.901Z",
  };

  const res = await activitySubmit(param);
}
</script>

<style lang="scss">
.activityTimePanel {
  padding: 20px;
  height: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.activityContent {
  color: #974e34;
  font-size: 20px;
  width: 100%;

  .titleInfo {
    font-size: 40px;
    border-bottom: 2px solid #b89285;

        .titleIcon {
            @include bgImage('/assets/img/vertical-back.png');
            width: 31px;
            height: 58px;
            display: inline-block;
        }
    }
  }

.titleBG {
    width: calc(100% - 10px);
    height: 60px;
    @include bgImage('/assets/img/calendarBg.png');
    background-position: 0 0;
    background-size: 100% 446px;

    line-height: 60px;
    padding-left: 10px;
    font-size: 20px;
    color: #974E34;
}

.datePanel {
  margin-top: 30px;
  width: 100%;
  height: 680px;

  .nut-calendarcard-header {
    height: 40px;
  }

  .nut-calendarcard-days {
    height: 50px;
  }
}

.panelContent {
  width: 100%;
  height: calc(100% - 60px);
  background-color: #fff;
  border-radius: 0 0 10px 10px;
}

.timeSection {
  width: 100%;
  height: 180px;
  font-size: 20px;

  .panelTimeSection {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .sectionTimeItem {
      background-color: rgba(255, 211, 124, 0.5);
      width: 200px;
      height: 80px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}

.activityVisitor {
  height: 180px;
  width: 100%;
  .visitorPanel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .visitorLine {
      width: 100%;
      min-height: 50px;
      background-color: #f00;
    }

    .bottomAddLine {
      width: 80%;
      border-radius: 18px;
      opacity: 1;
      background: rgba(255, 211, 124, 0.5);
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #dd713f;
      font-size: 18px;
    }
  }
}
</style>
