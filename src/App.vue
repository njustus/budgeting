<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {h} from 'vue'
import Landing from './components/Landing.vue'
import type {MenuOption} from "naive-ui";

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, {to: '/transactions', activeClass: 'success'}, "Home"),
    key: 'transactions'
  }, {
    label: () => h(RouterLink, {to: '/analysis', activeClass: 'success'}, "Analysis"),
    key: 'analysis'
  }
]

</script>

<template>
  <n-menu mode="horizontal" :options="menuOptions" />
  <RouterView></RouterView>
</template>

<style scoped>
</style>
