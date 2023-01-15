<template>
  <!-- subSection -->
  <div
    v-for="(subSections, subIndex) in paragraph.subSection"
    :key="subSections.id"
    :id="subSections.id"
    class="sub"
  >
    <!-- subSection title -->
    <span :id="subSections?.title ? toSlug(subSections?.title) : ''" />
    <h3
      :id="
        subSections.animationAnchor ? 'anchor' + subSections.animation.id : ''
      "
      class="subT"
      :class="
        subSections.animationAnchor ? 'pt-[100vh] animationScrollAnchor' : ''
      "
    >
      {{ subSections.title }}
    </h3>
    <!-- subSection paragraph -->
    <span
      v-if="subSections.animation && !subSections.animationAnchor"
      :id="'trigger' + subSections.animation?.id"
      class="animationTrigger"
    >
      <template v-for="subParagraph in subSections.paragraphs">
        <template
          v-if="
            subParagraph?.type != 'breakVideo' &&
            subParagraph?.type != 'breakSection'
          "
        >
          <InlineImages
            :paragraph="subParagraph"
            :key="'images' + subParagraph.id"
            v-if="subParagraph.img"
          />

          <p
            v-if="!subParagraph.subSubSection && !subParagraph.type"
            :id="subParagraph.id"
            :key="subParagraph.id"
            class="subP"
            v-html="subParagraph.text"
          />
          <SubSubSection
            v-else-if="subParagraph.subSubSection && !subParagraph.type"
            :key="subParagraph.title"
            :chapter-index="index"
            :sub-index="subIndex"
            :sub-paragraph="subParagraph"
          />
          <BreakText
            :key="subParagraph"
            :paragraph="subParagraph"
            v-else-if="subParagraph.type === 'breakText'"
          />
        </template>
        <!-- subSection Break -->
        <BreakImages
          v-else-if="subParagraph?.type === 'breakVideo'"
          :key="subParagraph.id"
          :title="paragraph.title"
          :text="paragraph.text"
        />
        <BreakSection
          v-else-if="subParagraph.type === 'breakSection'"
          :key="subParagraph.title"
          :content="subParagraph"
        />
      </template>
    </span>
    <template v-else>
      <template v-for="subParagraph in subSections.paragraphs">
        <template
          v-if="
            subParagraph?.type != 'breakVideo' &&
            subParagraph?.type != 'breakSection'
          "
        >
          <InlineImages
            :paragraph="subParagraph"
            :key="'images' + subParagraph.id"
            v-if="subParagraph.img"
          />
          <p
            v-if="!subParagraph.subSubSection && !subParagraph.type"
            :id="subParagraph.id"
            :key="subParagraph.id"
            class="subP"
            v-html="subParagraph.text"
          />
          <SubSubSection
            v-else-if="subParagraph.subSubSection && !subParagraph.type"
            :key="subParagraph.title"
            :chapter-index="index"
            :sub-index="subIndex"
            :sub-paragraph="subParagraph"
          />
          <BreakText
            :key="subParagraph"
            :paragraph="subParagraph"
            v-else-if="subParagraph.type === 'breakText'"
          />
        </template>
        <!-- subSection Break -->
        <BreakImages
          v-else-if="subParagraph?.type === 'breakVideo'"
          :key="subParagraph.title"
          :title="subParagraph.title"
          :text="subParagraph.text"
        />
        <BreakSection
          v-else-if="subParagraph.type === 'breakSection'"
          :key="subParagraph.id"
          :content="subParagraph"
        /> </template
    ></template>
  </div>
</template>

<script setup>
import SubSubSection from "./SubSubSection.vue";
import BreakImages from "./BreakImages.vue";
import BreakSection from "./BreakSection.vue";
import BreakText from "./BreakText.vue";

import { toSlug } from "@/helper/general.js";
import InlineImages from "./InlineImages.vue";

const props = defineProps({
  paragraph: Object,
  index: Number,
});
</script>

<style scoped></style>
