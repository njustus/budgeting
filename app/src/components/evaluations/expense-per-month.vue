<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {startOfMonth} from "date-fns";
import {Bar} from 'vue-chartjs';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import * as R from 'ramda'
import type {Transaction} from "@/models/state";
import {TransactionType} from "@/models/state";
import {date} from "@/utils/formats";
import {computed} from "vue";


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
);

const store = useAppStore();

class MonthData {
  constructor(public readonly label: string,
              public readonly transactions: Transaction[]) {}

  get amount(): number {
    return this.transactions.reduce((acc, t) => acc+t.amount, 0)
  }

  static fromGroup(obj: any): MonthData[] {
    return Object.keys(obj).map(key => new MonthData(key, obj[key]))
  }
}

function expensesPerMonth() {
  const grouper = (transaction: Transaction): string => {
    return startOfMonth(transaction.date).toDateString()
  }

  const buildGroups = R.groupBy(grouper)

  const expenses = store.totalTransactions.filter(t => t.type === TransactionType.Expense)
  const incomes = store.totalTransactions.filter(t => t.type === TransactionType.Income)

  const expenseMonthGroups = MonthData.fromGroup(buildGroups(expenses))
  const incomeGroups = MonthData.fromGroup(buildGroups(incomes))
  const amounts = expenseMonthGroups.map(x => x.amount)

  return {
    labels: expenseMonthGroups.map(d => date.format(d.label)),
    datasets: [
      {
        label: 'Expenses',
        data: expenseMonthGroups.map(d => d.amount),
        backgroundColor: 'rgba(255, 99, 110, 0.8)',
        borderColor: 'rgba(255, 99, 132)'
      },
      {
        label: 'Income',
        data: incomeGroups.map(d => d.amount),
        backgroundColor: 'rgba(75, 220, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192)'
      }
    ]
  }
}

const data = computed(expensesPerMonth)

</script>

<template>
  <p>expense per month</p>
  <Bar
    :chart-data="data"
  ></Bar>
</template>


<style scoped>

</style>
