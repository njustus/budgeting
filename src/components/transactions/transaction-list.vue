<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import type {Transaction} from "@/models/state";
import {TransactionType} from "@/models/state";

const store = useAppStore();
//TODO intermediate sums per month

function monthDescription(idx:number): string | null {
    const t2 = store.sortedTransactions[idx]
    const getDateString = () => new Date(t2.date.getFullYear(), t2.date.getMonth()+1, 1).toLocaleDateString()

    if(idx===0) {
        return getDateString()
    }

    const t1 = store.sortedTransactions[idx-1]

    const isMonthDifferent = t1.date.getFullYear() != t2.date.getFullYear() || t1.date.getMonth() != t2.date.getMonth()
    return isMonthDifferent ? getDateString() : null
}


function getType(transaction: Transaction): 'error' | 'success' {
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
          TODO display running sum
        </n-thing>
      </n-list-item>

      <n-list-item>
        <n-thing>
          <template #description>
            <n-tag type="info" size="small" :bordered="false" v-for="tag of transaction.tags">{{tag.name}}</n-tag>
          </template>
          {{transaction.title}}
        </n-thing>

        <template #prefix>{{transaction.date.toLocaleDateString()}}<small>&nbsp;({{transaction.recurrence}})</small></template>
        <template #suffix>
          <strong>
            <n-text :type="getType(transaction)">{{transaction.amount.toLocaleString()}} €</n-text>
          </strong>
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