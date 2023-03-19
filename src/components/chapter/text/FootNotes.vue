<template>
  <div
    id="footnotes"
    class="w-full p-20 bg-white border-t border-black font-mono text-small"
  >
    <div class="marker-start" />
    <span
      id="triggerAnimationPlaceholder"
      class="animationTrigger block noHighlight"
    >
      <TitleIllus :title="content.title" class="pb-6" />

      <ol class="pt-2 pr-3 pb-32 w-full bg-white">
        <li
          v-for="(note, index) in content.notes"
          :key="note.number"
          class="flex gap-4 pb-6 justify-start"
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
import TitleIllus from "../../UI/TitleIllus.vue";

defineProps({
  content: Object,
});
</script>

<style scoped></style>
