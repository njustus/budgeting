<script setup lang="ts">
    import { useAppStore } from '@/stores/app-state'
    import { inject, ref } from 'vue'
    import type {Transaction} from '../models/state'

    const appStore = useAppStore();
    const formValue = ref<Transaction>({
        title: '',
        amount: 0,
        date: new Date()
    })

    function save() {
        const t = formValue.value
        appStore.addTransaction({...t, date: new Date(t.date)})
    }
</script>

<template>
    <form class="w3-container" @submit.prevent="save()">
        <p>
            <label>Title</label>
            <input class="w3-input" v-model="formValue.title" />
        </p>
        <p>
            <label>Date</label>
            <input class="w3-input" type="date" v-model="formValue.date" />
        </p>

        <p>
            <label>Amount</label>
            <input class="w3-input" type="decimal" step="0.01" v-model.number="formValue.amount"/>
        </p>
        <p>
            <label>Description</label>
            <input class="w3-input" v-model="formValue.description" />
        </p>
        <p>
            <button class="w3-button w3-teal" type="submit">
                <i class="fa fa-check"></i>&nbsp;
                Save
            </button>
        </p>
    </form>
</template>

<style scoped>

</style>