<template>
  <div
    class="absolute flex flex-col justify-start gap-20 w-44 py-6 pb-8 px-6 items-center border border-black bottom-20 left-24 opacity-70"
  >
    <div
      v-for="icon in legend"
      :key="icon"
      class="h-20 text-smaller text-center"
    >
      <img
        class="w-full h-12 my-1"
        :src="'/assets/icons/' + iconPraefix + '/' + toSlug(icon) + '.svg'"
      />
      <p>{{ icon }}</p>
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
