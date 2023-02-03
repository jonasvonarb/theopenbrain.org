<script setup>
import gsap from "gsap";
import { ref } from "vue";
import { toSlug } from "@/helper/general.js";
import EpCirclePlus from "../../../icons/EpCirclePlus.vue";

const props = defineProps({
  content: Object,
});
const infoIsOpen = ref(true);
const openInfo = () => {
  const el = document.getElementById("info-" + toSlug(props.content.title));
  infoIsOpen.value = !infoIsOpen.value;
  if (infoIsOpen.value) {
    gsap.to(el, {
      duration: 0.3,
      height: "auto",
    });
  } else {
    gsap.to(el, {
      duration: 0.3,
      height: 0,
    });
  }
};
</script>

<template>
  <div
    ref="trigger"
    class="w-screen h-[180vh] -ml-20 -translate-x-1/2 border-y border-light bg-dark my-[25vh] text-medium font-mono"
  >
    <div class="sticky flex top-0 h-screen w-full pl-24 py-10">
      <div class="w-full text-white">
        <div
          class="flex flex-col justify-strat h-ful"
          v-if="content.title === 'Blind Spot' || 'Color Blindness'"
        >
          <h4 class="">{{ content.title }}</h4>
          <div class="flex gap-6 z-50 pt-20">
            <EpCirclePlus
              :class="!infoIsOpen ? '' : 'rotate-45'"
              class="w-8 h-8 hover:opacity-70 cursor-pointer duration-300"
              @click="openInfo()"
            />
            <div
              :id="'info-' + toSlug(content.title)"
              class="flex flex-col justify-start w-[40vw] max-w-[780px] h-auto max-h-[80vh] overflow-scroll gap-16 pb-2 overscroll-auto"
            >
              <p class=" " v-html="content.text"></p>
              <div v-if="content.steps" class="">
                <p class="font-semibold">Directions:</p>
                <ol class="pl-12">
                  <li
                    v-for="step in content.steps"
                    class="pb-6 last:pb-0 list-decimal list-outside"
                    :key="step"
                  >
                    {{ step }}
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div
            class="absolute duration-300 top-0 left-0 p-32 pl-80 py-72 flex justify-around items-center w-full h-full pointer-events-none"
            :class="infoIsOpen ? 'opacity-10 blur-sm' : 'opacity-100'"
          >
            <div
              class="absolute top-0 left-0 p-32 pl-44 py-72 flex justify-around items-center w-full h-full pointer-events-none"
              v-if="content.title === 'Blind Spot'"
            >
              <div class="text-blindness">A</div>
              <div class="text-blindness">B</div>
            </div>
            <div
              v-if="content.title === 'Color Blindness'"
              class="absolute top-0 left-0 p-32 pl-44 py-72 flex justify-around items-center w-full h-full"
            >
              <img
                class="w-full h-full object-contain"
                src="/assets/images/eyeDots.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.z-60 {
  z-index: 60;
}
</style>
