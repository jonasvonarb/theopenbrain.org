<template>
  <div
    class="pt-6"
    :id="subParagraph.animation ? 'trigger' + subParagraph.animation?.id : ''"
    :class="subParagraph.animation ? 'animationTrigger' : ''"
  >
    <div
      v-for="(subSubSection, index) in subParagraph.subSubSection"
      :key="subSubSection.title"
      class="subSub"
    >
      <template v-if="!subSubSection.paragraphs">
        <div v-if="subSubSection.type != 'breakVideo'">
          <span class="subSubT p-0 inline">
            {{ subSubSection.title + " " }}
          </span>
          <p
            :id="subSubSection.id"
            class="subSubP pt-0"
            v-html="subSubSection.text"
          />
        </div>
        <BreakImages
          v-else-if="subSubSection.type === 'breakVideo'"
          :title="subSubSection.text"
        />
        <BreakSection
          v-else-if="paragraph.type === 'breakSection'"
          :content="paragraph"
        />
      </template>
      <p class v-else>
        <span class="subSubParT">
          {{ subSubSection.title + " " }}
        </span>
        <template v-for="subSubParagraph in subSubSection.paragraphs">
          <p
            v-if="subSubParagraph.type != 'breakVideo'"
            :id="subSubParagraph.id"
            :key="subSubParagraph.title"
            class="subSubParP"
            v-html="subSubParagraph.text"
          />
          <BreakImages
            v-else-if="subSubSection.type === 'breakVideo'"
            :key="subSubParagraph.text"
            :title="subSubParagraph.text"
          />
          <BreakSection
            v-else-if="paragraph.type === 'breakSection'"
            :key="subSubParagraph"
            :content="paragraph"
          />
        </template>
      </p>
    </div>
  </div>
</template>

<script setup>
import BreakImages from "./BreakImages.vue";
import BreakSection from "./BreakSection.vue";
const prosp = defineProps({
  subParagraph: Object,
  chapterIndex: Number,
  subIndex: Number,
});
</script>

<style lang="scss" scoped></style>
