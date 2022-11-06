<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {isSameYear} from "date-fns";
import {TransactionType} from "@/models/state";
import {Doughnut} from 'vue-chartjs';
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)


const store = useAppStore();

function dataset(timeframe: Date) {
  const transactionsWithinYear = store.totalTransactions.filter(t => isSameYear(timeframe, t.date))

  const perTag = transactionsWithinYear
      .filter(t => t.type === TransactionType.Expense)
      .reduce((acc, t) => {
    const existingTag = t.tags.map(t => t.name).find(key => Boolean(acc[key]))
    let tag = existingTag ? existingTag : t.tags[0].name;

    acc[tag] = (acc[tag] || 0) + t.amount;
    return acc;
  }, {} as {[k:string]: number})

  console.log("per tag: ", perTag);

  const result = {
    labels: [] as string[],
    datasets: [
      {
        backgroundColor: ['red', 'blue'], //TODO each tag needs a unique color
        data: [] as number[]
      }
    ]
  };

  for(let key in perTag) {
    result.labels.push(key)
    result.datasets[0].data.push(perTag[key])
  }

  return result;
}

const date = new Date(2021,0,1)
const data = dataset(date)

  const chartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Ausgabenkategorien innerhalb '+date.toLocaleDateString()
    }
  }
}
</script>

<template>
  <Doughnut
    :chart-data="data"
    :chart-options="chartOptions"
  ></Doughnut>
</template>

<style scoped>

</style>