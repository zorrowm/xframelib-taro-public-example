<template>
    <div class="cul_prod_panel">
        <div class="topPanelLine">
            <div class="leftLogo"></div>
            <div class="searchLine">
                <nut-input v-model="valSearch" placeholder="请输入搜索内容" clearable @blur="doSearch">
                    <template #right>
                        <svg-icon-web icon="ep:search" color="#000" width="24" height="24"></svg-icon-web>

                    </template>
                </nut-input>
            </div>
        </div>
        <div class="advertisePanel">

        </div>
        <div class="productPanel">
            <div class="prodTitle">
                <div class="prodLeftIcon"></div>
                <div class="prodTopTitle">热销商品</div>
            </div>
            <div class="prodsList">
                <div v-for=" i in 20" :key="i" class="boxItem">
                    <div class="boxContent"></div>
                    <div class="boxBottom">
                        <div class="prodName">文创名称</div>
                        <div class="prodPrice">￥198.00</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const valSearch = ref('');
function doSearch() {
    if (valSearch.value) {
        console.log('进行搜索');
    }
}
onMounted(() => {
})
onUnmounted(() => {

})
</script>

<style lang="scss">
.cul_prod_panel {
    width:100%;
    height:100%;
    @include bgImage('/assets/img/prodBg.png');
    background-repeat: repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;

    .topPanelLine {
        height: 110px;
        width: 95%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .searchLine {
            flex-grow: 1;
        }

        .leftLogo {
            @include bgImage('/assets/img/taian_daimiao.png');
            background-size:  auto  100% ;
            width: 90px;
            height: 100px;
            display: inline-block;
        }
    }

    .advertisePanel {
        width: 100%;
        height: 220px;
        @include bgImage('/assets/img/new-culture-product.png');
    }

    .productPanel {
        width: 95%;
        min-height: 300px;
        height:calc(100% - 450px);
        border: 2px #f00 ;

        .prodTitle {
            width: 170px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .prodLeftIcon {
                @include bgImage('/assets/img/vertical-back.png');
                background-size: auto 100%;
                width: 31px;
                height: 58px;
                display: inline-block;
            }

            .prodTopTitle {
                color: #303030;
                font-size: 28px;
                font-weight: 550;
            }

        }
        .prodsList
        {
            // background-color: #f00;
            width:100%;
            height:100%;
            overflow-y: auto;
            display:flex;
            justify-content: center;
            gap:20px;
            flex-wrap: wrap;
            .boxItem
            {
                width:46%;
                height:360px;
                // border:2px solid #00f;
                .boxContent
                {
                    width:100%;
                    border-radius: 15px;
                    height:280px;
                    background-color: #FFE190;
                }
                .boxBottom{
    
                    height:80px;
                    margin-left:10px;

                    .prodName
                    {
                        color: #000;
                        font-size: 26px;
                        height:50px;
                        line-height:50px;
                    }
                    .prodPrice
                    {
                        color:#C94426;
                        font-size: 22px;
                        height:30px;
                        line-height:30px;
                    }
                }

            }
        }
    }
}
</style>