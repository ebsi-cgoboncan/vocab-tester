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
    { path: '/review/:week/:seed(\\d+)?', name: 'review', component: Pages.Review },
    {
      path: '/lesson/:week/:seed(\\d+)?',
      name: 'lesson',
      component: Pages.Lesson,
    },
    { path: '/results', name: 'results', component: Pages.Results },
  ],
})

export default router
