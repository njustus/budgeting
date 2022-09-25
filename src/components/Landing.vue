<script setup lang="ts">
import { useAppStore } from '@/stores/app-state'
import { inject } from 'vue'
import type {Transaction} from '../models/state'
import TransactionForm from './TransactionForm.vue'
import TransactionList from './transaction-list.vue'

</script>

<template>
<div class="w3-container">
    <div class="">
        <TransactionForm />
    </div>

    <div class="">
        <h2>Transactions</h2>
        <TransactionList />
    </div>
</div>
</template>

<style scoped>
</style>
