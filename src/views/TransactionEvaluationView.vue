<template>
<div>
  <income-expense></income-expense>
  <expense-per-month></expense-per-month>
  <expense-categories></expense-categories>
</div>
</template>

<script setup lang="ts">
import IncomeExpense from '@/components/evaluations/income-expense.vue'
import ExpenseCategories from "@/components/evaluations/expense-categories.vue";
import ExpensePerMonth from "@/components/evaluations/expense-per-month.vue";
</script>

<style scoped>

</style>