<template>
  <div
    class="absolute flex flex-row justify-start gap-9 h-32 py-2 px-4 items-center border border-dark/50 bottom-20 left-16"
  >
    <div
      v-for="icon in legend"
      :key="icon"
      class="text-smaller flex flex-col items-center justify-center opacity-60 text-center"
    >
      <img
        class="w-full h-10 my-1"
        :src="'/assets/icons/' + iconPraefix + '/' + toSlug(icon) + '.svg'"
      />
      <p class="h-8">{{ icon !== "special" ? icon : "" }}</p>
    </div>
  </div>
</template>

<script setup>
import { toSlug } from "@/helper/general";

defineProps({
  legend: Object,
  iconPraefix: String,
});
</script>

<style lang="scss" scoped></style>
