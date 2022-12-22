<script setup lang="ts">
import {defineProps} from 'vue'

interface Props {
  type?: string,
  icon: string
}

const props =defineProps<Props>()

const cssClasses = ['fa', 'fa-'+(props.type || 'solid'), 'fa-'+props.icon]
</script>

<template>
  <i :class="cssClasses"></i>
</template>

<style scoped>

</style>
