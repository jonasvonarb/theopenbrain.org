<template>
  <div
    class="subSub"
    v-for="(subSubSection, index) in subParagraph.subSubSection"
  >
    <template v-if="!subSubSection.paragraphs">
      <template v-if="subSubSection.type != 'break'">
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
      <BreakImages v-else :title="subSubSection.text" />
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
          v-if="subSubParagraph.type != 'break'"
          class="subSubParP"
          v-html="subSubParagraph.text"
          :id="subSubParagraph.id"
        />
        <BreakImages v-else :title="subSubParagraph.text" />
      </template>
    </template>
  </div>
</template>

<script setup>
import BreakImages from "./BreakImages.vue";
const prosp = defineProps({
  subParagraph: Object,
  chapterIndex: Number,
  subIndex: Number,
});
</script>

<style lang="scss" scoped></style>
