<script setup lang="ts">
import { useAppStore } from '@/stores/app-state'
import { inject } from 'vue'
import type {Transaction} from '../models/state'

const transactionStore = useAppStore();
const transactions = transactionStore.transactions;

</script>

<template>
<ul class="w3-ul">
    <li v-for="(tx, idx) of transactions" v-bind:key="idx">
        <p>{{tx.title}} ({{tx.amount}} €)</p>
        <small>{{tx.description}}</small>
    </li>
</ul>
</template>

<style scoped>

</style>