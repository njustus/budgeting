<script setup lang="ts">
import { useAppStore } from '@/stores/app-state'
import { inject } from 'vue'
import type {Transaction} from '../models/state'

const transactionStore = useAppStore();
const transactions = transactionStore.transactions;

</script>

<template>
<ul class="w3-ul w3-card-4">
    <li class="w3-bar" v-for="(tx, idx) of transactions" v-bind:key="idx">
        <span class="w3-bar-item w3-circle w3-left">
            <i class="fa fa-home"></i>
        </span>
        <div class="w3-bar-item">
            <span class="w3-large">{{tx.title}} ({{tx.amount}} €)</span>            
            <small>{{tx.description}}</small>            
        </div>
        <strong class="w3-bar-item w3-right"> {{tx.amount}} € </strong>
    </li>
</ul>
</template>

<style scoped>

</style>