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
    <form class="w3-container" @submit.prevent="save()">
        <label>Title</label>
        <input class="w3-input" v-model="formValue.title" />

        <label>Amount</label>
        <input class="w3-input" type="decimal" step="0.01" v-model="formValue.amount" />
        
        <button class="w3-button w3-teal" type="submit">
            <i class="fa fa-check"></i>&nbsp;
            Save
        </button>
    </form>
</template>

<style scoped>

</style>