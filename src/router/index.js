import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompletedView from '@/views/CompletedView.vue'
import Personalview from '@/views/Personalview.vue'
import WorkView from '@/views/WorkView.vue'
import TodayView from '@/views/TodayView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import StudyView from '@/views/StudyView.vue'
import PendingView from '@/views/PendingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/completed',
      name: 'completed',
      component: CompletedView,
    },
    {
      path: '/pending',
      name: 'pending',
      component: PendingView,
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personalview,
    },
    {
      path: '/work',
      name: 'work',
      component: WorkView,
    },
    {
      path: '/study',
      name: 'study',
      component: StudyView,
    },
    {
      path: '/today',
      name: 'today',
      component: TodayView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
