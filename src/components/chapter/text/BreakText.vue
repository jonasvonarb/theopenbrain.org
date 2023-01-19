<template>
  <div class="bg-dark text-white -ml-20 -mr-24 px-24 P mb-8">
    <p class="max-w-[800px] pt-8" v-html="paragraph.text" />
  </div>
</template>

<script setup>
defineProps({
  paragraph: Object,
});
</script>

<style scoped></style>
