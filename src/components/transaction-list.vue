<script setup lang="ts">
import { useAppStore } from '@/stores/app-state'
import { inject } from 'vue'
import type {Transaction} from '../models/state'

const transactionStore = useAppStore();
const transactions = transactionStore.sortedTransactions;
const total = transactionStore.totalBalance;

function amountClass(tx: Transaction) {
    return tx.amount >= 0 ? 'w3-text-green' : 'w3-text-red';
}

function monthDescription(idx:number): Date|null {
    if(idx===0) {
        return null
    }

    const t1 = transactions[idx-1]
    const t2 = transactions[idx]
    
    const isMonthDifferent = t1.date.getFullYear() != t2.date.getFullYear() || t1.date.getMonth() != t2.date.getMonth()
    return isMonthDifferent ? new Date(t2.date.getFullYear(), t2.date.getMonth(), 1) : null
}
</script>

<template>
<ul class="w3-ul w3-card-4">
    <li class="w3-bar">
        <span class="w3-bar-item w3-circle w3-left">
            <i class="fa fa-coins"></i>
        </span>
        <div class="w3-bar-item">
            <i class="fa fa-calendar"></i>&nbsp;
            <span>{{new Date().toLocaleDateString()}}</span>
        </div>
        <div class="w3-bar-item">
            <span class="w3-large">Total</span>            
        </div>
        
        <strong class="w3-bar-item w3-right" v-bind:class="amountClass({amount: total})"> {{total.toLocaleString()}} € </strong>
    </li>


    <template  v-for="(tx, idx) of transactions" v-bind:key="idx">
        <li class="w3-bar" v-if="monthDescription(idx)!==null">
            <h4 class="w3-bar-item">{{monthDescription(idx).toLocaleDateString()}}</h4>
        </li>

        <li class="w3-bar">
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
    </template>
</ul>
</template>

<style scoped>

</style>