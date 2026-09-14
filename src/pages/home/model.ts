import { useLessonStore } from '@/stores/lesson'
import { useRouter } from 'vue-router'
import { type Week } from '@/stores/lesson/types'

export const useViewModel = () => {
  const router = useRouter()
  const lesson = useLessonStore()

  const onClick = (week: Week) => {
    router.push({ name: 'lesson', params: { week: week } })
  }

  return {
    weeks: lesson.weeks,
    onClick,
  }
}
