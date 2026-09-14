import { useRouter } from 'vue-router'
import { useLessonStore } from '@/stores/lesson'
import * as R from 'fp-ts/Record'
import * as RA from 'fp-ts/ReadonlyArray'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import type { Item } from '@/stores/lesson/types'

type ToEntry = (x: Item) => [string, Item]
const toEntry: ToEntry = (x) => [x.name, x]

type ToIncorrect = (
  selection: Item,
) => (answer: Item) => { word: string; selection: string; answer: string }
const toIncorrect: ToIncorrect = (selection) => (answer) => ({
  word: selection.word,
  selection: selection.definition,
  answer: answer.definition,
})

export const useViewModel = () => {
  const router = useRouter()
  const lesson = useLessonStore()
  const correct = pipe(
    lesson.answers,
    R.reduceWithIndex(0, (k, b, a) => (k === a ? b + 1 : b)),
  )
  const total = R.size(lesson.answers)
  const key = pipe(lesson.items, RA.map(toEntry), RA.toArray, R.fromEntries)
  const incorrects = pipe(
    lesson.answers,
    R.filterMapWithIndex((k, a) =>
      k !== a ? pipe(O.of(toIncorrect), O.ap(R.lookup(k, key)), O.ap(R.lookup(a, key))) : O.none,
    ),
  )

  const week = lesson.week

  const onHome = () => {
    router.push({ name: 'home' })
  }

  const onRestart = () => {
    router.push({ name: 'lesson', params: { week: week } })
  }

  return {
    correct,
    total,
    incorrects,
    week,
    onHome,
    onRestart,
  }
}
