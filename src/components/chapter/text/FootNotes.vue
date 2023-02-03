<template>
  <div
    class="w-full -ml-20 p-24 pt-6 bg-white border-black font-mono text-small"
  >
    <div class="marker-start" />
    <span
      id="triggerAnimationPlaceholder"
      class="animationTrigger block noHighlight"
    >
      <h2 id="footnotes">{{ content.title }}</h2>
      <ol class="pt-6 pr-3 pb-32 w-full bg-white">
        <li
          v-for="(note, index) in content.notes"
          :key="note.number"
          class="flex gap-4 pb-4 justify-start"
        >
          <p class="text-left w-16">{{ index + 1 }}</p>
          <p class="max-w-[780px]"><span v-html="note.text" /></p>
        </li>
      </ol>
    </span>
    <div class="marker-end" />
  </div>
</template>

<script setup>
defineProps({
  content: Object,
});
</script>

<style scoped></style>
