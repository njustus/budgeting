import { createRouter, createWebHistory } from 'vue-router'
// import TransactionsListView from

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/TransactionsListView.vue')
    }
  ]
})

export default router
