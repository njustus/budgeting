<script setup="setup" lang="ts">
import {useAppStore} from '@/stores/app-state'
import {zeroTransactionRange} from "@/models/state";
import {computed, ref} from "vue";

const zeroRange = zeroTransactionRange()
const store = useAppStore();
const rangeModel = store.transactionRange

function resetRange() {
  rangeModel.start = zeroRange.start
  rangeModel.end = zeroRange.end
}

</script>

<template>

  <n-form :model="rangeModel">
    <n-form-item-row>
      <n-form-item label="Begin" path="start">
        <n-date-picker v-model:value="rangeModel.start" type="date"></n-date-picker>
      </n-form-item>

      <n-form-item label="End" path="end">
        <n-date-picker v-model:value="rangeModel.end" type="date"></n-date-picker>
      </n-form-item>
      <n-button type="warning" @click="resetRange">Reset</n-button>
    </n-form-item-row>
  </n-form>

</template>


<style scoped>

</style>