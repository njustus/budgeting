<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {isSameYear} from "date-fns";
import {TransactionType} from "@/models";
import {Bar} from 'vue-chartjs';
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)


const store = useAppStore();
//TODO allow selecting year, month
function dataset(timeframe: Date) {
  const transactionsWithinYear = store.totalTransactions.filter(t => isSameYear(timeframe, t.startDate))

  const expensesAmount =transactionsWithinYear.filter(t => t.type === TransactionType.Expense)
      .map(t => t.amount)
      .reduce((acc,x) => acc+x)

  const incomeAmount = transactionsWithinYear.filter(t => t.type === TransactionType.Income)
        .map(t => t.amount)
      .reduce((acc,x) => acc+x)

  return {
    labels: ['Expenses', 'Income'],
    datasets: [
      {
        label: 'Ein-/Ausgaben',
        backgroundColor: ['rgb(255, 99, 132)', 'green'],
        data: [expensesAmount, incomeAmount]
      }
    ]
  }
}

const date = new Date(2021,0,1)
const data =dataset(date)
const chartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Ein-/Ausgaben innerhalb '+date.toLocaleDateString()
    }
  }
}
</script>

<template>
  <Bar
    :chart-data="data"
    :chart-options="chartOptions"
  ></Bar>
</template>

<style scoped>

</style>
