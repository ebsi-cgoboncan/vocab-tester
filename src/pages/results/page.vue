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
import { useRoute, useRouter } from 'vue-router'
import type { Week } from '@/stores/lesson/types'
</script>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const week = route.params.week as Week
const { correct, total, incorrects } = useViewModel()

onMounted(() => {
  if (total) return
  router.push({ name: 'home' })
})
</script>

<template>
  <div class="mx-auto max-w-lg space-y-4">
    <div class="flex justify-between">
      <h1 class="text-xl font-bold">Score : {{ Math.round((correct / total) * 100) }}%</h1>
      <div class="flex gap-2">
        <Button as-child variant="outline" size="icon">
          <router-link :to="{ name: 'lesson', params: { week } }" title="restart">
            <RotateCcw />
          </router-link>
        </Button>
      </div>
    </div>
    <div class="space" v-if="incorrects.length">Great job! 🎉</div>
    <div v-else>
      <Table class="table">
        <TableHeader>
          <TableRow>
            <TableHead>Term</TableHead>
            <TableHead>Your Answer</TableHead>
            <TableHead>Expected Answer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="i in incorrects">
            <TableCell class="font-semibold whitespace-no-wrap">{{ i.word }}</TableCell>
            <TableCell>{{ i.answer }}</TableCell>
            <TableCell>{{ i.selection }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
