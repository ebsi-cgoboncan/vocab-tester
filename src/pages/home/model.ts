import { useLessonStore } from '@/stores/lesson'

export const useViewModel = () => {
  const lesson = useLessonStore()

  return {
    weeks: lesson.weeks,
  }
}
