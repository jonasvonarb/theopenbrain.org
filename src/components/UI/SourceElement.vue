<template>
  <div
    v-if="source"
    class="absolute bottom-20 left-20 pl-2 text-small max-w-[30%]"
  >
    {{ source }}
  </div>
</template>

<script setup>
defineProps({
  source: String,
});
</script>

<style scoped></style>
