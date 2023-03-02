<template>
  <div class="flex gap-6 z-50 pt-20">
    <PlusIcon
      :class="!infoIsOpen ? '' : 'rotate-45'"
      class="icon iconBig duration-300"
      @click="$emit('onOpen')"
    />
    <div
      :id="'info-' + toSlug(animation?.title)"
      class="flex overflow-scroll flex-col text-medium justify-between w-full h-auto max-h-[80vh] pb-2 overscroll-auto pr-32"
    >
      <div class="flex flex-col justify-start gap-16 w-[800px]">
        <p class=" " v-html="animation?.infoText" />
      </div>
      <div class="p-8 pt-44">
        <RouterLink
          :to="`chapter/break/${video.slug ? video.slug : 'placeholder'}`"
          class="relative flex justify-center items-start gap-8"
        >
          <div class="relative">
            <div class="h-64 bg-black absolute w-full opacity-20"></div>
            <div class="h-64 bg-violet absolute w-full opacity-70"></div>
            <img
              v-if="video.slug === 'placeholder'"
              class="bg-black h-64 mix-blend-screen grayscale"
              src="/publicAssets/images/placeholders/monaLisa.webp"
            />
            <img
              v-else
              class="bg-black h-64 mix-blend-screen grayscale"
              :src="`/publicAssets/images/breakVideos/${video.slug}.png`"
            />
          </div>
          <PlayIcon class="absolute -left-8 -top-8 icon iconBig" />

          <div
            class="w-full h-full flex flex-col justify-center items-start mt-[-0.2rem] text-small"
          >
            <span class="block text-left font-semibold">
              {{ video.title }}
            </span>
            <span class="block text-left">
              {{ video.text }}
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import PlusIcon from "@/icons/custom/PlusIcon.vue";
import PlayIcon from "@/icons/custom/PlayIcon.vue";
import { toSlug } from "@/helper/general";
import { RouterLink } from "vue-router";
import jsonVideos from "@/assets/json_backend/breakVideos.json";

defineProps({
  animation: Object,
  infoIsOpen: Boolean,
});

defineEmits(["onOpen"]);

const video = {
  id: "f76eea26-c064-41c5-9347-889a65266271",
  type: "breakVideo",
  title: "Maureen Neitz",
  text: "discussing possible causes and cures for myopia",
  slug: "placeholder",
};
</script>

<style lang="scss" scoped></style>
