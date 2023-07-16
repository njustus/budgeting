<script setup="setup" lang="ts">
import {useAppStore} from '@/stores/app-state'
import type {Tag, Transaction} from "@/models";
import {TransactionType} from "@/models";
import {currency, date, recurrence} from '@/utils/formats';
import * as R from 'ramda';
import {endOfMonth} from "date-fns";
import {computed} from "vue";
import FaIcon from "@/components/common/fa-icon.vue";

const store = useAppStore();
const tagNameToColor = new Map<string, string>(store.availableTags.map(t => [t.name, t.color]))
const transactions = computed(() => R.reverse(store.sortedTransactions))

function getSumForMonth(month: Date): number {
  month = endOfMonth(month)

  return R.sum(
    R.map((tx: Transaction) => tx.type === TransactionType.Expense ? tx.amount*(-1) : tx.amount,
      R.takeWhile((tx: Transaction) => tx.startDate <= month, store.sortedTransactions)))
}

function monthDescription(idx:number): string | null {
    const t2 = transactions.value[idx]
    const getDateString = () => date.formatMonth(new Date(t2.startDate.getFullYear(), t2.startDate.getMonth()+1, 1))

    if(idx===0) {
        return getDateString()
    }

    const t1 = transactions.value[idx-1]

    const isMonthDifferent = t1.startDate.getFullYear() != t2.startDate.getFullYear() || t1.startDate.getMonth() != t2.startDate.getMonth()
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

function getTagColor(tag: Tag) {
  const textColor = tagNameToColor.get(tag.name);
  return {
    textColor
  }
}

</script>

<template>
  <n-list>
    <template v-for="(transaction, idx) of transactions" v-bind:key="idx">
      <n-list-item v-if="monthDescription(idx)">
        <n-thing>
          <strong>{{ monthDescription(idx) }}</strong>
        </n-thing>
        <template #suffix>
          <strong><n-text :type="getAmountType(getSumForMonth(transaction.startDate))">{{ currency.format(getSumForMonth(transaction.startDate)) }}</n-text></strong>
        </template>
      </n-list-item>

      <n-list-item>
        <n-thing>
          <template #description>
            <n-tag type="info" :color="getTagColor(tag)" size="small" :bordered="false" v-for="tag of transaction.tags">{{tag.name}}</n-tag>
          </template>
          {{transaction.title}}
        </n-thing>

        <template #prefix>{{ date.format(transaction.startDate) }}
          <n-tooltip trigger="hover">
            <template #trigger><small>&nbsp;({{recurrence.format(transaction.recurrence).abbrev}})</small></template>
            {{recurrence.format(transaction.recurrence).fullName}}
          </n-tooltip>
        </template>
        <template #suffix>
            <n-text :type="getType(transaction)">{{currency.format(transaction.amount)}}</n-text>
            <n-button type="error" @click="store.deleteTransaction(transaction)"><fa-icon icon="trash"></fa-icon></n-button>
        </template>
      </n-list-item>
      </template>
  </n-list>
</template>
