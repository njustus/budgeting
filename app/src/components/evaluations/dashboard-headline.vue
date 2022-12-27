<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {currency} from '@/utils/formats'
import FaIcon from '@/components/common/fa-icon.vue'

const store = useAppStore()
const notgroschen = 500.58
const depot = 50658.58
const everything = store.totalBalance + notgroschen + depot

</script>

<template>
<n-space justify="center" size="large" :size="'large'">
      <n-statistic label="Giro">
        <template #prefix>
          <FaIcon icon="wallet"></FaIcon>
        </template>

        <n-text :type="'info'">{{ currency.format(store.totalBalance) }}</n-text>
      </n-statistic>

      <n-statistic label="Notgroschen">
        <template #prefix>
          <FaIcon icon="piggy-bank"></FaIcon>
        </template>
        {{ currency.format(notgroschen) }}
      </n-statistic>

      <n-statistic label="Geldanlage">
        <template #prefix>
          <FaIcon icon="landmark"></FaIcon>
        </template>
        {{ currency.format(depot) }}
      </n-statistic>

      <n-statistic label="Total">
        <template #prefix>
          <FaIcon icon="money-bill"></FaIcon>
        </template>
        <n-text :type="'success'"><strong>{{ currency.format(everything) }}</strong></n-text>
      </n-statistic>
</n-space>
</template>

<style scoped>

</style>
