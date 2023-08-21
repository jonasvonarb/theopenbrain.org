<template>
  <div
    v-if="info || source"
    class="absolute bottom-20 left-20 pl-2 max-w-[570px] pr-20"
  >
    <p v-if="info" class="text-baseMono pb-3">{{ info }}</p>
    <p v-if="source" class="text-small" v-html="source" />
  </div>
</template>

<script setup>
defineProps({
  source: String,
  info: String,
});
</script>

<style scoped></style>
