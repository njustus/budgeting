<script setup lang="ts">
import TransactionList from '@/components/transactions/transaction-list.vue'
import TransactionForm from '@/components/transactions/transaction-form.vue'
</script>

<template>
  <div>
    <TransactionForm />
  </div>
    <div class="">
        <h2>Transactions <a href="/analysis">Analysis</a></h2>
        <TransactionList />
    </div>
</template>

<style scoped>

</style>