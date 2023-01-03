<script setup lang="ts">
import {useAppStore} from '@/stores/app-state'
import {currency} from '@/utils/formats'
import FaIcon from '@/components/common/fa-icon.vue'
import {ref} from "vue";

const store = useAppStore()
const edit$ = ref<number|null>(null)

function persistDeposit() {
  store.updateDeposit(edit$.value!)
  edit$.value = null
}

</script>

<template>
  <n-statistic label="Deposit" v-if="edit$ === null">
      <template #prefix>
        <FaIcon icon="piggy-bank"></FaIcon>
      </template>
      {{ currency.format(store.deposit.balance) }}
    <n-button :type="'tertiary'" @click="() => edit$ = store.deposit.balance"><FaIcon icon="pen"></FaIcon></n-button>
  </n-statistic>

  <n-statistic label="Deposit" v-if="edit$ !== null">
    <n-input-number v-model:value="edit$" @focusout="persistDeposit" />
  </n-statistic>
</template>

<style scoped>

</style>
