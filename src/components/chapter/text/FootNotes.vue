<template>
  <div>
    <h2>{{ content.title }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  content: Object,
});
</script>

<style scoped></style>
