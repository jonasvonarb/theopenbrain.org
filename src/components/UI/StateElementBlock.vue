<template>
  <div class="z-50">
    <p
      v-for="(state, index) in states"
      :key="state"
      class="hover:border-primaryMed text-center hover:text-primaryMed select-none text-small cursor-pointer mb-6 border-black border p-6 py-3 flex flex-row justify-center gap-4 items-center"
      :class="
        activeState == index
          ? 'font-semibold bg-primaryMed border-primaryMed text-white pointer-events-none'
          : ''
      "
      @click="$emit('onClick', { index, activeState })"
    >
      <template v-if="praefix">
        <img
          class="w-10 h-9 my-1"
          :class="activeState == index ? 'invert' : ''"
          :src="'/publicAssets/icons/' + praefix + '/' + toSlug(state) + '.svg'"
        />
      </template>
      {{ state }}
    </p>
  </div>
</template>

<script setup>
import { toSlug } from "@/helper/general";

defineProps({
  states: Object,
  activeState: Number,
  praefix: String,
  iconsIndex: Object,
});

defineEmits(["onClick"]);
</script>

<style scoped></style>
