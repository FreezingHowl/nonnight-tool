<template>
  <button :class="['a-btn', type]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "default",
  },
});

</script>

<style lang="less">
@import "../../styles/variables.less";

.a-btn {
  padding: 8px 16px;
  border-radius: 4px;

  &.primary {
    background-color: @primary-color;
    color: white;
  }
}
</style>
