<template>
    <bookContainer>
        <div class="visitorForm">
            <nut-form class="formPanel" ref="formRef" :model-value="formData">
                <nut-form-item label="姓名" required prop="name" :rules="[
                    { required: true, message: '请填写姓名' }
                ]">
                    <nut-input v-model="formData.name" placeholder="请填写与证件一致的姓名" type="text" />
                </nut-form-item>
                <nut-form-item label="手机号码" required prop="tel" :rules="[
                    { required: true, message: '请填写手机号码' },
                    { validator: asyncValidator, message: '手机号码格式不正确' }
                ]">
                    <nut-input v-model="formData.tel" placeholder="请填写手机号码" type="text" />
                </nut-form-item>
                <nut-form-item label="证件类型">
                    <nut-radio-group v-model="formData.card" direction="horizontal">
                        <nut-radio label="1">身份证</nut-radio>
                        <nut-radio label="2">护照</nut-radio>
                        <nut-radio label="3">军官证</nut-radio>
                        <nut-radio label="4">其他</nut-radio>
                    </nut-radio-group>
                </nut-form-item>
                <nut-form-item label="证件号码" required prop="idNum" :rules="[
                    { required: true, message: '请填写证件号码' },
                    { validator: idNumRuleValidator, message: '必须输入数字', reg: /^\d+$/ }
                ]">
                    <nut-input v-model="formData.idNum" placeholder="请填写证件号码" type="text" />
                </nut-form-item>
            </nut-form>
            <div class="tipInfo">温馨提示：姓名中如有生僻字，请用拼音代替</div>
            <div>
                <nut-checkbox v-model="checkContract">阅读并同意</nut-checkbox>
                <div class="tipInfo" style="display:inline-block" @click="showContract = true">《隐私协议》
                </div>
            </div>
            <cultureButton text="确定" @click="doVisitor"></cultureButton>
        </div>
        <nut-popup v-model:visible="showContract" class="popPanel" position="bottom" closeable
            :style="{ height: '80%' }">
            <privateContract />
        </nut-popup>
    </bookContainer>


</template>

<script setup lang="ts">
import bookContainer from '@/wxpack/components/book-container.vue';
import cultureButton from '@/wxpack/components/culture-button.vue';
import { onMounted, ref } from 'vue';
import { verifyPhone, verifyIdCard, Global } from 'xframelib-taro';
import privateContract from '@/components/privateContract.vue';

const formRef = ref(null)
const checkContract = ref(false);
const showContract = ref(false);
const formData = ref({
    name: '',
    tel: '',
    card: '1',
    idNum: ''
});
const idNumRuleValidator = (val) => {
    if (formData.value.card == '1') {
        if (verifyIdCard(val)) {
            return Promise.resolve()
        } else {
            return Promise.reject('必须输入正确身份证号！')
        }
    }
    else {
        if (!val) {
            return Promise.resolve()
        }
        else
            return Promise.reject('必须输入证件号！')
    }
}

// Promise 异步校验
const asyncValidator = (val) => {
    return new Promise((resolve, reject) => {
        if (!val) {
            reject('请输入手机号')
        }
        const result = verifyPhone(val);
        if (!result) {
            reject('手机号格式不正确')
        } else {
            resolve('')
        }
    });
};
onMounted(() => {


});
function doVisitor() {
    if (!checkContract.value) {
        Global.Message.warn('请阅读并同意，用户隐私条款！');
        return;
    }
    //@ts-ignore
    formRef.value?.validate().then(({ valid, errors }) => {
        if (valid) {
            console.log('参观者信息：', formData.value);
            Global.Message.info('添加参观者信息完成！');
        } else {
            console.warn('error:', errors)
        }
    })


}
</script>

<style lang="scss">
.visitorForm {
    width: 90%;
    margin-left: 5%;
    margin-top: 2%;
    // height: 96%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    color: #000;

    .tipInfo {
        font-size: 20px;
        font-weight: 500;
        color: #DD713F;
    }
}

.popPanel {
    width: 100%;
    overflow: 'auto';
}
</style>