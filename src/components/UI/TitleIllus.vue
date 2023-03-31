<template>
  <h4 class="text-base font-sans font-bold text-select-off" :class="color && 'text-white'">
    {{ title }}
  </h4>
</template>

<script setup>
defineProps({
  title: String,
  color: Boolean,
});
</script>

<style scoped></style>
