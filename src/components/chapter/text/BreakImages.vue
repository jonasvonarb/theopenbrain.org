<script setup>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ref, onMounted, defineProps, nextTick } from "vue";
import { useGeneral } from "@/stores";

gsap.registerPlugin(ScrollTrigger);

const trigger = ref(null);
const image = ref(null);
const store = useGeneral();

const props = defineProps({
  title: String,
});

onMounted(() => {
  // setTimeout(() => {
  //   ScrollTrigger.create({
  //     trigger: trigger.value,
  //     start: "top",
  //     srub: 0,
  //     markers: true,
  //     onToggle: (self) => {
  //       if (self.isActive) {
  //         store.imgActive = true;
  //         gsap.to(image.value, {
  //           // transform: "translateX(-50vw)",
  //           width: window.innerWidth,
  //         });
  //       } else {
  //         store.imgActive = false;
  //         gsap.to(image.value, {
  //           // transform: "translateX(-50%)",
  //           width: window.innerWidth * 0.5,
  //         });
  //       }
  //     },
  //     onUpdate: (self) => {},
  //   });
  // }, 0);
});
</script>

<template>
  <div>
    <div
      ref="trigger"
      class="relative w-full h-[80vh] text-black overflow-x-visible my-96"
    >
      <p
        v-if="store.imgActive == false"
        class="w-full justify-center z-60 text-center -translate-x-1/2 bg-white p-2 -ml-20"
      >
        {{ title }}
      </p>
      <div
        ref="image"
        class="z-60 w-screen h-full opacity-0.2 -translate-x-1/2 -ml-20 overflow-visible bg-black"
      >
        <div
          class="flex h-full w-full justify-center items-center content-center flex-wrap"
        >
          <img class="w-[50vw]" loading="lazy" src="/assets/images/obama.gif" />
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
