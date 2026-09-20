import { useLessonStore } from '@/stores/lesson'
import { type Week } from '@/stores/lesson/types'
import { storeToRefs } from 'pinia'

export const useViewModel = (week: Week) => {
  const lesson = useLessonStore()

  lesson.week = week

  const { prefixes, roots, suffixes, definitions } = storeToRefs(lesson)

  return {
    prefixes,
    roots,
    suffixes,
    definitions,
  }
}
