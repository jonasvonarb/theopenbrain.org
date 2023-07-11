<template>
  <div class="absolute top-40 left-left z-50">
    <p
      v-for="(state, index) in states"
      :key="state"
      class="hover:text-primaryMed text-small cursor-pointer pb-6"
      :class="activeState == index ? ' ' : ''"
      @click="$emit('onClick', { index, activeState })"
    >
      <template v-if="iconsIndex?.[index]">
        <img
          loading="lazy"
          class="inline h-12 pr-5 -ml-1"
          :src="`/publicAssets/icons/${praefix}/${toSlug(state)}.svg`"
        />
      </template>
      <span
        :class="
          activeState == index
            ? 'underline decoration-4	 decoration-primaryMed border-primaryMed pointer-events-none text-black'
            : ''
        "
        >{{ state }}</span
      >
    </p>
  </div>
</template>

<script setup>
import { toSlug } from "@/helper/general";

const props = defineProps({
  states: Object,
  activeState: Number,
  praefix: String,
  iconsIndex: Object,
});

defineEmits(["onClick"]);
</script>

<style scoped></style>
