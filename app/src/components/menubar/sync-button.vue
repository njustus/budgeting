<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {synchronizer} from '@/services/synchronizer'
import {computed, ref} from "vue";
import {useNotification} from "naive-ui";
import FaIcon from '@/components/common/fa-icon.vue'
import type {SIZINGS} from "@/services";

const props = defineProps<{ sizing: SIZINGS }>();
const notification = useNotification()
const store = useAppStore();
const isSyncing = ref(false)
const lastSynced = computed(() => store.lastSynced ? store.lastSynced.toLocaleString() : 'Never')

async function doSync() {
  const stateKey = store.stateKey
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

</script>

<template>
  <n-grid cols="1" rows="2">
    <n-gi>
      <n-input-group>
        <n-input v-model:value="store.stateKey" :size="props.sizing"></n-input>
        <n-button type="primary" @click="doSync" :loading="isSyncing" :size="props.sizing">
          <FaIcon icon="sync" v-if="!isSyncing"></FaIcon>&nbsp;Sync
        </n-button>
      </n-input-group>
    </n-gi>
    <n-gi>
      <small>Last synchronised: {{ lastSynced }}</small>
    </n-gi>
  </n-grid>
</template>


<style scoped>

</style>
