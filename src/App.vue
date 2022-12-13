<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {h} from 'vue'
import type {MenuOption} from "naive-ui";

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
  }
]

</script>

<template>
  <n-menu mode="horizontal" :options="menuOptions"/>
  <RouterView></RouterView>
</template>

<style scoped>
</style>
