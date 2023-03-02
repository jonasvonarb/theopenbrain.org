<script setup>
import PlayIcon from "@/icons/custom/PlayIcon.vue";
import jsonVideos from "@/assets/json_backend/breakVideos.json";

const props = defineProps({
  slug: String,
  title: String,
  text: String,
});

const currentVideo = jsonVideos.videos[props.slug];
</script>

<template>
  <div class="text-small my-24 -ml-20 font-mono max-w-[800px]">
    <RouterLink
      :to="`chapter/break/${slug ? slug : 'placeholder'}`"
      class="relative flex h-full justify-center items-start gap-8 bg-white"
    >
      <div class="relative">
        <div class="h-64 bg-black absolute w-full opacity-20"></div>
        <div class="h-64 bg-violet absolute w-full opacity-70"></div>
        <img
          v-if="slug === 'placeholder'"
          class="bg-black h-64 mix-blend-screen grayscale"
          src="/publicAssets/images/placeholders/monaLisa.webp"
        />
        <img
          v-else
          class="bg-black h-64 mix-blend-screen grayscale"
          :src="`/publicAssets/images/breakVideos/${slug}.png`"
        />
      </div>
      <PlayIcon class="absolute -left-8 -top-8 icon iconBig" />

      <div
        class="w-full h-full flex flex-col justify-center items-start mt-[-0.2rem] text-small"
      >
        <span class="block text-left font-semibold">
          {{ slug !== "placeholder" ? currentVideo?.title : title }}
        </span>
        <span class="block text-left">
          {{ slug !== "placeholder" ? currentVideo?.text : text }}
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
