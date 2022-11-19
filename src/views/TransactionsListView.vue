<script setup lang="ts">
import TransactionList from '@/components/transactions/transaction-list.vue'
import TransactionForm from '@/components/transactions/transaction-form.vue'
import ExpensePerMonth from "@/components/evaluations/expense-per-month.vue";
</script>

<template>
  <n-grid :cols="3" class="default-grid">
    <n-gi>
      <TransactionForm />
    </n-gi>
    <n-gi :span="2">
      <h2>Expenses Per Month</h2>
      <expense-per-month></expense-per-month>
    </n-gi>
    <n-gi :span="3">
      <h2>Transactions</h2>
      <TransactionList/>
    </n-gi>
  </n-grid>
</template>

<style scoped>

</style>