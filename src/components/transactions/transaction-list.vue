<script setup lang="ts">
import { useAppStore } from '@/stores/app-state'
import { inject } from 'vue'

const store = useAppStore();
const transactions = store.sortedTransactions;

</script>

<template>
  <ul>
    <li v-for="transaction of transactions">
      {{JSON.stringify(transaction)}}
    </li>
  </ul>
</template>