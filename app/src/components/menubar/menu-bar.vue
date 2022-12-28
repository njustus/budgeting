<script setup lang="ts">
import {RouterLink} from 'vue-router'
import {h, ref} from 'vue'
import type {MenuOption} from "naive-ui";
import SyncButton from '@/components/menubar/sync-button.vue'
import ConnectionIndicator from '@/components/menubar/connection-indicator.vue'
import FaIcon from '@/components/common/fa-icon.vue'
import {pageSize} from "@/services";

const pageDimensions = pageSize.setup()
const collapsed = ref(false)

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, {to: '/transactions', activeClass: 'success'}, () => "Home"),
    key: 'transactions',
    icon: () => h(FaIcon, {icon: 'home'})
  },{
    label: () => h(RouterLink, {to: '/stocks', activeClass: 'success'}, () => "Stocks"),
    key: 'stocks',
    icon: () => h(FaIcon, {icon: 'landmark'})
  }, {
    label: () => h(RouterLink, {to: '/analysis', activeClass: 'success'}, () => "Analysis"),
    key: 'analysis',
    icon: () => h(FaIcon, {icon: 'chart-pie'}),
  }, {
    label: () => h(RouterLink, {to: '/options', activeClass: 'success'}, () => "Options"),
    key: 'options',
    icon: () => h(FaIcon, {icon: 'wrench'})
  }]
</script>

<template>
  <n-space justify="space-between">
    <!-- menubar for desktop -->
    <n-menu mode="horizontal"
            :options="menuOptions"
      v-if="!pageDimensions.isMobile" />

    <!-- menu for mobiles -->
    <n-popover
      trigger="click"
      v-if="pageDimensions.isMobile">
      <template #trigger>
        <n-button quaternary><FaIcon icon="bars"></FaIcon></n-button>
      </template>
      <n-menu mode="vertical" :options="menuOptions"></n-menu>
    </n-popover>

    <!-- displayed everywhere -->
    <SyncButton :sizing="pageDimensions.componentSizing"></SyncButton>
    <ConnectionIndicator :sizing="pageDimensions.componentSizing"></ConnectionIndicator>
  </n-space>

</template>

<style scoped>

</style>
