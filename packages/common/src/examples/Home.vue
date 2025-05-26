<template>
  <div class="example-box">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const filteredRoutes = router.getRoutes().filter(r => {
  return  r.path !== '/' && r.path !== '/home'
});
</script>

<style scoped>
.example-box {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
