<template>
    <WidgetBackPanel :isBack="false" class="recordDetailPanel">
        <template #content>
            <div class="activityItem">

                <div class="activityPic" :style="getBackImage(item.url)"></div>
                <div class="activityContent">
                    <div class="titleLabel">{{ item.title }}</div>
                    <div class="titleBottom">
                        <div class="activityInfo">
                            <div>活动时间：<text class="activeFont">{{ item.time }}</text> </div>
                            <div>活动地点：<text class="activeFont">{{ item.address }}</text></div>
                        </div>

                    </div>

                    <div class="detailInfo">
                        <div class="detailLabel">活动详情</div>
                        <div class="description">
                            {{ item.detail }}
                        </div>
                    </div>
                </div>

            </div>
            <div class="bookInfo">
                <div class="recTitle">预约信息</div>
                <div class="recContent">
                    <div>预约编号：<text class="activeFont">7777777777</text></div>
                    <div>预约时间：<text class="activeFont">2025-10-16</text></div>
                    <div>
                        预约状态：<text>已经预约，待参与</text>
                    </div>
                </div>
            </div>
        </template>
    </WidgetBackPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getRightURL } from "@/utils/sysTool";

const item = ref({
    url: '/assets/img/home/activity-img.png',
    title: '妙笔绘神兽1',
    time: '2025-9-22',
    address: '山东省泰安市泰安博物馆3层 307室',
    detail: '本次体验活动将带领参与者赏精美雅器，品泰山文化。跟随工作人员的讲解指引，在配天门展厅内，参观欣赏了博物馆珍藏的香文化器具，了解古人用香、爱香、藏香等文化雅事。 通过亲身体验制作精美的香具，近距离感受传统香文化的魅力，增强对传统文化的兴趣和认知。'
});
function getBackImage(url: string) {
    const resURL = getRightURL(url);
    return `background-image: url(${resURL})`;
}
</script>

<style lang="scss">
.recordDetailPanel {
    background: #F8DCC1;

    .activeFont {
        font-size: 22px;
        color: #A4644D;
    }

    .panelContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
    }

    .activityItem {
        width: 90%;
        height: 70%;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        padding: 20px;
        background-color: #FFD37C;

        .activityPic {
            width: 100%;
            flex-grow: 1;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .activityContent {
            height: 450px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;

            .titleLabel {
                color: #974E34;
                font-weight: 550;
                width: 90%;
                line-height: 80px;
                font-size: 35px;
                border-bottom: 1px solid #B89285;
                margin-bottom: 10px;
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
            }

        }

        .detailInfo {
            width: 90%;
            flex-grow: 1;

            .detailLabel {
                font-weight: bold;
                color: #000;
                height: 80px;
                line-height: 80px;
                font-size: 28px;
            }

            .description {
                font-size: 20px;
                color: #333;
            }
        }

    }

    .bookInfo {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 250px;
        background-color: #fff;
        border: 1px #ddd solid;
        border-radius: 10px;
        margin-bottom: 10px;

        .recTitle {
            color: #974E34;
            font-size: 28px;
            font-weight: bold;
            width: 80%;
            height: 40px;
            line-height:100px;
            height:100px
        }

        .recContent {
            width: 80%;
            color: #787878;
            font-size: 22px;
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

        }
    }
}
</style>