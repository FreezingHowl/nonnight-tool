<template>
  <div class="home-page">
    <header class="header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="0">
          <img
            style="width: 100px"
            src="https://element-plus.org/images/element-plus-logo.svg"
            alt="Element logo"
          />
        </el-menu-item>
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </header>
    <div class="body">
      <div class="description-title"></div>
      <div class="swipper-menu">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <footer class="footer">
      <p>&copy; 2023 My Website. All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>
<style>
.home-page {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;

  .header {
    height: 60px;
    width: 100%;
  }
  .body {
    height: calc(100% - 120px);
    overflow-y: auto;

    .description-title {
      height: 60%;
      width: 100%;
      background-image: url("@/assets/image/home_bg.png"), linear-gradient(to bottom right, #00ad9c, #101921);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    .swipper-menu {
      height: 40%;
    }
  }
  .footer {
    height: 60px;
    width: 100%;
    text-align: center;
  }
}
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
