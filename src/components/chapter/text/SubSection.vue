<template>
  <!-- subSection -->

  <div
    v-for="(subSections, subIndex) in paragraph.subSection"
    :key="subSections.id"
    :id="subSections.id"
    class="sub"
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
      <span
        :id="toSlug(subSections.title)"
        class="absolute flex justify-center w-32 left-full"
        >{{ index + "." + (subIndex + 1) }}</span
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
          <div
            class="h-[180vh] bg-violet text-white -mx-32 px-32"
            :key="subParagraph"
            v-else-if="subParagraph.type === 'breakText'"
          >
            <p class="pt-6 pb-32 sticky top-0" v-html="subParagraph.text" />
          </div>
        </template>
        <!-- subSection Break -->
        <BreakImages
          v-else-if="subParagraph?.type === 'breakVideo'"
          :key="subParagraph.id"
          :title="subParagraph.text"
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
          <div
            class="h-[100vh] bg-violet text-white -mx-32 px-32 mb-12"
            :key="subParagraph"
            v-else-if="subParagraph.type === 'breakText'"
          >
            <p class="pt-6 pb-16 top-0" v-html="subParagraph.text" />
          </div>
        </template>
        <!-- subSection Break -->
        <BreakImages
          v-else-if="subParagraph?.type === 'breakVideo'"
          :key="subParagraph.title"
          :title="subParagraph.text"
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

import { toSlug } from "@/helper/general.js";

const props = defineProps({
  paragraph: Object,
  index: Number,
});
</script>

<style lang="scss" scoped></style>
