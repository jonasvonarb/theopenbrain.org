<script setup>
import gsap from "gsap";
import { ref } from "vue";
import { toSlug } from "@/helper/general.js";
import PlusIcon from "@/icons/custom/PlusIcon.vue";

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
    class="w-screen h-[180vh] -ml-20 -translate-x-custom border-y border-light bg-dark my-[0] mb-32 text-base"
  >
    <div class="sticky flex top-0 h-screen w-full pl-28 py-10">
      <div class="w-full text-white">
        <div
          class="flex flex-col justify-strat "
          v-if="content.title === 'Blind spot' || 'Color blindness'"
        >
          <h4
            :class="
              !infoIsOpen && content.title === 'Color blindness'
                ? 'text-black z-[100]'
                : ''
            "
          >
            {{ content.title }}
          </h4>
          <div class="flex gap-6 z-50 pt-12">
            <PlusIcon
              :class="!infoIsOpen ? '' : 'rotate-45'"
              class="icon iconBig duration-300"
              @click="openInfo()"
            />
            <div
              :id="'info-' + toSlug(content.title)"
              class="flex justify-between w-full h-auto max-h-[80vh] overflow-scroll pb-2 overscroll-auto pr-32"
            >
              <div class="flex flex-col justify-start gap-16 w-[800px]">
                <p class=" " v-html="content.text" />
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
              <div class="w-[25vw] h-[24vw] -mt-2">
                <img
                  class="h-full w-full object-contain object-right-top"
                  v-if="content.title === 'Blind spot'"
                  :src="`/publicAssets/images/${toSlug(content.title)}.png`"
                />
              </div>
            </div>
          </div>
          <div
            class="absolute duration-300 top-0 left-0 p-32 pl-80 py-72 flex justify-around items-center w-full h-full pointer-events-none"
            :class="infoIsOpen ? 'opacity-10 blur-sm' : 'opacity-100'"
          >
            <div
              class="absolute top-0 left-0 p-32 pl-44 py-72 flex justify-around items-center w-full h-full pointer-events-none"
              v-if="content.title === 'Blind spot'"
            >
              <div class="text-blindness">A</div>
              <div class="text-blindness">B</div>
            </div>
            <div
              v-if="content.title === 'Color blindness'"
              class="absolute top-0 left-0 p-32 pl-44 py-72 flex justify-around items-center w-full h-full bg-lightest"
            >
              <img
                class="w-full h-full object-contain"
                src="/publicAssets/images/eyeDots.svg"
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

.-translate-x-custom {
  transform: translateX(min(-50vw, calc(-100vw + 780px + 11rem - 1px)));
}
</style>
