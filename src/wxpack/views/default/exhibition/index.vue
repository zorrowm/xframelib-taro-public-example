<template>
  <div class="demo-list">
    <nut-list :list-data="data"  @scroll-bottom="onScrollBottom" style="height:100%">
      <template #default="{ index,item }">
        <div class="list-item grid-cols-6" :style="getBackColorStyle(index)" @click="showSelected(index)">
           <div class="pic" :style="getBackImageStyle(item.img)"></div>
           <div class="info ">{{ item.title }}</div>
           <svg-icon-web icon="ep:arrow-right" size="30" class="rightIcon" ></svg-icon-web>
        </div>
      </template>
    </nut-list>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted,ref } from "vue";
import {lighten} from 'xframelib-taro';
import  { PathTourist } from 'xframelib-taro';

const data = ref([
{
 img:'https://qcloud.dpfile.com/pc/QEuMRDH5h30Iea8cJ_9JfjvlO2z7K-l0LvjvkVI2LndmjDt2OW_Af5Bp18shWGUp.jpg',
 title:'测试描述信息111111111测试长度'
},
{
 img:'https://img2.baidu.com/it/u=3387674689,2499088534&fm=253&app=138&f=JPEG?w=800&h=1200',
 title:'测试描述信息111111111测试长度'
},
{
 img:'https://img0.baidu.com/it/u=4122289076,2725553847&fm=253&app=138&f=JPEG?w=800&h=1200',
 title:'测试描述信息111111111测试长度'
},
{
 img:'https://qcloud.dpfile.com/pc/OPVckCT_zt_PYhBTj6H994l-m8KGismrr8gjUKzsFh5hc3h_tO9xdvgPwh8_xqKc.jpg',
 title:'测试描述信息111111111测试长度'
},
{
 img:'https://qcloud.dpfile.com/pc/OPVckCT_zt_PYhBTj6H994l-m8KGismrr8gjUKzsFh5hc3h_tO9xdvgPwh8_xqKc.jpg',
 title:'测试描述信息111111111测试长度'
},
{
 img:'https://qcloud.dpfile.com/pc/OPVckCT_zt_PYhBTj6H994l-m8KGismrr8gjUKzsFh5hc3h_tO9xdvgPwh8_xqKc.jpg',
 title:'测试描述信息111111111测试长度'
},
{
 img:'https://img0.baidu.com/it/u=4122289076,2725553847&fm=253&app=138&f=JPEG?w=800&h=1200',
 title:'测试描述信息111111111测试长度'
},
{
 img:'https://qcloud.dpfile.com/pc/OPVckCT_zt_PYhBTj6H994l-m8KGismrr8gjUKzsFh5hc3h_tO9xdvgPwh8_xqKc.jpg',
 title:'测试描述信息111111111测试长度'
},
])

onMounted(()=>{
})

function getBackImageStyle(url:string)
{
 return `background-image:url('${url}')`;
}

function showSelected(index:number)
{
  console.log('展示第几个：',index);
  PathTourist.toView(
    {name:'detailShow',params:{pid:index}}
  );
}
function getBackColorStyle(index:number)
{
  const rightIndex=(index*4)%100;
  const tmpColor= lighten('#9D2F15',rightIndex);
  return `background-color:${tmpColor}`;
}
function onScrollBottom()
{
  let arr = new Array(100).fill(0)
  const len = data.value.length
  data.value = data.value.concat(arr.map((_: number, index: number) => len + index + 1))
}

onUnmounted(()=>{
  
})
</script>

<style lang="scss">
.demo-list
{
  height:100%;
  background-color:#9D2F15; 
  .list-item {
  display: flex;
  align-items: center;
  justify-content:space-around;
  width: 100%;
  height:150px;
  color:#fff;
  border: 1px solid #ddd;

  .pic{
    width:100px;
    height:100px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    margin:0 10px;
    background-size:100% 100%;
  }
  .info{
    flex:1;
  }
  .rightIcon
  {
    margin-right:20px;
  }
}

} 
</style>
