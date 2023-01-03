<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import FaIcon from '@/components/common/fa-icon.vue'
import {currency} from '@/utils/formats'
import {computed} from "vue";
import DepositCounter from "@/components/evaluations/deposit-counter.vue";

const store = useAppStore()
const depot = computed(() => store.depotBalance)
const everything = computed(() => store.totalBalance + store.deposit.balance + depot.value)

</script>

<template>
<n-space justify="center" size="large" :size="'large'">
      <n-statistic label="Giro">
        <template #prefix>
          <FaIcon icon="wallet"></FaIcon>
        </template>

        <n-text :type="'info'">{{ currency.format(store.totalBalance) }}</n-text>
      </n-statistic>


      <deposit-counter></deposit-counter>

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
