<script lang="ts">
import { useViewModel } from './model'
import { Button } from '@/components/ui/button'
import { Table, GalleryThumbnails, BookCheck } from '@lucide/vue'
</script>

<script setup lang="ts">
const { weeks } = useViewModel()
</script>

<template>
  <section class="mx-auto max-w-lg">
    <h1>Lessons</h1>
    <div class="flex flex-col space-y-2">
      <div
        class="flex p-2 pl-4 border rounded-xl justify-between items-center"
        v-for="week in weeks"
      >
        <p>{{ week }}</p>
        <div class="flex gap-2">
          <Button variant="outline" as-child>
            <router-link class="flex gap-2 items-center" :to="{ name: 'study', params: { week } }">
              <Table /> Study
            </router-link>
          </Button>
          <Button variant="outline">
            <router-link class="flex gap-2 items-center" :to="{ name: 'review', params: { week } }">
              <GalleryThumbnails /> Review
            </router-link>
          </Button>
          <Button as-child>
            <router-link class="flex gap-2 items-center" :to="{ name: 'lesson', params: { week } }">
              <BookCheck /> Test
            </router-link>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
