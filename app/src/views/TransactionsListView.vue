<script setup lang="ts">
import TransactionList from '@/components/transactions/transaction-list.vue'
import TransactionForm from '@/components/transactions/transaction-form.vue'
import TransactionRangeForm from '@/components/transactions/transaction-range-form.vue'
import ExpensePerMonth from "@/components/evaluations/expense-per-month.vue";
</script>

<template>
  <n-grid :cols="4" item-responsive responsive="screen" class="default-grid">
    <n-gi span="4 m:2">
      <TransactionForm />
    </n-gi>
    <n-gi span="0 m:2">
      <h2>Expenses Per Month</h2>
      <expense-per-month></expense-per-month>
    </n-gi>
    <n-gi :span="4">
      <h2>Transactions</h2>
      <transaction-range-form></transaction-range-form>
      <TransactionList/>
    </n-gi>
  </n-grid>
</template>

<style scoped>

</style>