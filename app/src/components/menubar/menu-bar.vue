<script setup lang="ts">
import {RouterLink} from 'vue-router'
import {h, ref} from 'vue'
import type {MenuOption} from "naive-ui";
import SyncButton from '@/components/menubar/sync-button.vue'
import ConnectionIndicator from '@/components/menubar/connection-indicator.vue'
import FaIcon from '@/components/common/fa-icon.vue'
import {pageSize} from "@/services";

const pageDimensions = pageSize.setup()
const showDrawer = ref(false)

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
    <n-button @click="() => showDrawer=true" v-if="pageDimensions.isMobile">
      <FaIcon icon="bars"></FaIcon>
    </n-button>
    <n-drawer v-model:show="showDrawer" width="70%" placement="left">
      <n-drawer-content title="Menu">
        <n-menu mode="vertical" :options="menuOptions"></n-menu>

      <template #footer>
        <n-grid :cols="1">
          <n-gi>
            <SyncButton :sizing="pageDimensions.componentSizing"></SyncButton>
          </n-gi>
          <n-gi>
            <ConnectionIndicator :sizing="pageDimensions.componentSizing"></ConnectionIndicator>
          </n-gi>
        </n-grid>
      </template>

      </n-drawer-content>
    </n-drawer>

    <!-- displayed everywhere -->
    <SyncButton :sizing="pageDimensions.componentSizing" v-if="!pageDimensions.isMobile"></SyncButton>
    <ConnectionIndicator :sizing="pageDimensions.componentSizing"></ConnectionIndicator>
  </n-space>

</template>

<style scoped>

</style>
