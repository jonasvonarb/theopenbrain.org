<template>
  <div>
    <h2 class="pb-12">{{ content.title }}</h2>
    <ol v-for="(note, index) in content.notes" :key="note.number">
      <li class="pb-4">{{ index + 1 }} {{ note.text }}</li>
    </ol>
  </div>
</template>

<script setup>
const props = defineProps({
  content: Object,
});
</script>

<style scoped></style>
