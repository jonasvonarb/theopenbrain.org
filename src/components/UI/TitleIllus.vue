<template>
  <h4
    class="text-base font-sans font-bold"
    :class="color === 'white' && 'text-white'"
  >
    {{ title }}
  </h4>
</template>

<script setup>
defineProps({
  title: String,
  color: String,
});
</script>

<style scoped></style>
