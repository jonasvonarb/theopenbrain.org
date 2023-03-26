<template>
  <div class="bg-bgDa text-white -ml-20 -mr-24 px-left P mb-8">
    <p class="max-w-[800px] pt-8" v-html="paragraph.text" />
  </div>
</template>

<script setup>
defineProps({
  paragraph: Object,
});
</script>

<style scoped></style>
