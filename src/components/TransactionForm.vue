<script setup lang="ts">
    import { useAppStore } from '@/stores/app-state'
    import { inject, ref } from 'vue'
    import type {Transaction} from '../models/state'

    const appStore = useAppStore();
    const formValue = ref<Transaction>({
        title: '',
        amount: 0
    })

    function save() {
        const t = formValue.value
        appStore.addTransaction(t)
    }
</script>

<template>
    <form @submit.prevent="save()">
        <label>Title</label>
        <input v-model="formValue.title" />

        <label>Amount</label>
        <input type="decimal" step="0.01" v-model="formValue.amount" />
        
        <button type="submit">Save</button>
    </form>
    <p>{{formValue}}</p>
</template>

<style scoped>

</style>