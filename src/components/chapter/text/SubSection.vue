<template>
  <!-- subSection -->

  <div
    class="sub"
    v-for="(subSections, subIndex) in paragraph.subSection"
    :id="subSections.id"
  >
    <!-- subSection title -->

    <h3
      :id="
        subSections.animationAnchor ? 'anchor' + subSections.animation.id : ''
      "
      class="subT pt-20 -mb-8"
      :class="
        subSections.animationAnchor ? 'pt-[100vh] animationScrollAnchor' : ''
      "
    >
      <span class="absolute pl-5 w-20 left-1/2">{{
        index + "." + (subIndex + 1)
      }}</span>
      {{ subSections.title }}
    </h3>
    <!-- subSection paragraph -->
    <span
      v-if="subSections.animation && !subSections.animationAnchor"
      class="animationTrigger"
      :id="'trigger' + subSections.animation?.id"
    >
      <template v-for="subParagraph in subSections.paragraphs">
        <template
          v-if="
            subParagraph?.type != 'breakVideo' &&
            subParagraph?.type != 'breakSection'
          "
        >
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
        <BreakImages
          v-else-if="subParagraph?.type === 'breakVideo'"
          :title="subParagraph.text"
        />
        <BreakSection
          v-else-if="subParagraph.type === 'breakSection'"
          :content="subParagraph"
        />
      </template>
    </span>
    <template v-else
      ><template v-for="subParagraph in subSections.paragraphs">
        <template
          v-if="
            subParagraph?.type != 'breakVideo' &&
            subParagraph?.type != 'breakSection'
          "
        >
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
        <BreakImages
          v-else-if="subParagraph?.type === 'breakVideo'"
          :title="subParagraph.text"
        />
        <BreakSection
          v-else-if="subParagraph.type === 'breakSection'"
          :content="subParagraph"
        /> </template
    ></template>
  </div>
</template>

<script setup>
import SubSubSection from "./SubSubSection.vue";
import BreakImages from "./BreakImages.vue";
import BreakSection from "./BreakSection.vue";

const props = defineProps({
  paragraph: Object,
  index: Number,
});
</script>

<style lang="scss" scoped></style>
