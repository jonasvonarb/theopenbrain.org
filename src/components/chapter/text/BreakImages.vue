<script setup>
import MaterialSymbolsPlayArrow from "@/icons/MaterialSymbolsPlayArrow.vue";

defineProps({
  title: String,
  text: String,
});
</script>

<template>
  <div class="text-small my-24 font-mono">
    <RouterLink
      to="chapter/break/file_example_MP4_1920_18MG"
      class="p-12 flex h-full justify-center items-start gap-8 border border-dark bg-white hover:bg-violet/10"
    >
      <div class="">
        <MaterialSymbolsPlayArrow class="absolute text-white w-16 h-16" />
        <img class="bg-black h-48" src="/assets/hoverImges/alcmeon.jpg" />
      </div>

      <div class="w-full h-full flex flex-col justify-center items-start">
        <span class="text-base block max-w-[780px] text-left font-bold">
          {{ title }}
        </span>
        <span class="text-base block max-w-[780px] text-left">
          {{ text }}
        </span>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.z-60 {
  z-index: 60;
}
</style>
