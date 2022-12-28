import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/transactions'
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('../views/TransactionsListView.vue')
    },
     {
      path: '/stocks',
      name: 'stocks',
      component: () => import('../views/StocksDashboard.vue')
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: () => import('../views/TransactionEvaluationView.vue')
    },
    {
      path: '/options',
      name: 'options',
      component: () => import('../views/OptionsVIew.vue')
    }
  ]
})

export default router
