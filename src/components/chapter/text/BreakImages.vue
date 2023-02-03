<script setup>
import BiPlayCircleFill from "@/icons/BiPlayCircleFill.vue";

defineProps({
  title: String,
  text: String,
});
</script>

<template>
  <div class="text-small my-24 -ml-20 font-mono">
    <RouterLink
      to="chapter/break/file_example_MP4_1920_18MG"
      class="relative flex h-full justify-center items-start gap-8 bg-white"
    >
      <div class="relative">
        <div class="h-64 bg-black absolute w-full opacity-20"></div>
        <div class="h-64 bg-violet absolute w-full opacity-70"></div>
        <img
          class="bg-black h-64 mix-blend-screen grayscale"
          src="/assets/hoverImges/alcmeon.jpg"
        />
      </div>
      <BiPlayCircleFill
        class="absolute -left-8 -top-8 bg-black rounded-full border border-black text-white w-16 h-16"
      />

      <div
        class="w-full h-full flex flex-col justify-center items-start mt-[-0.2rem] text-small"
      >
        <span class="block max-w-[300px] text-left font-semibold">
          {{ title }}
        </span>
        <span class="block max-w-[300px] text-left">
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
