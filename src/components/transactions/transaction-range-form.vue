<script setup="setup" lang="ts">
import {useAppStore} from '@/stores/app-state'
import {zeroTransactionRange} from "@/models/state";

const zeroRange = zeroTransactionRange()
const store = useAppStore();
const rangeModel = store.transactionRange

function resetRange() {
  rangeModel.start = zeroRange.start
  rangeModel.end = zeroRange.end
}

function updateRangeStart(value: number) {
  rangeModel.start = new Date(value)
}

function updateRangeEnd(value: number) {
  rangeModel.end = new Date(value)
}

</script>

<template>

  <n-form :model="rangeModel">
    <n-form-item-row>
      <n-form-item label="Begin" path="start">
        <n-date-picker :value="rangeModel.start?.getTime()" @update-value="updateRangeStart" type="date"></n-date-picker>
      </n-form-item>

      <n-form-item label="End" path="end">
        <n-date-picker :value="rangeModel.end.getTime()" @update-value="updateRangeEnd" type="date"></n-date-picker>
      </n-form-item>
      <n-button type="warning" @click="resetRange">Reset</n-button>
    </n-form-item-row>
  </n-form>

</template>


<style scoped>

</style>
