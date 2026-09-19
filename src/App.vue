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
import { Home, Sun, Moon } from '@lucide/vue'
</script>

<script setup lang="ts">
const { system, store } = useColorMode()
store.value = system.value

const onClick = () => (store.value = store.value === 'dark' ? 'light' : 'dark')
</script>

<template>
  <main>
    <div class="flex justify-between">
      <NavigationMenu class="gap-4 mb-6">
        <img src="/pwa-192x192.png" class="w-8 h-8" />
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <router-link :to="{ name: 'home' }"
                ><span class="box flex gap-2"><Home /> Home</span></router-link
              >
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
