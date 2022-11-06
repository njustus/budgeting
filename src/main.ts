import { createApp, ref} from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { useAppStore } from './stores/app-state'

const app = createApp(App)
const txs = ref([])

app.provide('transactions', txs)

fetch('/transactions.json')
    .then(res => res.json())
    .then(ts => txs.value = ts)

app.use(naive)
app.use(createPinia())
app.use(router)

app.mount('#app')

const appStore = useAppStore();
appStore.$subscribe((mut, state) => {
    console.log("state changed", state)
    localStorage.setItem('state', JSON.stringify(state))
})