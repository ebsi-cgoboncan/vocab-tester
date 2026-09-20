<script lang="ts">
import { useViewModel } from './model'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Week } from '@/stores/lesson/types'
import { useRoute } from 'vue-router'
</script>

<script setup lang="ts">
const route = useRoute()
const { week } = route.params
const _week = week as Week

const { prefixes, roots, suffixes, definitions } = useViewModel(_week)
</script>

<template>
  <div class="mx-auto max-w-md flex flex-col gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Prefixes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-28">Term</TableHead>
              <TableHead>Definition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="x in prefixes">
              <TableCell class="font-semibold whitespace-nowrap">{{ x.word }}</TableCell>
              <TableCell>{{ x.definition }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Roots</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-28">Term</TableHead>
              <TableHead>Definition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="x in roots">
              <TableCell class="font-semibold whitespace-nowrap">{{ x.word }}</TableCell>
              <TableCell>{{ x.definition }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle> Suffixes </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-28">Term</TableHead>
              <TableHead>Definition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="x in suffixes">
              <TableCell class="font-semibold whitespace-nowrap">{{ x.word }}</TableCell>
              <TableCell>{{ x.definition }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle> Words </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-28">Term</TableHead>
              <TableHead>Definition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="x in definitions">
              <TableCell class="font-semibold whitespace-nowrap">{{ x.word }}</TableCell>
              <TableCell>{{ x.definition }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
