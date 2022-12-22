<script setup lang="ts">
import {RouterLink} from 'vue-router'
import {h, ref} from 'vue'
import type {MenuOption} from "naive-ui";
import SyncButton from '@/components/menubar/sync-button.vue'
import ConnectionIndicator from '@/components/menubar/connection-indicator.vue'
import FaIcon from '@/components/common/fa-icon.vue'

const collapsed = ref(false)

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, {to: '/transactions', activeClass: 'success'}, () => "Home"),
    key: 'transactions',
    icon: () => h(FaIcon, {icon: 'home'})
  }, {
    label: () => h(RouterLink, {to: '/analysis', activeClass: 'success'}, () => "Analysis"),
    key: 'analysis',
    icon: () => h(FaIcon, {icon: 'chart-pie'})
  }, {
    label: () => h(RouterLink, {to: '/options', activeClass: 'success'}, () => "Options"),
    key: 'options',
    icon: () => h(FaIcon, {icon: 'wrench'})
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
    <n-menu mode="horizontal"
            :options="menuOptions"
            :collapsed="collapsed"
            :collapsed-icon-size="24"
            :collapsed-width="64" />
</template>

<style scoped>

</style>
