<script setup lang="ts">
import TagsList from "@/components/tags/tags-list.vue";
import TagEdit from "@/components/tags/tag-edit.vue";</script>

<template>
  <n-grid :cols="2" item-responsive responsive="screen" class="default-grid">
    <n-gi>
      <h2>Create a new Tag</h2>
      <tag-edit></tag-edit>
    </n-gi>
    <n-gi>
      <h2>Available Tags</h2>
      <tags-list></tags-list>
    </n-gi>
  </n-grid>
</template>


<style scoped>

</style>
