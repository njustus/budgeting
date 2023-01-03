<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {currency} from '@/utils/formats'
import type {SubscribedStock} from "@/models";
import {stocksConfig} from '@/config'
import StockForm from "@/components/stocks/stock-form.vue";
import {computed} from "vue";
import FaIcon from "@/components/common/fa-icon.vue";
import StockCounter from "@/components/stocks/stock-counter.vue";

const store = useAppStore();
const subscribedStocks = computed(() => store.depot.subscribedStocks)

const deleteStockById = store.deleteStockById

function total(stock: SubscribedStock): number {
  return stock.count * stock.stockInfo.exchange.price
}

</script>

<template>
  <n-list>
    <stock-form></stock-form>
    <n-list-item v-for="stock of subscribedStocks" v-bind:key="stock.isin">
      <n-grid :cols="6" #default>
        <n-gi>
          <stock-counter :stock="stock"></stock-counter>
        </n-gi>

        <n-gi :span="5">
          <a :href="stocksConfig.formatStocksUrl(stock.isin)" target="_blank">{{ stock.stockInfo.name }} ({{ stock.stockInfo.wkn }})</a><br/>
          <small>{{ stock.isin }}</small>
        </n-gi>
      </n-grid>

      <template #suffix>
        <n-text :type="'info'"><strong>{{ currency.format(total(stock)) }}</strong></n-text>
        <n-button :type="'error'" @click="deleteStockById(stock.id)"><fa-icon icon="trash"></fa-icon></n-button>
      </template>
    </n-list-item>
  </n-list>
</template>


<style scoped>

</style>
