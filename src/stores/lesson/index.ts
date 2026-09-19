import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Lessons } from './data'
import type { Week, Entry, Question, Type, Item, Choice } from './types'
import * as RA from 'fp-ts/ReadonlyArray'
import * as A from 'fp-ts/Array'
import * as R from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { sow, shuffle } from './utils'

type ToQuestion = (type: Type) => (entry: Entry) => Question
const toQuestion: ToQuestion = (type) => (entry) => ({
  id: entry.id,
  name: entry.word,
  type: type,
  definition: entry.definition,
  word: entry.word,
})

type ToChoice = (quesiton: Question) => Choice
const toChoice: ToChoice = ({ type, id, definition }) => ({
  value: `${type}-${id}`,
  definition,
})

type ToItem = (
  seed: number,
  parts: readonly Question[],
  definitions: readonly Question[],
) => (index: number, question: Question) => Item
const toItem: ToItem = (seed, parts, definitions) => (index, question) => {
  const choices = pipe(
    question.type === 'definition' ? definitions : parts,
    shuffle(seed + index),
    RA.map(toChoice),
  )

  return {
    id: question.id,
    name: `${question.type}-${question.id}`,
    word: question.word,
    definition: question.definition,
    required: true,
    choices,
  }
}

export const useLessonStore = defineStore('lesson', () => {
  const seed = ref(sow())
  const weeks = pipe(Lessons, R.keys)
  const defaultWeek = pipe(
    Lessons,
    R.keys,
    A.reverse,
    A.head,
    O.getOrElseW(() => 'week1' as const),
  )
  const week = ref<Week>(defaultWeek)
  const answers = ref<Record<string, string>>({})

  const parts = computed(() => {
    const { prefixes, roots, suffixes } = Lessons[week.value].parts
    const _prefixes = pipe(prefixes, RA.map(toQuestion('prefix')))
    const _roots = pipe(roots, RA.map(toQuestion('root')))
    const _suffixes = pipe(suffixes, RA.map(toQuestion('suffix')))

    return pipe(_prefixes, RA.concat(_roots), RA.concat(_suffixes))
  })

  const definitions = computed(() =>
    pipe(Lessons[week.value].definitions, RA.map(toQuestion('definition'))),
  )

  const items = computed(() =>
    pipe(
      parts.value,
      RA.concat(definitions.value),
      RA.toArray,
      RA.mapWithIndex(toItem(seed.value, parts.value, definitions.value)),
    ),
  )

  const onSubmit = (evt: Event) => {
    const data = new FormData(evt.target as HTMLFormElement)
    answers.value = Object.fromEntries(data) as Record<string, string>
  }

  return {
    seed,
    week,
    weeks,
    items,
    parts,
    definitions,
    answers,
    onSubmit,
  }
})
