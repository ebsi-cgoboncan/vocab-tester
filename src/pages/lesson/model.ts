import { useLessonStore } from '@/stores/lesson'
import { useRouter } from 'vue-router'
import { type Week } from '@/stores/lesson/types'

export const useViewModel = (week: Week, seed: number) => {
  const router = useRouter()
  const lesson = useLessonStore()
  lesson.week = week
  if (seed) lesson.seed = seed

  const onSubmit = (evt: Event) => {
    lesson.onSubmit(evt)
    router.push({ name: 'results' })
  }

  return {
    items: lesson.items,
    onSubmit,
  }
}
