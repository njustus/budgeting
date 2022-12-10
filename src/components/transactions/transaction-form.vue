<script setup="setup" lang="ts">
import {useAppStore} from '@/stores/app-state'
import {ref} from 'vue'
import type {Tag, Transaction} from "@/models/state";
import {TransactionRecurrence, TransactionType} from "@/models/state";
import { v4 as uuidv4 } from 'uuid';

const store = useAppStore();

const transactionModel = ref({
  title: 'a placeholder',
  recurrence: TransactionRecurrence.once,
  type: TransactionType.Expense,
  date: new Date().getTime(),
  amount: 0,
  tags: []
})

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

const tagsOptions = store.availableTags.map(tag => ({label: tag.name, value: tag}))

function saveTransaction() {
  const transaction = {
    ...transactionModel.value,
    id: uuidv4(),
    // tags: (transactionModel.value.tags as any).value,
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
     </n-form-item-row>

     <n-form-item-row>
       <n-form-item label="Typ" path="type">
         <n-select v-model:value="transactionModel.type" :options="typeOptions"/>
       </n-form-item>
       <n-form-item label="Recurrence" path="recurrence">
         <n-select v-model:value="transactionModel.recurrence" :options="recurrencesOptions"/>
       </n-form-item>
     </n-form-item-row>

     <n-form-item label="Tags" path="tags">
       <n-select v-model:value="transactionModel.tags" :options="tagsOptions" multiple />
     </n-form-item>

     <n-button type="success" attr-type="button" @click="saveTransaction">Save</n-button>
   </n-form>
 </n-space>
</template>

<style scoped>

</style>
