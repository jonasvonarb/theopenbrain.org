<template>
  <div class="py-12">
    <h2 class="py-6">{{ content.title }}</h2>
    <div v-for="paragraph in content.paragraphs">
      <h3 class="pb-2">{{ paragraph.title }}</h3>
      <a
        class="underline"
        v-for="link in paragraph.links"
        :href="link.url"
        target="_blank"
        >{{ link.text }}</a
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: Object,
});
</script>

<style scoped></style>
