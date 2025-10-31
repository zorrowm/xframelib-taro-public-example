<template>
    <div class="bookContainer">
      <div class="bookContainerContent">
        <slot name="default"></slot>
      </div>        
    </div>
  </template>
  
  <script setup lang="ts">
  
  </script>
  
  <style lang="scss">
  .bookContainer
  {
      position: absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
      background: #F8DCC1;
      display: flex;
      justify-content: center;
      .bookContainerContent
      {
        width:90%;
        height:100%;
        background: #ffffff80
      }
  }
  </style>