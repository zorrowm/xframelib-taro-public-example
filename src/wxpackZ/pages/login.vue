<template>
  <SinglePagePanel title="用户验证">
    <div class="login-page">
      <div class="loginPanel">
        <div class="loginContainer">
          <div class="loginTitle">泰安博物馆欢迎您</div>
          <div class="loginTab">
            <nut-tabs v-model="tabValueRef">
              <nut-tab-pane title="账号登录" pane-key="1">
                <nut-form ref="formRef" :model-value="formData" label-position="top" star-position="right">
                  <nut-form-item label="用户名" required prop="name">
                    <nut-input v-model="formData.name" :border="true" placeholder="请输入账号" type="text" clearable/>
                  </nut-form-item>
                  <nut-form-item label="密码" required prop="pwd">
                    <nut-input v-model="formData.pwd" :border="true" placeholder="请输入密码" type="password" clearable />
                  </nut-form-item>
                  <nut-space justify="center" style="width:100%;">
                    <nut-button type="info" size="small" @click="submit">确认登录</nut-button>
                  </nut-space>
                </nut-form>

              </nut-tab-pane>
              <nut-tab-pane title="本机登录" pane-key="2">
                <div class="phonePane">
                  <button class="u-btn" open-type="getPhoneNumber" @getPhoneNumber="getPhoneNumber">
                    <slot>{{ loginBtnTxt }}</slot>
                  </button>
                </div>

              </nut-tab-pane>
            </nut-tabs>
          </div>
          <div>
          </div>
        </div>
        <div class="loginTip">
          <nut-checkbox v-model="checkContract">阅读并同意</nut-checkbox>
          <div class="tipInfo" style="display:inline-block" @click="showContract = true">《隐私协议》
          </div>
        </div>
        <div class="pageBottom">
        </div>
      </div>
      <nut-popup v-model:visible="showContract" class="popPanel" position="bottom" closeable
            :style="{ height: '80%' }">
            <privateContract />
        </nut-popup>
    </div>

    <!-- <svg-icon-web icon="ep:avatar" size="30"></svg-icon-web> -->
  </SinglePagePanel>
</template>
<script setup lang="ts">
import Taro, { useLoad } from '@tarojs/taro'
import { ref } from 'vue'
import { userStore } from '@/stores'
import { Global, PathTourist } from "xframelib-taro";
import SinglePagePanel from '@/components/SinglePagePanel.vue';
import privateContract from '@/components/privateContract.vue';

const userState = userStore()
const formRef = ref(null);
const tabValueRef = ref('1')
const formData = ref({
  name: '',
  pwd: '',
});
const checkContract = ref(false);
const showContract = ref(false);

const submit = () => {

  if(!formData.value.name||!formData.value.pwd)
  {
    Global.Message.warn("登录字段不能为空！");
    return;
  }
  //TODO:进行真正用户登录

  //登录成功
  const currentUser={
    id:'123456',
    name:formData.value.name,
    bindid:'',
  };
  userState.init(currentUser);
  //返回开始页
  PathTourist.toBackPage();
  // if(!currentUser.bindid)//为空时
  // {
  //   getPhoneNumber();
  // }
  console.log('进行登录操作');
}

const loginBtnTxt=ref('手机号快捷登录');

const redirect = ref('')
const index = ref()
useLoad((options) => {
  console.log('load', options)
  redirect.value = decodeURIComponent(options.redirect)
  index.value = Number(options.index)
})
function getPhoneNumber(e) {
  console.log('e', e)
  const code = e.detail.code
  if (code) { // 授权成功
    // console.log('code111111', code, index.value)
    Taro.setStorageSync('code', code)
    Taro.showToast({
      title: '授权成功',
      icon: 'success',
      mask: true
    })
    //绑定手机号，获取用户信息
    // userState.setBindID(index.value)
    //返回开始页
    PathTourist.toBackPage();

  } else { // 授权失败
    Taro.showToast({
      title: '授权失败',
      icon: 'error',
      mask: true
    })
  }
}
</script>
<style lang="scss">
.login-page {
  width: 100%;
  height: 100%;
  background-color: #e8c07f;
}

.loginPanel {
  position: absolute;
  width: 100%;
  height: 70%;
  left: 0%;
  top: 15%;
  // background-color: #0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;


  .loginContainer {
    height: 650px;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    // border: 2px #f00 solid;

    .loginTitle {
      text-align: center;
      font-size: 40px;
      font-weight: 600;
      height: 100px;
      line-height: 100px;
      letter-spacing: 4px;
    }

    .loginTab {
      height: 350px;
      width: 100%;

      .nut-tab-pane {
        padding: 0 30px;
      }

      .phonePane {
        width: 100%;
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

  }

  .loginTip {
    width: 80%;
    height: 40px;
    font-size: 24px;
    line-height: 40px;

    .tipInfo {
      font-weight: 500;
      color: #3336e9;
      line-height: 40px;
    }
  }

  .pageBottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .u-btn {
    width: 80%;
    height: 88px;
    line-height: 88px;
    border-radius: 20px;
    font-weight: 400;
    font-size: 36px;
    color: #222;
    text-align: center;
  }

  .popPanel {
    width: 100%;
    overflow: 'auto';
}
}
</style>
