<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
  </nav>
  <RouterView v-if="!system.isLoading"/>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useSystemStore } from '@/stores/system'

const system = useSystemStore()
</script>
