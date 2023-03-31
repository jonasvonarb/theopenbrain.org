<template>
  <div class="flex flex-col z-50 pt-20 font-sans text-white w-wrapper">
    <PlusIcon
      :class="!infoIsOpen ? '' : 'rotate-45'"
      class="icon duration-300 z-50"
      @click="$emit('onOpen')"
    />
    <div
      :id="'info-' + toSlug(animation?.title)"
      class="flex -mt-12 flex-row text-base h-text pb-2 overscroll-auto"
    >
      <div
        class="flex flex-col pt-20 justify-start gap-16 w-container overflow-y-scroll overflow-x-visible"
      >
        <div class="pb-20">
          <p class="w-oText" v-html="animation?.infoText || animation?.text" />
          <div v-if="animation?.steps" class="w-oText">
            <p class="font-semibold">Directions:</p>
            <ol class="pl-12">
              <li
                v-for="step in animation?.steps"
                class="pb-6 last:pb-0 list-decimal list-outside"
                :key="step"
              >
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
        <!-- <div
          :class="infoIsOpen ? 'opacity-100' : 'opacity-0'"
          class="absolute bottom-0 w-container h-24 bg-gradient-to-t from-bgDa duration-300"
        />
        <div
          :class="infoIsOpen ? 'opacity-100' : 'opacity-0'"
          class="absolute top-36 w-container h-20 bg-gradient-to-b from-bgDa duration-300"
        /> -->
      </div>
      <div v-if="infoIsOpen" class="p-0 pt-10 pb-12 overflow-visible w-asset">
        <img
          class="h-full pl-20 w-2/3 object-contain object-left-top"
          v-if="animation.title === 'Blind spot'"
          :src="`/publicAssets/images/${toSlug(animation.title)}.png`"
        />
        <RouterLink
          v-if="animation.id === 'animationImpairedVision'"
          :to="`chapter/break/${video.slug ? video.slug : 'placeholder'}`"
          class="relative flex justify-center items-start gap-4"
        >
          <div class="relative">
            <div class="h-80 bg-black absolute w-full opacity-20"></div>
            <div class="h-80 bg-primaryMed absolute w-full opacity-70"></div>
            <img
              v-if="video.slug === 'placeholder'"
              class="bg-black h-80 mix-blend-screen grayscale"
              src="/publicAssets/images/placeholders/monaLisa.webp"
            />
            <img
              v-else
              class="bg-black h-80 mix-blend-screen grayscale"
              :src="`/publicAssets/images/breakVideos/${video.slug}.png`"
            />
          </div>
          <PlayIcon class="absolute -left-8 -mt-8 icon iconBig z-30" />

          <div
            class="w-full h-full opacity-70 flex flex-col justify-center items-start mt-[-0.2rem] text-small"
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
    <div
      :class="!infoIsOpen ? 'hidden' : ''"
      class="fixed z-20 ml-text -left-0.5 pointer-events-none top-0 w-1 h-full border-l border-white"
    ></div>
  </div>
</template>

<script setup>
import PlusIcon from "@/icons/custom/PlusIcon.vue";
import PlayIcon from "@/icons/custom/PlayIcon.vue";
import { toSlug } from "@/helper/general";
import { RouterLink } from "vue-router";

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

<style scoped>
.w-wrapper {
  width: calc(100vw - 5.8rem);
}
.w-container {
  width: max(calc(50vw - 5.8rem), calc(100vw - 780px - 11rem - 5.8rem));
}
.w-oText {
  width: min(calc(50vw - 10rem), calc(780px));
}
.w-asset {
  width: min(50vw, calc(780px));
}

.h-text {
  height: calc(100vh - 5rem - 52px);
}
</style>
