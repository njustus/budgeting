<script setup lang="ts">
import TransactionList from '@/components/transactions/transaction-list.vue'
import TransactionForm from '@/components/transactions/transaction-form.vue'
import TransactionRangeForm from '@/components/transactions/transaction-range-form.vue'
import ExpensePerMonth from "@/components/evaluations/expense-per-month.vue";
import DashboardHeadline from "@/components/evaluations/dashboard-headline.vue";
import FaIcon from "@/components/common/fa-icon.vue";
import {ref} from "vue";

const showAddModal = ref<boolean>(false)

</script>

<template>
  <dashboard-headline></dashboard-headline>
  <n-grid :cols="4" item-responsive responsive="screen" class="default-grid">
    <n-gi span="0 m:4">
      <h2>Expenses Per Month</h2>
      <expense-per-month></expense-per-month>
    </n-gi>
    <n-gi :span="4">
      <h2>Transactions
        <n-button  :type="'primary'" style="float:right;" @click="showAddModal=true;"><FaIcon icon="plus"></FaIcon>&nbsp;</n-button>
      </h2>
      <transaction-range-form></transaction-range-form>
      <TransactionList/>
    </n-gi>
  </n-grid>

  <n-modal v-model:show="showAddModal" style="max-width:600px" role="dialog" aria-modal="true">
    <n-card>
      <TransactionForm @transaction-saved="showAddModal=false;"/>
    </n-card>
  </n-modal>
</template>

<style scoped>

</style>
