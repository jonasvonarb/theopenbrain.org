<template>
  <div class="absolute top-36 left-24 z-50">
    <p
      v-for="(state, index) in states"
      :key="state"
      class="hover:border-violet hover:text-violet select-none text-smaller cursor-pointer mb-6 border-black border p-6 py-3 flex flex-col justify-center items-center"
      :class="
        activeState == index
          ? 'font-semibold bg-violet text-white pointer-events-none'
          : ''
      "
      @click="$emit('onClick', { index, activeState })"
    >
      <template v-if="praefix">
        <img
          class="w-full h-10 my-1"
          :class="activeState[index] ? 'invert' : ''"
          :src="'/publicAssets/icons/' + praefix + '/' + toSlug(state) + '.svg'"
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
