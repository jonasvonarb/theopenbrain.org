<template>
  <div class="bg-dark text-white -ml-28 -mr-32 px-32 P mb-8">
    <p class="max-w-[800px] pt-8" v-html="paragraph.text" />
  </div>
</template>

<script setup>
defineProps({
  paragraph: String,
});
</script>

<style scoped></style>
