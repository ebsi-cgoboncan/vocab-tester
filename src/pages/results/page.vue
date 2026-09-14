<script lang="ts">
import { useViewModel } from './model'
import { Button } from '@/components/ui/button'
</script>

<script setup lang="ts">
const { correct, total, incorrects, week, onHome, onRestart } = useViewModel()
</script>

<template>
  <div class="mx-auto max-w-md space-y-4">
    <h1 class="text-xl font-bold">Score : {{ Math.round((correct / total) * 100) }}%</h1>
    <h2 class="text-lg font-semibold">Incorrect answers</h2>
    <div class="space-y-4">
      <dl class="grid grid-cols-[auto_1fr] gap-2 border" v-for="incorrect in incorrects">
        <dt class="font-semibold border-b">question:</dt>
        <dd class="border-b">{{ incorrect.word }}</dd>
        <dt class="font-semibold border-b">answer:</dt>
        <dd class="border-b">{{ incorrect.answer }}</dd>
        <dt class="font-semibold border-b">correct:</dt>
        <dd class="border-b">{{ incorrect.selection }}</dd>
      </dl>
    </div>
    <div class="flex gap-2">
      <Button @click="onRestart"> Restart </Button>
      <Button @click="onHome"> Home </Button>
    </div>
  </div>
</template>
