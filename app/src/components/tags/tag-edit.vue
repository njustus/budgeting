<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import type {Tag} from "@/models/state";
import {ref} from "vue";

const store = useAppStore();

const tagModel = ref({
  name: '',
  color: 'rgb(0,180,120)'
} as Tag)

function saveTag() {
  console.log("saving", tagModel.value)
  store.addTag({...tagModel.value})
}

</script>

<template>
  <n-space vertical>
    <n-form :model="tagModel">
      <n-form-item label="Name" path="name">
        <n-input v-model:value="tagModel.name" />
      </n-form-item>

      <n-form-item :label="`Color`" path="color">
        <n-color-picker v-model:value="tagModel.color" :show-alpha="false" />
      </n-form-item>
    </n-form>
      <p>{{tagModel}}</p>
    <n-button type="success" attr-type="button" @click="saveTag">Save</n-button>
  </n-space>
</template>

<style scoped>

</style>
