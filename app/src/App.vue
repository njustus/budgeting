<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {h} from 'vue'
import type {MenuOption} from "naive-ui";
import SyncButton from './components/sync-button.vue'
import ConnectionIndicator from './components/connection-indicator.vue'

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, {to: '/transactions', activeClass: 'success'}, () => "Home"),
    key: 'transactions'
  }, {
    label: () => h(RouterLink, {to: '/analysis', activeClass: 'success'}, () => "Analysis"),
    key: 'analysis'
  }, {
    label: () => h(RouterLink, {to: '/options', activeClass: 'success'}, () => "Options"),
    key: 'options'
  }, {
    label: () => h(SyncButton),
    key: 'sync'
  }, {
    label: () => h(ConnectionIndicator),
    key: 'mode'
  }
]

</script>

<template>
  <n-notification-provider>
    <n-menu mode="horizontal" :options="menuOptions"/>
    <RouterView></RouterView>
  </n-notification-provider>
</template>

<style scoped>
</style>
