import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Lessons } from './data'
import type { Week, Entry, Question, Type, Item } from './types'
import * as RA from 'fp-ts/ReadonlyArray'
import * as A from 'fp-ts/Array'
import * as R from 'fp-ts/Record'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

type PRNG = () => number

const randomSeed = (): number => crypto.getRandomValues(new Uint32Array(1))[0]!

const mulberry32 = (seed: number): PRNG => {
  let state = seed >>> 0

  return () => {
    state += 0x6d2b79f5

    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const shuffle =
  <A>(seed: number) =>
  (values: readonly A[]): readonly A[] => {
    const random = mulberry32(seed)

    return values.reduceRight(
      (result, _, i) => {
        if (i === 0) return result
        const j = Math.floor(random() * (i + 1))
        ;[result[i], result[j]] = [result[j]!, result[i]!]

        return result
      },
      [...values],
    )
  }

type ToQuestion = (type: Type) => (entry: Entry) => Question
const toQuestion: ToQuestion = (type) => (entry) => ({
  id: entry.id,
  name: entry.word,
  type: type,
  definition: entry.definition,
  word: entry.word,
})

type ToItem = (
  seed: number,
  parts: readonly Question[],
  definitions: readonly Question[],
) => (index: number, question: Question) => Item
const toItem: ToItem = (seed, parts, definitions) => (index, question) => {
  console.log(seed + index)
  const choices = pipe(
    question.type === 'definition' ? definitions : parts,
    shuffle(seed + index),
    RA.map((x) => ({ value: `${x.type}-${x.id}`, definition: x.definition })),
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
  const seed = ref(randomSeed())
  const weeks = pipe(Lessons, R.keys)
  const defaultWeek = pipe(
    Lessons,
    R.keys,
    A.reverse,
    A.head,
    O.getOrElseW(() => 'week2' as const),
  )
  const week = ref<Week>(defaultWeek)
  const answers = ref<Record<string, string>>({})

  const items = computed(() => {
    const { prefixes, roots, suffixes } = Lessons[week.value].parts

    const parts = pipe(
      pipe(prefixes, RA.map(toQuestion('prefix'))),
      RA.concat(pipe(roots, RA.map(toQuestion('root')))),
      RA.concat(pipe(suffixes, RA.map(toQuestion('suffix')))),
    )

    const definitions = pipe(Lessons[week.value].definitions, RA.map(toQuestion('definition')))

    const questions = pipe(parts, RA.concat(definitions), shuffle(seed.value), RA.toArray)
    const _toItem = toItem(seed.value, parts, definitions)

    return pipe(questions, RA.mapWithIndex(_toItem))
  })

  const onSubmit = (evt: Event) => {
    const data = new FormData(evt.target as HTMLFormElement)
    answers.value = Object.fromEntries(data) as Record<string, string>
  }

  return {
    seed,
    week,
    weeks,
    items,
    answers,
    onSubmit,
  }
})
