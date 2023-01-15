<template>
  <div
    :id="subParagraph.animation ? 'trigger' + subParagraph.animation?.id : ''"
    :class="subParagraph.animation ? 'animationTrigger' : ''"
  >
    <div
      v-for="(subSubSection, index) in subParagraph.subSubSection"
      :key="subSubSection.title"
      class="subSub"
    >
      <template v-if="!subSubSection.paragraphs">
        <InlineImages :paragraph="subSubSection" v-if="subSubSection.img" />
        <div
          v-if="
            subSubSection.type != 'breakVideo' &&
            subSubSection.type != 'breakSection' &&
            subSubSection.type != 'breakText'
          "
        >
          <p
            :id="subSubSection.id"
            class="subSubP pt-0"
            v-html="subSubSection.text"
          />
        </div>
        <BreakImages
          v-else-if="subSubSection.type === 'breakVideo'"
          :title="subSubParagraph.title"
          :text="subSubParagraph.text"
        />
        <BreakSection
          v-else-if="subSubSection.type === 'breakSection'"
          :content="subSubSection"
        />
        <BreakText
          :key="subSubSection"
          :paragraph="subSubSection"
          v-else-if="subSubSection.type === 'breakText'"
        />
      </template>
      <p class v-else>
        <template v-for="subSubParagraph in subSubSection.paragraphs">
          <p
            v-if="
              subSubParagraph.type != 'breakVideo' &&
              subSubSection.type != 'breakSection'
            "
            :id="subSubParagraph.id"
            :key="subSubParagraph.title"
            class="subSubParP"
            v-html="subSubParagraph.text"
          />
          <BreakImages
            v-else-if="subSubSection?.type === 'breakVideo'"
            :key="subSubParagraph.text"
            :title="subSubParagraph.title"
            :text="subSubParagraph.text"
          />
          <BreakSection
            v-else-if="subSubParagraph?.type === 'breakSection'"
            :key="subSubParagraph"
            :content="subSubParagraph"
          />
          <BreakText
            :key="subSubParagraph.type"
            :paragraph="subSubParagraph"
            v-else-if="subSubParagraph.type === 'breakText'"
          />
        </template>
      </p>
    </div>
  </div>
</template>

<script setup>
import BreakImages from "./BreakImages.vue";
import BreakSection from "./BreakSection.vue";
import BreakText from "./BreakText.vue";
import InlineImages from "./InlineImages.vue";
const prosp = defineProps({
  subParagraph: Object,
  chapterIndex: Number,
  subIndex: Number,
});
</script>

<style lang="scss" scoped></style>
