<script lang="ts">
import '@/style.css'
import { useColorMode } from '@vueuse/core'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
</script>

<script setup lang="ts">
const mode = useColorMode()
mode.value = 'auto'
</script>

<template>
  <main>
    <NavigationMenu class="gap-4">
      <img src="/pwa-192x192.png" class="w-8 h-8" />
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink as-child>
            <router-link :to="{ name: 'home' }">Home</router-link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <RouterView />
  </main>
</template>
