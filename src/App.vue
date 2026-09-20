<script lang="ts">
import '@/style.css'
import { useColorMode } from '@vueuse/core'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { BookOpenCheck, Table, GalleryThumbnails, BookCheck, Sun, Moon } from '@lucide/vue'
import { useRoute } from 'vue-router'
</script>

<script setup lang="ts">
const { system, store } = useColorMode()
store.value = system.value
const route = useRoute()

const onClick = () => (store.value = store.value === 'dark' ? 'light' : 'dark')
</script>

<template>
  <main class="mb-14">
    <div class="flex justify-between">
      <NavigationMenu class="gap-4 mb-6">
        <img src="/vocabulary.png" class="h-10" />
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <router-link :to="{ name: 'home' }">
                <span class="box flex gap-2">
                  <BookOpenCheck />
                  <span class="sr-only sm:not-sr-only">Lessons</span>
                </span>
              </router-link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem v-if="route.params.week" class="border-l">
            <NavigationMenuLink as-child>
              <router-link :to="{ name: 'study', params: { week: route.params.week } }">
                <span class="box flex gap-2">
                  <Table />
                  <span class="sr-only sm:not-sr-only">Study</span>
                </span>
              </router-link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem v-if="route.params.week">
            <NavigationMenuLink as-child>
              <router-link :to="{ name: 'review', params: { week: route.params.week } }">
                <span class="box flex gap-2">
                  <GalleryThumbnails />
                  <span class="sr-only sm:not-sr-only">Review</span>
                </span>
              </router-link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem v-if="route.params.week">
            <NavigationMenuLink as-child>
              <router-link :to="{ name: 'lesson', params: { week: route.params.week } }">
                <span class="box flex gap-2">
                  <BookCheck />
                  <span class="sr-only sm:not-sr-only">Test</span>
                </span>
              </router-link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button variant="ghost" size="icon" @click="onClick" title="color mode">
        <Sun v-if="store === 'dark'" />
        <Moon v-else />
      </Button>
    </div>

    <RouterView />
  </main>
</template>
