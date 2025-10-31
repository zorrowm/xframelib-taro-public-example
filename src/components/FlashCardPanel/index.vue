<template>
  <div class="flash_card_panel">
    <div class="flash_card_content">
      <template v-for="(item, index) in dataList" :key="index">
        <div class="flash_card mx-5px">
          <slot>
            <image :src="item.img" :width="nwidth" :height="nheight" />
          </slot>
          <div class="sectionDiv sectionHoverDiv">
            <slot name="section">
              <div class="sectionTitle">
                {{ item.title }}
              </div>
              <div class="sectionDesc">
                <span>{{ item.desc }}</span>
              </div>
            </slot>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type IFlashCardSection from './IFlashCardSection';
import { PropType } from 'vue';


const props = defineProps({
  animateIn:{
      type:String,
      default:'fadeIn',
    },
  dataList:{
    type:Array as PropType<IFlashCardSection[]>,
    default:[]
  }, //数据列表
  nwidth:{
      type:Number,
      default:340,
    },//面板宽度
  nheight:{
      type:Number,
      default:238,
    }, //面板高度
});
</script>

<style lang="scss">
.flash_card_panel {
  position: relative;
  width: 100%;
  height: 100%;
  // background-color: #00f;
  .flash_card_content {
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    // background-color: #f00;
  }
}

.sectionDiv {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;

  &:hover {
    visibility: visible;
  }
}

.flash_card {
  position: relative;
  width: v-bind(nwidth);
  height: v-bind(nheight);
  text-align: center;
  display: inline-block;

  &:hover {
    .sectionHoverDiv {
      -webkit-animation: v-bind(animateIn) 2s;
      animation: v-bind(animateIn) 2s;
      visibility: visible;
    }
  }
}

.sectionTitle {
  width: 50%;
  height: 40px;
  margin: 10px auto;
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  line-height: 40px;
  font-size: 17px;
}

.sectionDesc {
  position: absolute;
  bottom: 10px;
  left: 10%;
  width: 80%;
  height: 40%;

  color: white;
  text-align: center;
  font-size: 15px;

  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  font-family: Georgia, serif;
  font-style: italic;
}
</style>
