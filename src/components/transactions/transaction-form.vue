<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {ref} from 'vue'
import type {Transaction} from "@/models/state";
import {TransactionRecurrence, TransactionType} from "@/models/state";

const store = useAppStore();

const transactionModel = ref({
  title: 'a placeholder',
  recurrence: TransactionRecurrence.monthly,
  type: TransactionType.Expense,
  date: new Date(),
  amount: 0
} as Transaction)

const recurrencesOptions = [
  {label: 'einmalig', value: TransactionRecurrence.once},
  {label: 'monatlich', value: TransactionRecurrence.monthly},
  {label: 'quartalsweise', value: TransactionRecurrence.quaterly},
  {label: 'jährlich', value: TransactionRecurrence.yearly},
]

const typeOptions = [
  {label: 'Ausgabe', value: TransactionType.Expense},
  {label: 'Einnahme', value: TransactionType.Income},
]

function saveTransaction() {
  const transaction = {
    ...transactionModel.value,
    date: new Date(transactionModel.value.date)
  }
  console.log("saving: ", transaction)
  store.addTransaction(transaction)
}

</script>

<template>
 <n-space vertical>
   <n-form
      :model="transactionModel"

      :onsubmit="saveTransaction"
   >
     <n-form-item label="Title" path="title">
       <n-input v-model:value="transactionModel.title"/>
     </n-form-item>

     <n-form-item-row>
       <n-form-item label="Amount" path="amount">
         <n-input-number v-model:value="transactionModel.amount"/>
       </n-form-item>
       <n-form-item label="Date" path="date">
         <n-date-picker v-model:value="transactionModel.date" type="date"/>
       </n-form-item>
       <n-form-item label="Typ" path="type">
         <n-select v-model:value="transactionModel.type" :options="typeOptions"/>
       </n-form-item>
       <n-form-item label="Recurrence" path="recurrence">
         <n-select v-model:value="transactionModel.recurrence" :options="recurrencesOptions"/>
       </n-form-item>
     </n-form-item-row>

     <n-button type="success" attr-type="submit">Save</n-button>
   </n-form>
 </n-space>
</template>

<style scoped>

</style>