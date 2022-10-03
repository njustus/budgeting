<script setup lang="ts">
import { useAppStore } from '@/stores/app-state'
import { inject } from 'vue'
import type {Transaction} from '../models/state'

const transactionStore = useAppStore();
const transactions = transactionStore.sortedTransactions;

function amountClass(tx: Transaction) {
    return tx.amount >= 0 ? 'w3-text-green' : 'w3-text-red';
}
</script>

<template>
<ul class="w3-ul w3-card-4">
    <li class="w3-bar" v-for="(tx, idx) of transactions" v-bind:key="idx">
        <span class="w3-bar-item w3-circle w3-left">
            <i class="fa fa-coins"></i>
        </span>
        <div class="w3-bar-item">
            <i class="fa fa-calendar"></i>&nbsp;
            <span>{{tx.date.toLocaleDateString()}}</span>
        </div>
        <div class="w3-bar-item">
            <span class="w3-large">{{tx.title}}</span><br/>
            <small class="">{{tx.description}}</small>
        </div>
        
        <strong class="w3-bar-item w3-right" v-bind:class="amountClass(tx)"> {{tx.amount.toLocaleString()}} € </strong>
    </li>
</ul>
</template>

<style scoped>

</style>