import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { useLessonStore } from '@/stores/lesson'
import { type Question, type Week } from '@/stores/lesson/types'
import type { Term } from './types'
import { computed, reactive, ref, watch, type Reactive } from 'vue'
import { shuffle, sow } from '@/stores/lesson/utils'

type ToTerm = (question: Question) => Reactive<Term>
const toTerm: ToTerm = (q) =>
  reactive({
    id: q.word,
    word: q.word,
    definition: q.definition,
    isFront: ref(true),
  })

export const useViewModel = (week: Week) => {
  const lesson = useLessonStore()
  const seed = ref(sow())

  lesson.week = week

  const parts = computed(() => pipe(lesson.parts, RA.map(toTerm)))
  const words = computed(() => pipe(lesson.definitions, RA.map(toTerm)))

  const category = ref('parts')
  const questions = computed(() =>
    pipe(category.value === 'parts' ? parts.value : words.value, shuffle(seed.value)),
  )

  const current = ref(1)
  const total = computed(() => questions.value.length)
  const reshuffle = () => (seed.value = sow())

  return {
    category,
    questions,
    current,
    total,
    reshuffle,
  }
}
