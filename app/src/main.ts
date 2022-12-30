import {createApp, ref} from 'vue'
import {createPinia} from 'pinia'
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import {StocksClient} from './services'

import './assets/main.scss'
import {useAppStore} from './stores/app-state'
import {connectivityChecker} from "@/services";
import axios from "axios";
import {stocksConfig} from "@/config";

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
const stocksClient = new StocksClient(axios)
//stocksConfig._exchangeDataPath = "stocks-sample.json"

app.provide('stocksClient', stocksClient)
connectivityChecker.periodicCheck((isOnline) => {
  appStore.$patch({isOnline})
})

appStore.$subscribe((mut, state) => {
    console.log("state changed", state)
    localStorage.setItem('state', JSON.stringify(state))
})
