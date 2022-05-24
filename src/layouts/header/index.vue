<template>
  <div class="navbar">
    <div class="left-side">
      <el-space>
        <img
          alt="logo"
          src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        />
      </el-space>
    </div>
    <ul class="right-side">
      <li>home</li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    .left-side {
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
    .right-side {
      display: flex;
      padding-right: 20px;
      list-style: none;
    }
  }
</style>
