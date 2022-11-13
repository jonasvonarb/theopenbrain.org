<template>
  <div class="subSub" v-for="subSubParagraphs in subParagraph.subSubSection">
    <template v-if="!subSubParagraphs.paragraphs">
      <p class="subSubT">{{ subSubParagraphs.title }}</p>
      <p
        class="subSubP"
        v-html="subSubParagraphs.text"
        :id="subSubParagraphs.id"
      />
    </template>
    <template v-else>
      <p class="subSubT">{{ subSubParagraphs.title }}</p>
      <template v-for="subSubParagraph in subSubParagraphs.paragraphs">
        <p
          class="subSubP"
          v-html="subSubParagraph.text"
          :id="subSubParagraph.id"
        />
      </template>
    </template>
  </div>
</template>

<script setup>
const prosp = defineProps({
  subParagraph: Object,
});
</script>

<style lang="scss" scoped></style>
