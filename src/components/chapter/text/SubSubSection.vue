<template>
  <div
    class="subSub"
    v-for="(subSubSection, index) in subParagraph.subSubSection"
  >
    <template v-if="!subSubSection.paragraphs">
      <template v-if="subSubSection.type != 'breakVideo'">
        <p class="subSubT">
          {{
            chapterIndex +
            "." +
            (subIndex + 1) +
            "." +
            (index + 1) +
            " " +
            subSubSection.title
          }}
        </p>
        <p class="subSubP" v-html="subSubSection.text" :id="subSubSection.id" />
      </template>
      <BreakImages
        v-else-if="subSubSection.type === 'breakVideo'"
        :title="subSubSection.text"
      />
      <BreakSection
        v-else-if="paragraph.type === 'breakSection'"
        :content="paragraph"
      />
    </template>
    <template v-else>
      <p class="subSubParT">
        {{
          chapterIndex +
          "." +
          (subIndex + 1) +
          "." +
          (index + 1) +
          " " +
          subSubSection.title
        }}
      </p>
      <template v-for="subSubParagraph in subSubSection.paragraphs">
        <p
          v-if="subSubParagraph.type != 'breakVideo'"
          class="subSubParP"
          v-html="subSubParagraph.text"
          :id="subSubParagraph.id"
        />
        <BreakImages
          v-else-if="subSubSection.type === 'breakVideo'"
          :title="subSubParagraph.text"
        />
        <BreakSection
          v-else-if="paragraph.type === 'breakSection'"
          :content="paragraph"
        />
      </template>
    </template>
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
