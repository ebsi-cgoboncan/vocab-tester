import type { Ref } from 'vue'

export type Term = {
  id: string
  word: string
  definition: string
  isFront: Ref<boolean>
}
