<script lang="ts">
import { useViewModel } from './model'
import { Button } from '@/components/ui/button'
import { GalleryThumbnails, BookCheck } from '@lucide/vue'
</script>

<script setup lang="ts">
const { weeks, toReview, toLesson } = useViewModel()
</script>

<template>
  <section class="mx-auto max-w-lg">
    <h1>Lessons</h1>
    <div class="flex flex-col space-y-2 ">
      <div class="flex p-2 pl-4 border rounded-xl justify-between items-center" v-for="week in weeks">
        <p>{{ week }}</p>
        <div class="flex gap-2">
          <Button variant="outline" @click="toReview(week)"><GalleryThumbnails /> Review</Button>
          <Button @click="toLesson(week)"><BookCheck /> Test</Button>
        </div>
      </div>
    </div>
  </section>
</template>
