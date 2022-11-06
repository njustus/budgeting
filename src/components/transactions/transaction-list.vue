<script setup lang="ts">
import { useAppStore } from '@/stores/app-state'
import { inject } from 'vue'

const store = useAppStore();

//TODO add styling for a list
//TODO intermediate sums per month
</script>

<template>
  <ul>
    <li v-for="transaction of store.sortedTransactions">
      {{JSON.stringify(transaction)}}
    </li>
  </ul>
</template>