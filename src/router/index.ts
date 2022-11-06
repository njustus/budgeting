import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/TransactionsListView.vue')
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: () => import('../views/TransactionEvaluationView.vue')
    }
  ]
})

export default router
