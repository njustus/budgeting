<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {isSameYear} from "date-fns";
import {type Tag, TransactionType} from "@/models";
import {Doughnut} from 'vue-chartjs';
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)


const store = useAppStore();

function dataset(timeframe: Date) {
  const unknown: Tag = {
    name: 'Unbekannt',
    color: 'lightgrey'
  };
  const tagToColor = new Map<string, string>(store.availableTags.map(tag => [tag.name, tag.color]))
  tagToColor.set(unknown.name, unknown.color)

  const transactionsWithinYear = store.totalTransactions.filter(t => isSameYear(timeframe, t.date))
  const perTag = transactionsWithinYear
      .filter(t => t.type === TransactionType.Expense)
      .reduce((acc, t) => {
    const existingTag = t.tags.map(t => t.name).find(key => Boolean(acc[key]))
    let tag = existingTag ? existingTag : t.tags[0]?.name || unknown.name;

    acc[tag] = (acc[tag] || 0) + t.amount;
    return acc;
  }, {} as {[k:string]: number})

  const result = {
    labels: [] as string[],
    datasets: [
      {
        backgroundColor: [] as string[],
        data: [] as number[]
      }
    ]
  };

  for(let key in perTag) {
    result.labels.push(key)
    result.datasets[0].backgroundColor.push(tagToColor.get(key)!)
    result.datasets[0].data.push(perTag[key])
  }

  return result;
}

const date = new Date()
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
