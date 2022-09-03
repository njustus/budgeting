import { createApp, ref} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const txs = ref([])

app.provide('transactions', txs)

fetch('/transactions.json')
    .then(res => res.json())
    .then(ts => txs.value = ts)

app.use(createPinia())
app.use(router)

app.mount('#app')
