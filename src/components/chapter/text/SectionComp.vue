<template>
  <!-- section -->
  <section :id="section.id" class="overflow-y-visible">
    <!-- section titel -->
    <h2
      class="TN border border-black bg-white rounded-full absolute -translate-x-[10.5rem] -translate-y-[0.8rem] w-28 h-28 flex items-center justify-center"
    >
      {{ index + 1 }}
    </h2>
    <h2
      :class="store.imgActive ? 'opacity-0' : ''"
      class="T durattion-500 z-40 subChapter"
    >
      {{ section.title }}
    </h2>
    <template v-for="paragraph in section['paragraphs']">
      <template
        v-if="
          paragraph?.type != 'breakVideo' && paragraph.type != 'breakSection'
        "
      >
        <!-- section paragraph -->
        <InlineImages
          :paragraph="paragraph"
          :key="'images' + paragraph.id"
          v-if="paragraph.img"
        />
        <p
          v-if="!paragraph.subSection"
          :key="paragraph.id"
          :id="paragraph.id"
          class="P"
          v-html="paragraph.text"
        />
        <SubSection
          v-else
          :key="paragraph"
          :paragraph="paragraph"
          :index="index + 1"
        />
        <FullScreenIllustration
          :key="paragraph.id"
          v-if="paragraph.animationFull"
          :paragraph="paragraph"
        />
      </template>
      <!-- section Break -->
      <BreakImages
        :key="'breakVideo ' + paragraph.id"
        v-else-if="paragraph.type === 'breakVideo'"
        :title="paragraph.title"
        :text="paragraph.text"
      />
      <BreakSection
        :key="'breakSection' + paragraph.id"
        v-else-if="paragraph.type === 'breakSection'"
        :content="paragraph"
      />
    </template>
    <FullScreenIllustration
      :key="section.id"
      v-if="section.animationFull"
      :paragraph="section"
    />
  </section>
</template>

<script setup>
import BreakImages from "./BreakImages.vue";
import FullScreenIllustration from "@/components/chapter/Illus/FullScreenIllustration.vue";
import SubSection from "./SubSection.vue";
import { useGeneral } from "@/stores";
import BreakSection from "./BreakSection.vue";
import InlineImages from "./InlineImages.vue";
const store = useGeneral();

const props = defineProps({
  section: Object,
  index: Number,
});
</script>

<style scoped>
.imageW {
  width: calc(50vw - 4rem);
}
</style>
