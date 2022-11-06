<script setup lang="ts">
import { useAppStore } from '@/stores/app-state'
import { inject } from 'vue'
import type {Transaction} from '../models/state'
import TransactionList from './transactions/transaction-list.vue'

</script>

<template>
<div class="w3-container">

    <div class="">
        <h2>Transactions</h2>

        <TransactionList />
    </div>
</div>
</template>

<style scoped>
</style>
