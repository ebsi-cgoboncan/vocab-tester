<script lang="ts">
import { useRoute } from 'vue-router'
import { useViewModel } from './model'
import { type Week } from '@/stores/lesson/types'
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/components/ui/questionnaire'
</script>

<script setup lang="ts">
const route = useRoute()
const { week, seed } = route.params
const _week = week as Week
const _seed = parseInt(seed as string)

const { items, onSubmit } = useViewModel(_week, _seed)
</script>

<template>
  <Questionnaire
    class="mx-auto max-w-md"
    :items="items"
    @submit.stop.prevent="onSubmit"
    shortcuts="letters"
  >
    <QuestionnaireProgress v-slot="{ current, total }" class="w-full">
      <div aria-hidden="true" class="mb-2 flex gap-1.5">
        <span
          v-for="step in total"
          :key="step"
          class="h-1.5 flex-1 rounded-full"
          :class="step <= current ? 'bg-primary' : 'bg-muted'"
        />
      </div>
      <span>Question {{ current }} of {{ total }}</span>
    </QuestionnaireProgress>
    <QuestionnaireItem v-for="item in items" :key="item.id" :name="item.name" required>
      <QuestionnaireTitle>{{ item.word }}</QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice
          v-for="choice in item.choices"
          :key="choice.value"
          :value="choice.value"
        >
          {{ choice.definition }}
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>
    <QuestionnaireActions>
      <QuestionnaireNext />
      <QuestionnaireSubmit />
    </QuestionnaireActions>
  </Questionnaire>
</template>
