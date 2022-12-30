<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {inject, ref, h, computed} from "vue";
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

const amount$ = computed(() =>
  (stockDetails$.value) ?
    stockRef$.value.count * stockDetails$.value.exchange.price : 0.0
)

function saveStock() {
  if(!stockDetails$.value) {
    return
  }

  appStore.addStock(stockDetails$.value, stockRef$.value.count)
}

async function findStock() {
  if(stockRef$.value.isin.length<5) {
    return
  }

  const stockInfos = await stocksClient.findStockInfo(stockRef$.value.isin)

  const title = 'Stock Search'
  if(stockInfos.length<=0) {
    notification.error({
      title,
      content: 'Unknown Stock: '+stockRef$.value.isin,
    })
  } else if(stockInfos.length>1) {
    const stocksDescription = stockInfos.map(x => x.name).join(', ')
    notification.warning({
      title,
      content: 'Multiple Stocks found: '+stocksDescription
    });
  } else {
    stockDetails$.value = stockInfos[0]
    const stockDescription = `Name: ${stockDetails$.value.name} - WKN: ${stockDetails$.value.wkn} - ISIN: ${stockDetails$.value.isin}`

    const n = notification.success({
      title,
      content: 'Found stock '+stockDescription,
      action: () => h(NButton, {
        onClick: () => {
          n.destroy()
          saveStock()
        }
        },
        {default: () => 'Save'}
      )
    })
  }
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
        <n-input v-model:value="stockRef$.isin" @focusout="findStock" placeholder="ISIN/WKN"></n-input>
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
