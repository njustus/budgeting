<script setup lang="ts">
import {type CSSProperties, defineProps} from 'vue'
import {useAppStore} from '@/stores/app-state'
import type {SIZINGS} from "@/services";

const props = defineProps<{ sizing: SIZINGS }>();
const store = useAppStore();

function railStyle(info: { focused: boolean, checked: boolean }): CSSProperties {
  return {
    background: info.checked ? 'green' : 'red'
  }
}

</script>

<template>
  <n-switch :rail-style="railStyle" v-model:value="store.isOnline" :size="props.sizing" disabled>
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
