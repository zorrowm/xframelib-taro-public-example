<template>
    <WidgetBackPanel :isBack="false">
        <template #content>
                <nut-tabs v-model="tabValue" class="tabsPanel">
                    <nut-tab-pane title="未出行" pane-key="1" >
                        <nut-list :list-data="data">
                            <template #default="{ index }">
                                <div class="record-item" @click="showSelected(index)">
                                   <div class="recTitle">XXX活动</div>
                                   <div class="recContent">
                                    <div>预约编号：7777777777</div>
                                    <div>预约时间：2025-10-16</div>
                                    <div>
                                        预约状态：<text>已经预约，待参与</text>
                                    </div>
                                   </div>
                                </div>
                            </template>
                        </nut-list>

                    </nut-tab-pane>
                    <nut-tab-pane title="已过期" pane-key="2">
                        无记录
                    </nut-tab-pane>
                </nut-tabs>
        </template>
    </WidgetBackPanel>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import WidgetBackPanel from '@/components/WidgetBackPanel.vue';
import { appStore } from '@/stores';
import { Global } from 'xframelib-taro';
const tabValue = ref('1');
const appState = appStore();

const data = ref(new Array(50).fill(0))

function showSelected(item: any) {
  // if(!userRef.value)
  // {
  //   Global.Message.msg('请先登录！')
  //   return;
  // }
  console.log('5555555555555:',item);
  const id='recordItemDetailWidget'
  Global.CurrentWidget={
    layoutManager:Global.LayoutManager,
    target:{
      id,
      label:'无'
    }
  }

  Global.LayoutManager?.loadWidget(id);
}
onMounted(() => {
    // data.value = data.value.map((_: number, index: number) => index + 1)
})
onUnmounted(() => {
})
</script>
<style lang="scss">
.tabsPanel
    {
        height:100%;
        .nut-tab-pane
        {
            background-color: #F8DCC1;
            padding: 20rpx;
        }
        .record-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 160px;
            background-color: #fff;
            border: 1px #ddd solid;
            border-radius: 10px;
            margin-bottom:10px;
            .recTitle
            {
                color: #974E34;
                font-size:20px;
                font-weight: bold;
                width:80%;
                height:40px;
            }
            .recContent{
                width:80%;
                color: #787878;
                font-size:18px;
                height:90px;
                display:flex;
                flex-direction: column;
                justify-content: space-between;

            }
        }
    }

</style>