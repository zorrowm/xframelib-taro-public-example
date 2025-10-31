<template>
    <WidgetBackPanel :isBack="false" class="userInfoPanel">
        <template #content>
            <div class="myPanel panelBG">
                <div class="titleLine">
                    <div class="leftTitle">本人信息</div>
                    <div class="rightbtn">
                        <svg-icon-web icon="ant-design:plus-outlined"></svg-icon-web>
                        <text>编辑</text>
                    </div>
                </div>
                <div class="myContent">
                    <div>姓名：</div>
                    <div>电话：</div>
                    <div>身份证号：</div>
                </div>
            </div>
            <div class="otherPanel panelBG">
                <div class="titleLine">
                    <div class="leftTitle">其他人信息</div>
                    <div class="rightbtn">
                        <culture-button text="添加"></culture-button>
                    </div>
                </div>
                <div class="infoContent">
                    <nut-list :list-data="userData" class="listContent">
                        <template #default="{ index, item }">
                            <div class="infoItem">

                                <div>姓名：{{ item.name }}</div>
                                <div>电话：{{ item.tel }}</div>
                                <div>身份证号：{{ item.idNum }}</div>
                            </div>
                        </template>
                    </nut-list>

                </div>
            </div>
        </template>
        <template #footer>
            <div class="userBottomBg"></div>
        </template>
    </WidgetBackPanel>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import WidgetBackPanel from '@/components/WidgetBackPanel.vue';
import { appStore } from '@/stores';
import cultureButton from '@/wxpack/components/culture-button.vue';
const appState = appStore();

const userData = ref([{
    name: '1-2323',
    tel: '13401030xxx',
    idNum: '987987987984546542'
}, {
    name: '2-2323',
    tel: '13401030xxx',
    idNum: '987987987984546542'
}, {
    name: '3-2323',
    tel: '13401030xxx',
    idNum: '987987987984546542'
},
{
    name: '1-2323',
    tel: '13401030xxx',
    idNum: '987987987984546542'
}, {
    name: '2-2323',
    tel: '13401030xxx',
    idNum: '987987987984546542'
}, {
    name: '3-2323',
    tel: '13401030xxx',
    idNum: '987987987984546542'
},
{
    name: '1-2323',
    tel: '13401030xxx',
    idNum: '987987987984546542'
}, {
    name: '2-2323',
    tel: '13401030xxx',
    idNum: '987987987984546542'
}, {
    name: '63-2323',
    tel: '13401030xxx',
    idNum: '987987987984546542'
}
])
onMounted(() => {
})
onUnmounted(() => {
})
</script>
<style lang="scss">
.userInfoPanel {
    background: #FCF1E6;

    .panelContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .panelBG {
        border-radius: 10px;
        background-color: #fff;
        font-size: 20px;
        width: 85%;
        padding: 20px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 20px;

        .titleLine {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 20px;

            .leftTitle {
                font-size: 28px;
                color: #974E34;
            }

            .cultureButton {
                height: 40px;
                width: 100px;
                line-height: 40px;
                font-size: 20px;
            }
        }

        .infoItem {
            height: 130px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            border-bottom: 1px #eee solid;
            padding-bottom: 10px;
        }

        .infoContent {
            height: calc(70% - 300px);
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .listContent {
                height: 100%;
                overflow-y: auto;
            }
        }


    }

    .myPanel {
        height: 250px;

        .myContent {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            &>div {
                height: 30px;
                border-bottom: 1px #eee solid;
            }
        }
    }

    .otherPanel {
        flex-grow: 1;
    }

    .userBottomBg {
        height: 30%;
        opacity: 0.6;
        @include bgImage('/assets/img/home/userbg.jpg');
        background-size: 100% auto;

    }
}
</style>