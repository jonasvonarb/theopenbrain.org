<template>
  <div
    class="absolute flex flex-col justify-start gap-9 w-64 py-2 px-4 items-start bottom-20 left-12"
  >
    <div
      v-for="icon in legend"
      :key="icon"
      class="text-smaller flex flex-row items-center justify-center opacity-60 text-center"
    >
      <img
        class="h-8 w-20 mr-2 my-0.5"
        :src="
          '/publicAssets/icons/' + iconPraefix + '/' + toSlug(icon) + '.svg'
        "
      />
      <p class="h-6 whitespace-nowrap">
        {{ icon !== "special" ? icon : "Spike train" }}
      </p>
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
