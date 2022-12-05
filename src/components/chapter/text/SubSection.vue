<template>
  <!-- subSection -->

  <div
    class="sub"
    v-for="(subSections, subIndex) in paragraph.subSection"
    :id="subSections.id"
  >
    <!-- subSection title -->

    <h3 class="subT pt-20 -mb-8">
      <span class="absolute pl-5 w-20 left-1/2">{{
        index + "." + (subIndex + 1)
      }}</span>
      {{ subSections.title }}
    </h3>
    <!-- subSection paragraph -->
    <template v-for="subParagraph in subSections.paragraphs">
      <template v-if="subParagraph?.type != 'break'">
        <p
          class="subP"
          v-if="!subParagraph.subSubSection"
          v-html="subParagraph.text"
          :id="subParagraph.id"
        />
        <SubSubSection
          :chapterIndex="index"
          :subIndex="subIndex"
          v-else
          :subParagraph="subParagraph"
        />
      </template>
      <!-- subSection Break -->
      <BreakImages v-else :title="subParagraph.text" />
    </template>
  </div>
</template>

<script setup>
import SubSubSection from "./SubSubSection.vue";
import BreakImages from "./BreakImages.vue";

const props = defineProps({
  paragraph: Object,
  index: Number,
});
</script>

<style lang="scss" scoped></style>
