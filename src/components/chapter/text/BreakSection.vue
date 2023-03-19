<script setup>
import gsap from "gsap";
import { ref } from "vue";
import { toSlug } from "@/helper/general.js";
import PlusIcon from "@/icons/custom/PlusIcon.vue";
import TitleIllus from "../../UI/TitleIllus.vue";
import TextOverlay from "../Illus/TextOverlay.vue";

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
    class="w-screen h-[180vh] -ml-20 -translate-x-custom border-y border-light bg-dark my-[0] mt-64 mb-32 text-base"
  >
    <div class="sticky flex top-0 h-screen w-full pl-left py-10">
      <div class="w-full text-white">
        <div
          class="flex flex-col justify-strat"
          v-if="content.title === 'Blind spot' || 'Color blindness'"
        >
          <TitleIllus
            :title="content.title"
            :class="
              !infoIsOpen && content.title === 'Color blindness'
                ? 'text-black z-[100]'
                : ''
            "
          />

          <TextOverlay
            :animation="content"
            :infoIsOpen="infoIsOpen"
            @onOpen="openInfo"
          />
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
