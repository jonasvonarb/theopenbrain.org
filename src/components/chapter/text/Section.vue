<template>
  <!-- section -->
  <section :id="section.id" class="overflow-y-visible">
    <!-- section titel -->
    <div class="top-0 pt-10">
      <h2
        class="p-5 border border-black bg-white rounded-full absolute -translate-x-[10.5rem] -translate-y-[1.25rem] w-20 h-20 flex justify-center"
      >
        {{ index + 1 }}
      </h2>
    </div>

    <h2
      :class="store.imgActive ? 'opacity-0' : ''"
      class="T durattion-500 z-40 subChapter"
    >
      {{ section.title }}
    </h2>
    <template v-for="paragraph in section['paragraphs']">
      <template v-if="paragraph?.type != 'break'">
        <!-- section paragraph -->
        <p
          class="P pb-12"
          v-html="paragraph.text"
          :id="paragraph.id"
          v-if="!paragraph.subSection"
        />
        <SubSection v-else :paragraph="paragraph" :index="index + 1" />
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
