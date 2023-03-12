<template>
  <div class="absolute top-28 left-28 z-50">
    <p
      v-for="(state, index) in states"
      :key="state"
      class="hover:text-violet text-small cursor-pointer pb-6"
      :class="
        activeState == index ? 'underline pointer-events-none text-violet' : ''
      "
      @click="$emit('onClick', { index, activeState })"
    >
      <template v-if="iconsIndex?.[index]">
        <img
          class="inline h-12 pr-2 -ml-1"
          :src="`/publicAssets/icons/${praefix}/${toSlug(state)}.svg`"
        />
      </template>
      {{ state }}
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
