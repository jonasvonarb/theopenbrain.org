<template>
  <!-- subsection -->
  <div
    class="sub"
    v-for="(subsections, subIndex) in paragraph.subsection"
    :id="subsections.id"
  >
    <!-- subsection title -->

    <h3 class="subT">
      <span class="absolute w-20 -left-0">{{
        index + "." + (subIndex + 1)
      }}</span>
      {{ subsections.title }}
    </h3>
    <!-- subsection paragraph -->
    <template v-for="subParagraph in subsections.paragraphs">
      <template v-if="subParagraph?.type != 'break'">
        <p
          class="subP"
          v-if="!subParagraph.subSubSection"
          v-html="subParagraph.text"
          :id="subParagraph.id"
        />
        <SubSubSection v-else :subParagraph="subParagraph" />
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
