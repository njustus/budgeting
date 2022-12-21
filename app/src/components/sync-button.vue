<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {synchronizer} from '@/services/synchronizer'
import {computed, ref} from "vue";
import {useNotification} from "naive-ui";

const notification = useNotification()
const store = useAppStore();
const isSyncing = ref(false)
const stateKey = store.stateKey
const lastSynced = computed(() => store.lastSynced ? store.lastSynced.toLocaleString() : 'Never')

async function doSync() {
  isSyncing.value = true

  const backendState = await synchronizer.getState(stateKey)
  const mergedState = synchronizer.mergeState(store.$state, backendState)
  mergedState.lastSynced = new Date()
  store.$patch(mergedState)

  await synchronizer.sync(stateKey, store.$state)
  isSyncing.value = false

  notification.info({
    title: 'Saved',
    description: 'State saved at key: '+stateKey
  })
}

//TODO state input not updating

</script>

<template>
  <n-space>
      <n-input-group>
        <n-input v-model:value="store.stateKey"></n-input>
        <n-button type="primary" @click="doSync" :loading="isSyncing">Sync</n-button>
      </n-input-group>
      <small>Last synchronised: {{ lastSynced }}</small>
  </n-space>
</template>


<style scoped>

</style>
