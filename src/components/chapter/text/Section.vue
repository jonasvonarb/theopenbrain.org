<template>
  <!-- section -->
  <section :id="section.id" class="overflow-y-visible">
    <!-- section titel -->
    <h2
      :class="store.imgActive ? 'opacity-0' : ''"
      class="T durattion-500 z-40 subChapter"
    >
      <span class="w-[10vw] pl-5 shrink-0">{{ index + 1 }}</span>
      {{ section.title }}
    </h2>
    <template v-for="paragraph in section['paragraphs']">
      <template v-if="paragraph?.type != 'break'">
        <!-- section paragraph -->
        <p
          class="P"
          v-html="paragraph.text"
          :id="paragraph.id"
          v-if="!paragraph.subsection"
        />
        <SubSection v-else :paragraph="paragraph" />
      </template>
      <!-- section Break -->
      <BreakImages v-else :title="paragraph.text" />
    </template>
  </section>
</template>

<script setup>
import BreakImages from "./BreakImages.vue";
import SubSection from "./SubSection.vue";
import { useGeneral } from "@/stores";
const store = useGeneral();

const props = defineProps({
  section: Object,
  index: Number,
});
</script>

<style scoped></style>
