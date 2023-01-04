import {createApp} from 'vue'
import {createPinia} from 'pinia'
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import {StocksClient} from './services'

import './assets/main.scss'
import {useAppStore} from './stores/app-state'
import {connectivityChecker} from "@/services";
import axios from "axios";

const app = createApp(App)

app.use(naive)
app.use(createPinia())
app.use(router)

app.mount('#app')

const appStore = useAppStore();
const stocksClient = new StocksClient(axios)

app.provide('stocksClient', stocksClient)
connectivityChecker.periodicCheck((isOnline) => {
  appStore.$patch({isOnline})
})

appStore.$subscribe((mut, state) => {
    console.log("state changed", state)
    localStorage.setItem('state', JSON.stringify(state))
})
