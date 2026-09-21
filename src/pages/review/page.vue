<script lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Speak } from '@/components/ui/speak'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useViewModel } from './model'
import type { Week } from '@/stores/lesson/types'
import { useRoute } from 'vue-router'
import { Shuffle, RotateCcw, CornerRightUp } from '@lucide/vue'
import { ref, watch } from 'vue'
</script>

<script setup lang="ts">
const route = useRoute()
const { week } = route.params
const _week = week as Week
const api = ref<CarouselApi>()

const { category, questions, current, total, reshuffle } = useViewModel(_week)

watch(category, () => {
  if (!api.value) return
  api.value.scrollTo(0)
})

const onInit = (val: CarouselApi) => {
  if (!val) return

  api.value = val

  api.value.on('select', () => {
    if (!api.value) return
    current.value = api.value.selectedScrollSnap() + 1
  })
}

const onReshuffle = () => {
  reshuffle()
  if (!api.value) return
  api.value.scrollTo(0)
}
</script>

<template>
  <div class="mx-auto max-w-md flex flex-col gap-6">
    <div class="flex w-full justify-between">
      <div class="flex gap-2 items-center">
        Review
        <Select class="" v-model="category">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="parts">Parts</SelectItem>
            <SelectItem value="words">Words</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="flex gap-2">
        <Button variant="outline" size="icon" @click="onReshuffle"><Shuffle /></Button>
        <Button variant="outline" size="icon" @click="api?.scrollTo(0)"><RotateCcw /></Button>
      </div>
    </div>

    <Carousel ref="carousel" @init-api="onInit">
      <CarouselContent>
        <CarouselItem v-for="q in questions" :key="q.id">
          <div class="p-1" @click="q.isFront = !q.isFront">
            <transition
              mode="out-in"
              enter-active-class="transition-transform duration-300 ease-out"
              enter-from-class="[transform:rotateY(90deg)]"
              enter-to-class="[transform:rotateY(0deg)]"
              leave-active-class="transition-transform duration-300 ease-in"
              leave-from-class="[transform:rotateY(0deg)]"
              leave-to-class="[transform:rotateY(-90deg)]"
            >
              <Card v-if="q.isFront">
                <CardContent class="flex flex-col aspect-square">
                  <p class="text-xs text-gray-500">Term</p>
                  <div class="flex items-center justify-center p-6 grow">
                    <p class="text-3xl font-semibold">{{ q.word }}</p>
                    <Speak variant="ghost" v-if="category === 'words'" :word="q.word" />
                  </div>
                  <CornerRightUp class="size-4 text-gray-500 self-end" />
                </CardContent>
              </Card>
              <Card v-else>
                <CardContent class="flex flex-col aspect-square">
                  <p class="text-xs text-gray-500">Definition</p>
                  <div class="flex items-center justify-center p-6 grow">
                    <div class="flex flex-col">
                      <p class="text-sm text-gray-500">{{ q.word }}</p>
                      <p class="text-3xl font-semibold">{{ q.definition }}</p>
                      <p class="text-xs text-gray-500 mt-6">Example:</p>
                      <p class="text-sm" v-html="q.example" />
                    </div>
                  </div>
                  <CornerRightUp class="size-4 text-gray-500 self-end" />
                </CardContent>
              </Card>
            </transition>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="sr-only sm:not-sr-only" />
      <CarouselNext class="sr-only sm:not-sr-only" />
    </Carousel>

    <div aria-hidden="true" class="mb-2 flex gap-1.5">
      <button
        v-for="step in total"
        :key="step"
        class="h-1.5 flex-1 rounded-full pointer"
        :class="step <= current ? 'bg-primary' : 'bg-muted'"
        @click="api?.scrollTo(step - 1)"
      />
    </div>
  </div>
</template>
