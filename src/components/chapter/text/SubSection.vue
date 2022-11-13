<template>
  <!-- subsection -->
  <div
    class="sub"
    v-for="subsections in paragraph.subsection"
    :id="subsections.id"
  >
    <!-- subsection title -->
    <h3 class="subT">{{ subsections.title }}</h3>
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
});
</script>

<style lang="scss" scoped></style>
