<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {synchronizer} from '@/services/synchronizer'
import {ref} from "vue";
import {useNotification} from "naive-ui";

const notification = useNotification()
const store = useAppStore();
const isSyncing = ref(false)
const stateKey = store.stateKey

async function doSync() {
  isSyncing.value = true

  const backendState = await synchronizer.getState(stateKey)
  const mergedState = synchronizer.mergeState(store.$state, backendState)
  store.$patch(mergedState)

  await synchronizer.sync(stateKey, store.$state)
  isSyncing.value = false

  notification.info({
    title: 'Saved',
    description: 'State saved at key: '+stateKey
  })
}

</script>

<template>
  <n-grid :cols="2" :x-gap="10">
    <n-gi>
      <n-input v-model:value="stateKey"></n-input>
    </n-gi>

    <n-gi>
      <n-button type="primary" @click="doSync" :loading="isSyncing">Sync</n-button>
    </n-gi>
  </n-grid>

</template>


<style scoped>

</style>
