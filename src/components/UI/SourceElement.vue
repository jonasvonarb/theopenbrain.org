<template>
  <div
    v-if="info || source"
    class="absolute bottom-20 left-20 pl-2 max-w-[570px]"
  >
    <p v-if="info" class="text-base">{{ info }}</p>
    <p v-if="source" class="text-small">{{ source }}</p>
  </div>
</template>

<script setup>
defineProps({
  source: String,
  info: String,
});
</script>

<style scoped></style>
