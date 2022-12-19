<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'

const store = useAppStore();
const tags = store.tags
</script>

<template>
<n-list>
  <n-list-item v-for="tag of tags" v-bind:key="tag.name">
    <span :style="{color: tag.color}">{{tag.name}}</span>
  </n-list-item>
</n-list>
</template>


<style scoped>

</style>
