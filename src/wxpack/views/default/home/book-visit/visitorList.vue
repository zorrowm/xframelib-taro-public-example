<template>
  <bookContainer>
    <div class="visitListPanel">
      <div class="topBtnLine" @click="doAddUser"> <svg-icon-web icon="ant-design:plus-outlined"
          color="#f00"></svg-icon-web> 添加参观者</div>
      <div class="usrList">
        <nut-list :list-data="dataList"  class="visitor-list">
          <template #default="{ index, item }">
            <div class="list-item-content">
              <div class="itemCheck">  
                  <nut-checkbox v-model="item.checked">  </nut-checkbox>
                </div>
              <div class="itemVisitor" @click="changeItemChecked(item)">
              <div class="titleLabel">姓名：{{ item.name }}</div>
                <div class="titleBottom">
                  <div class="activityInfo">
                    <div>证件类型：{{ item.card }}</div>
                    <div>证件号码：{{ item.idNum }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </nut-list>
      </div>
      <cultureButton text="确定添加" @click="doAddBooking"></cultureButton>
    </div>
  </bookContainer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import bookContainer from '@/wxpack/components/book-container.vue';
import cultureButton from '@/wxpack/components/culture-button.vue';
import { appStore } from "@/stores";
import { Global } from "xframelib-taro";

const appState = appStore();
const dataList = ref<any[]>([
  {
    name: 'test1',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test2',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test3',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test4',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test1',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test2',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test3',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test4',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test1',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test2',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test3',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test4',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test1',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test2',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test3',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
  {
    name: 'test4',
    card: '身份证',
    idNum: '3710811984000000000',
    checked:false,
  },
]);

function changeItemChecked(item:any)
{
  item.checked=!item.checked;
}

onMounted(() => {

});
//添加预定
function doAddBooking() {
  if(dataList.value)
  {
    const result= dataList.value.filter(it=>it.checked===true);
    console.log('选中对象：',result);
    Global.Message.info('预定成功！');
  }

}
//添加用户信息
function doAddUser() {
  const url: string = "visit-addUser";
  appState.showLayoutBottom(false);
  Global.Router?.push({ name: url });

}




</script>

<style lang="scss">
.visitListPanel {
  width: 90%;
  margin-left: 5%;
  margin-top: 2%;
  height: 96%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  opacity: 1;

  .topBtnLine {
    width: 100%;
    border-radius: 18px;
    opacity: 1;
    background: #FFE9BE;
    height: 60px;
    text-align: center;
    line-height: 60px;
  }
}

.usrList {
  max-height: 85%;
  width: 100%;
  overflow-y: auto;
}

.visitor-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;

  .list-item-content 
  {
    display:flex;
    justify-content:flex-start;
    align-items: center;
    .itemCheck{
      width:50px;
    }
  }
  
  .itemVisitor{
    width:100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-bottom: 10px;
    .titleLabel {
      color: #000;
      font-weight: 550;
      width: 90%;
      margin-bottom: 10px;
      font-size: 28px;
    }

    .titleBottom {
      display: flex;
      justify-content: space-between;
      width: 90%;
      font-size: 20px;
      .activityInfo {
        flex-grow: 1;
        color: #000;
      }
    }

  }
}
</style>