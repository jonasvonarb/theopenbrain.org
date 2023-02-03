<template>
  <!-- subSection -->
  <div
    v-for="(subSections, subIndex) in paragraph.subSection"
    :key="subSections.id"
    :id="subSections.id"
    class="sub"
  >
    <span
      :id="
        subSections?.animation?.name &&
        'triggerAnimation' + subSections?.animation?.name
      "
      :class="
        subSections?.animation?.name ? 'animationTrigger block noHighlight' : ''
      "
    >
      <div v-if="subSections?.animation" class="marker-start" />
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
        :id="
          subParagraph?.animation?.name &&
          'triggerAnimation' + subParagraph?.animation?.name
        "
        :class="
          subParagraph?.animation?.name
            ? 'animationTrigger block noHighlight'
            : ''
        "
        v-for="subParagraph in subSections.paragraphs"
        :key="subParagraph.id"
      >
        <div v-if="subParagraph?.animation" class="marker-start" />

        <template
          v-if="
            subParagraph?.type != 'breakVideo' &&
            subParagraph?.type != 'breakSection'
          "
        >
          <div
            v-if="subParagraph?.animation?.transition"
            class="marker-start"
          />
          <div
            v-if="subParagraph?.animation?.transition"
            :id="
              subParagraph?.animation &&
              'triggerAnimation' + subParagraph?.animation?.name + 'Transition'
            "
            :class="
              subParagraph?.animation?.name + 'Transition'
                ? 'animationTrigger animationScrollAnchor block noHighlight'
                : ''
            "
            class="transition left-0 w-full h-[50vh] bg-green-"
          />
          <div v-if="subParagraph?.animation?.transition" class="marker-end" />
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
          <FullScreenIllustration
            :key="subParagraph.animationFull"
            v-if="subParagraph.animationFull"
            :paragraph="subParagraph"
          />
          <!-- <BreakText
            :key="subParagraph"
            :paragraph="subParagraph"
            v-else-if="subParagraph.type === 'breakText'"
          /> -->
        </template>
        <div v-if="subParagraph?.animation" class="marker-end" />

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
      </span>
      <FullScreenIllustration
        :key="subSections.animationFull"
        v-if="subSections.animationFull"
        :paragraph="subSections"
      />
    </span>
    <div v-if="subSections?.animation" class="marker-end" />
  </div>
</template>

<script setup>
import SubSubSection from "./SubSubSection.vue";
import BreakImages from "./BreakImages.vue";
import BreakSection from "./BreakSection.vue";
import BreakText from "./BreakText.vue";

import { toSlug } from "@/helper/general.js";
import InlineImages from "./InlineImages.vue";
import FullScreenIllustration from "../Illus/FullScreenIllustration.vue";

const props = defineProps({
  paragraph: Object,
  index: Number,
});
</script>

<style scoped></style>
