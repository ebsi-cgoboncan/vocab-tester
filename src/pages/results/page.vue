<script lang="ts">
import { useViewModel } from './model'
import { GalleryThumbnails, RotateCcw } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { onMounted } from 'vue'
</script>

<script setup lang="ts">
const { correct, total, incorrects, toHome, toReview, onRestart } = useViewModel()

onMounted(() => {
  if (total) return
  toHome()
})
</script>

<template>
  <div class="mx-auto space-y-4">
    <div class="flex justify-between">
      <h1 class="text-xl font-bold">Score : {{ Math.round((correct / total) * 100) }}%</h1>
      <div class="flex gap-2">
        <Button @click="toReview" variant="outline"> <GalleryThumbnails /> Review </Button>
        <Button @click="onRestart" variant="outline">
          <RotateCcw />
        </Button>
      </div>
    </div>
    <div class="space" v-if="incorrects.length">Great job! 🎉</div>
    <div v-else>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Term</TableHead>
            <TableHead>Your Answer</TableHead>
            <TableHead>Expected Answer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="i in incorrects">
            <TableCell class="font-semibold">{{ i.word }}</TableCell>
            <TableCell>{{ i.answer }}</TableCell>
            <TableCell>{{ i.selection }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
