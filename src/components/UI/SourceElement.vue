<template>
  <div
    v-if="source"
    class="absolute bottom-20 left-24 pl-2 text-smaller max-w-[35%]"
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
