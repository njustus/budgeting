<script setup="setup" lang="ts">
import {useAppStore} from '@/stores/app-state'
import type {Transaction} from "@/models/state";
import {TransactionType} from "@/models/state";
import {currency, date} from '@/utils/formats';

const store = useAppStore();

function monthDescription(idx:number): string | null {
    const t2 = store.sortedTransactions[idx]
    const getDateString = () => date.format(new Date(t2.date.getFullYear(), t2.date.getMonth()+1, 1))

    if(idx===0) {
        return getDateString()
    }

    const t1 = store.sortedTransactions[idx-1]

    const isMonthDifferent = t1.date.getFullYear() != t2.date.getFullYear() || t1.date.getMonth() != t2.date.getMonth()
    return isMonthDifferent ? getDateString() : null
}

type AmountType = 'error' | 'success'

function getAmountType(amount: number): AmountType {
  return amount > 0 ? 'success' : 'error'
}

function getType(transaction: Transaction): AmountType {
  switch(transaction.type) {
    case TransactionType.Expense:
      return 'error'
    case TransactionType.Income:
      return 'success'
  }
}
</script>

<template>
  <n-list>
    <template v-for="(transaction, idx) of store.sortedTransactions" v-bind:key="idx">
      <n-list-item v-if="monthDescription(idx)">
        <n-thing>
          <strong>{{ monthDescription(idx) }}</strong>
        </n-thing>
        <template #suffix>
          <strong><n-text :type="getAmountType(store.runningSum[idx])">{{currency.format(store.runningSum[idx])}}</n-text></strong>
        </template>
      </n-list-item>

      <n-list-item>
        <n-thing>
          <template #description>
            <n-tag type="info" size="small" :bordered="false" v-for="tag of transaction.tags">{{tag.name}}</n-tag>
          </template>
          {{transaction.title}}
        </n-thing>

        <template #prefix>{{date.format(transaction.date)}}<small>&nbsp;({{transaction.recurrence}})</small></template>
        <template #suffix>
            <n-text :type="getType(transaction)">{{currency.format(transaction.amount)}}</n-text>
        </template>
      </n-list-item>
      </template>
  </n-list>

  <ul>
    <li v-for="transaction of store.sortedTransactions">
      {{JSON.stringify(transaction)}}
    </li>
  </ul>
</template>
