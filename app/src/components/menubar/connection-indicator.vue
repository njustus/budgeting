<script setup lang="ts">
import type {CSSProperties} from 'vue'
import {useAppStore} from '@/stores/app-state'

const store = useAppStore();

function railStyle(info: { focused: boolean, checked: boolean }): CSSProperties {
  return {
    background: info.checked ? 'green' : 'red'
  }
}

</script>

<template>
  <n-switch :rail-style="railStyle" v-model:value="store.isOnline" disabled>
    <template #checked>
      Online
    </template>
    <template #unchecked>
      Offline
    </template>
  </n-switch>
</template>

<style scoped>

</style>
