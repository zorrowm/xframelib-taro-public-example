<template>
  <div class="userPanel">
    <div class="title"></div>
    <div class="userinfo">
      <div class="userLine">
        <div class="userRound"></div>
        <div v-if="userRef">{{ userRef }}
        </div>
        <div v-else class="userLoginBtn" @click="doUserLogin">
          请登录
        </div>
        <div class="bindIDBtn" v-if="userRef">
            <button class="bindBtn" @click="logout">
               注销
           </button>
          </div>

        <div class="bindIDBtn" v-if="showBindRef">
            <button class="bindBtn" open-type="getPhoneNumber" @getPhoneNumber="getPhoneNumber">
               绑定手机号
           </button>
          </div>
      </div>
      <div class="funcList">
        <nut-list :list-data="dataList" style="height:100%">
          <template #default="{ index, item }">
            <div class="list-item grid-cols-6" @click="showSelected(item)">
              <svg-icon-web  :icon="item.img" :size="26"></svg-icon-web>
              <div class="info ">{{ item.title }}</div>
              <svg-icon-web icon="ep:arrow-right" size="24" class="rightIcon"></svg-icon-web>
            </div>
          </template>
        </nut-list>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed,onMounted, ref } from 'vue';
import { Global,PathTourist } from 'xframelib-taro';
import { userStore } from '@/stores';
import Taro from '@tarojs/taro';

const userState=userStore();
const userRef=computed(()=>{
  return userState.name||userState.id||userState.bindid;
})
const showBindRef=computed(()=>{
  return userState.id&&(!userState.bindid);
})

const dataList = ref([
  {
    img: 'ant-design:user-outlined',
    title: '参观者信息',
    id: 'userInfoWidget'
  },
  {
    img: 'ant-design:unordered-list-outlined',
    title: '预约记录',
    id: 'bookRecordWidget'
  },
  {
    img: 'ant-design:book-outlined',
    title: '收藏夹',
    id: 'collectionListWidget'
  },

]);

function getBackImageStyle(iconURL: string) {
  return `pic '${iconURL}`;
}

function showSelected(item: any) {
  // if(!userRef.value)
  // {
  //   Global.Message.msg('请先登录！')
  //   return;
  // }
  Global.CurrentWidget={
    layoutManager:Global.LayoutManager,
    target:{
      id:item.id,
      label:item.title
    }
  }

  Global.LayoutManager?.loadWidget(item.id);
}

function doUserLogin()
{
  //转到登录页，然后返回
  PathTourist.toLogin();
}
function getPhoneNumber(e) {
  const code = e.detail.code
  if (code) { // 授权成功
    //绑定手机号，获取用户信息
    userState.setBindID(code)
  } else { // 授权失败
    Taro.showToast({
      title: '绑定手机账号失败',
      icon: 'error',
      mask: true
    })
  }
}
function logout()
{
  userState.clear();
  Global.Message.info('用户退出！');
}
onMounted(() => {

})
</script>

<style lang="scss">
.userPanel {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .title {
    height: 30%;
    @include bgImage('/assets/img/home/userbg.jpg');
    background-size: 100% auto;
  }

  .userinfo {
    background-color: #FFF4DC;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 0 10%;

    .userLine {
      height: 100px;
      line-height: 100px;
      margin-top: 5%;
      margin-bottom: 5%;
      display: flex;
      font-size: 30px;
      font-weight: 600;
      align-items: center;
      .userRound {
        width: 100px;
        height: 100px;
        @include bgImage('/assets/img/home/user-logo.png');
        margin-right: 30px;
      }
      .bindIDBtn
      {
        display:inline-block;
        margin-left:20px;   
        .bindBtn
        {
          height: 60px;
          line-height: 60px;
          border-radius: 5px;
          font-size: 24px;
          color: #222;
          text-align: center;
        }     
      }
    }

    .funcList {
      // background-color: #00f;
      flex-grow: 1;

      .list-item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 100px;
        color: #3B1A11;
        border-bottom: 1px solid #F6D1BA;
        font-size: 28px;



        .info {
          flex: 1;
          margin-left:20px;
        }

        .rightIcon {
          margin-right: 20px;
        }
      }
    }

  }

}
</style>
