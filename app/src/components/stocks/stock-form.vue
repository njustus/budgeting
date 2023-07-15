<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {inject, ref, h, computed, watchEffect, reactive} from "vue";
import {StocksClient} from "@/services";
import {useNotification, NButton} from "naive-ui";
import type {StockInfo} from "@/models";
import {currency} from '@/utils/formats'

const appStore = useAppStore()
const notification = useNotification()
const stocksClient = inject<StocksClient>('stocksClient')!
const stockRef$ = ref({
  isin: '',
  count: 0.0
})

const stockDetails$ = ref<StockInfo|null>(null)
const stockOptions$ = ref<StockInfo[]>([]);
const isLoading$ = ref<boolean>(false)

const autoCompleteOptions$ = computed(() =>
   stockOptions$.value.map(stock => ({label: `${stock.name} ${stock.isin} (${stock.wkn})`, value: stock.isin}))
)

watchEffect(async () => {
  stockOptions$.value = await findStock(stockRef$.value.isin);
});

const amount$ = computed(() =>
  (stockDetails$.value) ?
    stockRef$.value.count * stockDetails$.value.exchange.price : 0.0
)

function updateStockDetails(selectedIsin: string) {
  stockDetails$.value = stockOptions$.value.find(stock => stock.isin === selectedIsin) || null
}

function saveStock() {
  if(!stockDetails$.value) {
    return
  }

  appStore.addStock(stockDetails$.value, stockRef$.value.count)
}

async function findStock(isin?: string):Promise<StockInfo[]> {
  if(!isin || isin.length<5) {
    return []
  }

  isLoading$.value = true
  const stockInfos = await stocksClient.findStockInfo(stockRef$.value.isin)
  isLoading$.value = false
  return stockInfos
}

</script>

<template>
  <n-list-item>
  <n-grid :cols="6" :x-gap="40">
    <n-gi>
      <n-form-item>
        <n-input-number v-model:value="stockRef$.count"></n-input-number>
      </n-form-item>
    </n-gi>

    <n-gi :span="4">
      <n-form-item>
      <n-auto-complete
        v-model:value="stockRef$.isin"
        :input-props="{ autocomplete: 'disabled' }"
        :options="autoCompleteOptions$"
        :loading="isLoading$"
        placeholder="Type a ISIN/WKN"
        @select="updateStockDetails"
      ></n-auto-complete>
      </n-form-item>
    </n-gi>
    <n-gi>
      <n-form-item>
        <n-button :type="'primary'" @click="saveStock">Save</n-button>
      </n-form-item>
    </n-gi>
  </n-grid>

  <template #suffix>
    <n-text :type="'info'"><strong>{{ currency.format(amount$) }}</strong></n-text>
  </template>
    </n-list-item>
</template>

<style scoped>

</style>
