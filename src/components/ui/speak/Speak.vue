<script lang="ts">
import { Button } from '../button'
import { Volume2 } from '@lucide/vue'
import type { SpeakProps } from './types'
</script>

<script setup lang="ts">
const { word } = defineProps<SpeakProps>()
const onClick = () => {
  const utterance = new SpeechSynthesisUtterance(word)
  utterance.lang = 'en-US'
  utterance.rate = 1
  utterance.pitch = 1

  window.speechSynthesis.speak(utterance)
}
</script>

<template>
  <Button @click.stop.prevent="onClick" size="icon"><Volume2 /></Button>
</template>
