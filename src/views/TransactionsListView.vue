<script setup lang="ts">
import TransactionList from '@/components/transactions/transaction-list.vue'
import TransactionForm from '@/components/transactions/transaction-form.vue'
import TransactionRangeForm from '@/components/transactions/transaction-range-form.vue'
import ExpensePerMonth from "@/components/evaluations/expense-per-month.vue";
</script>

<template>
  <n-grid :cols="3" item-responsive class="default-grid">
    <n-gi span="3 m:1">
<!--      <TransactionForm />-->
    </n-gi>
    <n-gi span="0 m:2">
      <h2>Expenses Per Month</h2>
      <expense-per-month></expense-per-month>
    </n-gi>
    <n-gi :span="3">
      <h2>Transactions</h2>
      <transaction-range-form></transaction-range-form>
      <TransactionList/>
    </n-gi>
  </n-grid>
</template>

<style scoped>

</style>