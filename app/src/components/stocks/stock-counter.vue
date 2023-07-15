<script setup lang="ts">
import type {SubscribedStock} from "@/models";
import {currency} from '@/utils/formats'
import {ref} from "vue";
import FaIcon from "@/components/common/fa-icon.vue";

interface Props {
  stock: SubscribedStock
}

const props = defineProps<Props>()

const editableStock$ = ref<SubscribedStock | null>(null)

function toggleEditableStock(stock: SubscribedStock | null) {
  editableStock$.value = stock
}

</script>

<template>
  <template v-if="stock.id !== editableStock$?.id">
    {{ stock.count }} x {{ currency.format(stock.stockInfo.exchange.price) }}
    <n-button :type="'warning'" @click="toggleEditableStock(stock)">
      <fa-icon icon="pen"></fa-icon>
    </n-button>
  </template>

  <template v-if="stock.id === editableStock$?.id">
    <n-form-item>
    <n-input-number v-model:value="stock.count" @focusout="toggleEditableStock(null)"></n-input-number>
    </n-form-item>
  </template>
</template>

<style scoped>

</style>
