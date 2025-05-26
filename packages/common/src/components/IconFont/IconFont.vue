<template>
  <i :class="['iconfont', type]" :style="{ fontSize, color }"></i>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  type: string        // 图标类名，如 "icon-folder"
  fontSize?: string   // 大小（可选）
  color?: string      // 颜色（可选）
}>()
</script>

<style scoped>
.iconfont {
  height: 24px;
  line-height: 24px;
  width: 24px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}
</style>
