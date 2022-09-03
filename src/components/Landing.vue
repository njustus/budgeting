<script setup lang="ts">
import { inject } from 'vue'
import type {Transaction} from '../stores/app-state'

const transactions: Transaction[] = inject('transactions')

defineProps<{    
}>()

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
</template>

<style scoped>
</style>
