<template>
  <div class="card-box">
    <slot name="title"></slot>
    <slot name="main"></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .card-box {
    box-sizing: border-box;
    padding: 10px 20px;
    background-color: #fff;
    border: 1px solid #eee;
  }
</style>
