import { Lessons } from './data'

export type Week = keyof typeof Lessons

export type Id = string
export type Word = string
export type Definition = string
export type Type = 'prefix' | 'root' | 'suffix' | 'definition'

export type Entry = {
  id: Id
  word: Word
  definition: Definition
}

export type Entries = readonly Entry[]
export type Lesson = {
  parts: {
    prefixes: Entries
    roots: Entries
    suffixes: Entries
  }
  definitions: Entries
}

export type Answer = Id

export type Choice = {
  id: Id
  word: Word
}

export type Question = {
  id: Id
  definition: Definition
  word: Word
  type: Type
}

export type Item = {
  id: string
  name: string
  word: string
  definition: string
  choices: readonly { value: string; definition: string }[]
  required: boolean
}

export type Test = {
  questions: Question[]
  choices: readonly Word[]
  seed: number
}

export type ViewModel = {
  test: Test
}

export type TestProps = {
  seed: number
  week: Week
}
