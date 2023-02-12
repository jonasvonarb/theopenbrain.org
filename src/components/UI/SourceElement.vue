<template>
  <div
    v-if="source"
    class="absolute bottom-6 left-36 pl-2 text-smaller max-w-[35%]"
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
