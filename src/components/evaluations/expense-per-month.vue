<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {startOfMonth} from "date-fns";
import {Line} from 'vue-chartjs';
import {
  LineElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  BarElement,
  PointElement
} from 'chart.js'
import * as R from 'ramda'
import type {Transaction} from "@/models/state";
import {TransactionType} from "@/models/state";
import {date} from "@/utils/formats";

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
  console.log("amounts: ", amounts)
  console.log("expense groups: ", expenseMonthGroups, "income groups: ", incomeGroups)

  return {
    labels: expenseMonthGroups.map(d => date.format(d.label)),
    datasets: [
      {
        label: 'Expenses',
        data: expenseMonthGroups.map(d => d.amount),
        borderColor: 'red'
      },
      {
        label: 'Income',
        data: incomeGroups.map(d => d.amount),
        borderColor: 'green'
      }
    ]
  }
}

const data = expensesPerMonth()

</script>

<template>
  <p>expense per month</p>
  <Line
    :chart-data="data"
  ></Line>
</template>


<style scoped>

</style>