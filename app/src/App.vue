<script setup lang="ts">
import MenuBar from "@/components/menubar/menu-bar.vue";</script>

<template>
  <n-notification-provider>
    <menu-bar></menu-bar>
    <RouterView></RouterView>
  </n-notification-provider>
</template>

<style scoped>
</style>
