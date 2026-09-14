<script setup lang="ts">
import '@/style.css'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
mode.value = 'auto'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
