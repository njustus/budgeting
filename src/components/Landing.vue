<script setup lang="ts">
import { useAppStore } from '@/stores/app-state'
import { inject } from 'vue'
import type {Transaction} from '../models/state'
import TransactionForm from './TransactionForm.vue'

const transactionStore = useAppStore();

const transactions = transactionStore.transactions;

</script>

<template>
<div>
    <h2>Transactions</h2>
    <ul>
        <li v-for="(tx, idx) of transactions" v-bind:key="idx">
            <p>{{tx.title}} ({{tx.amount}} €)</p>
            <small>{{tx.description}}</small>
        </li>
    </ul>
</div>
<TransactionForm/>
</template>

<style scoped>
</style>
