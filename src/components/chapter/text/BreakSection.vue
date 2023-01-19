<script setup>
import gsap from "gsap";
import { ref, onMounted } from "vue";
import { toSlug } from "@/helper/general.js";
import EpCirclePlus from "../../../icons/EpCirclePlus.vue";
import BiDashCircle from "../../../icons/BiDashCircle.vue";

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
    class="w-screen h-[180vh] -translate-x-1/2 -ml-40 text-white my-[10vh] text-small font-mono"
  >
    <div class="sticky flex top-0 h-screen w-full pl-52 py-32">
      <div class="border w-full text-black p-6 bg-white border-dark">
        <div
          class="flex flex-col justify-strat h-ful"
          v-if="content.title === 'Blind Spot' || 'Color Blindness'"
        >
          <h4 class="pb-6">{{ content.title }}</h4>
          <div class="flex gap-6 bg-white z-50">
            <EpCirclePlus
              v-if="!infoIsOpen"
              class="w-8 h-8 hover:opacity-70 cursor-pointer"
              @click="openInfo()"
            />
            <BiDashCircle
              v-else
              class="p-[1px] w-8 h-8 hover:opacity-70 cursor-pointer"
              @click="openInfo()"
            />
            <div
              :id="'info-' + toSlug(content.title)"
              class="flex justify-start w-full h-auto overflow-hidden gap-32 border-b pb-2"
              :class="infoIsOpen ? 'border-black' : 'border-white'"
            >
              <p class="w-1/2 max-w-[600px]" v-html="content.text"></p>
              <ol class="w-1/2 max-w-[600px] list-decimal list-outside">
                <li
                  v-for="step in content.steps"
                  class="pb-6 last:pb-0"
                  :key="step"
                >
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
          <div
            class="absolute top-0 left-0 p-32 pl-80 py-72 flex justify-around items-center w-full h-full pointer-events-none"
            v-if="content.title === 'Blind Spot'"
          >
            <img class="w-32 h-32" src="/assets/icons/BlindSpotCross.svg" />
            <img class="w-32 h-32" src="/assets/icons/BlindSpotDot.svg" />
          </div>
          <div
            v-if="content.title === 'Color Blindness'"
            class="absolute top-0 left-0 p-32 pl-80 py-72 flex justify-around items-center w-full h-full"
          >
            <img
              class="w-full h-full object-contain"
              src="/assets/images/eyeDots.png"
            />
          </div>
        </div>
        <template
          v-if="content.title === 'Pathway for the pupillary light reflex'"
        >
          <h4 class="pb-6">{{ content.title }}</h4>
          <div
            class="w-full absolute p-56 z-50 top-0 left-0 flex h-full justify-center items-center content-center flex-wrap duration-500"
          >
            <img
              class="h-full max-w-[95%] lazy"
              src="/assets/images/pupillary_Light_Reflex.jpg"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.z-60 {
  z-index: 60;
}
</style>
