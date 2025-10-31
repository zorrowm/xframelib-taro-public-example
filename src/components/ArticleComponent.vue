<template>
  <view>
    <div class="outer">
      <div class="inner">
        <div class="textContainer">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </view>
</template>

<script setup></script>

<style lang="scss">
.outer {
  width: 100vw;
  height: 100vh;
  background-color: #e8c07f;
  display: flex;
  justify-content: center;
}
.inner {
  width: 90vw;
  height: 100vh;
  background-color: #d08659;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.textContainer {
  width: 85vw;
  height: 100%;
  padding: 5px 0;
  background-color: #fff;
  padding: 30px 20px 50px 20px;
  overflow: scroll;
  box-sizing: border-box;
  img {
    object-fit: contain;
    object-position: center;
    display: block;
    width: 100%;
  }
  .text {
    line-height: 1.5;
  }
}
</style>
