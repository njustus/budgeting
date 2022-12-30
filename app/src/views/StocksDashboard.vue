<script setup lang="ts">
import StockList from "@/components/stocks/stock-list.vue";
import {currency} from '@/utils/formats'
import {useAppStore} from '@/stores/app-state'

const store = useAppStore();

</script>

<template>
  <n-space :justify="'space-between'">
    <h1>Depot</h1>
    <h1>
      <n-text :type="'success'">{{ currency.format(store.depotBalance) }}</n-text>
    </h1>
  </n-space>
  <stock-list></stock-list>
</template>


<style scoped>

</style>
