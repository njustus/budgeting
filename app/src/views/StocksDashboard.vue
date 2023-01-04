<script setup lang="ts">
import StockList from "@/components/stocks/stock-list.vue";
import {currency} from '@/utils/formats'
import {useAppStore} from '@/stores/app-state'
import FaIcon from "@/components/common/fa-icon.vue";
import {inject} from "vue";
import {StocksClient} from "@/services";

const store = useAppStore();

const stocksClient = inject<StocksClient>('stocksClient')!
async function updateStocks() {
  const infos = await Promise.all(store.depot.subscribedStocks.map(x => stocksClient.getStockInfo(x.isin)))
  store.updateStockExchanges(infos)
}

</script>

<template>
  <n-space :justify="'space-between'">
    <h1>Depot</h1>
    <div>
      <h1><n-text :type="'success'">{{ currency.format(store.depotBalance) }}</n-text></h1>
      <small>
        Stand: {{ store.depotLastUpdate.toLocaleString() }}&nbsp;
        <n-button circle text type="primary" @click="updateStocks"><FaIcon icon="arrow-circle-down"></FaIcon></n-button>
      </small>
    </div>
  </n-space>
  <stock-list></stock-list>
</template>


<style scoped>

</style>
