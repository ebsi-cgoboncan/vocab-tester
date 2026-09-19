import { createRouter, createWebHistory } from 'vue-router'
import * as Pages from '@/pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Pages.Home,
    },
    { path: '/:week/review/:seed(\\d+)?', name: 'review', component: Pages.Review },
    {
      path: '/:week/lesson/:seed(\\d+)?',
      name: 'lesson',
      component: Pages.Lesson,
    },
    { path: '/:week/results/:seed(\\d+)?', name: 'results', component: Pages.Results },
  ],
})

export default router
