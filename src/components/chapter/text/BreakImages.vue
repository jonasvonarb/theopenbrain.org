<script setup>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ref, onMounted, defineProps } from "vue";
import { useGeneral } from "@/stores";

gsap.registerPlugin(ScrollTrigger);

const trigger = ref(null);
const image = ref(null);
const store = useGeneral();

const props = defineProps({
  title: String,
});

onMounted(() => {
  ScrollTrigger.create({
    trigger: trigger.value,
    start: "+=" + 0 + "px",
    end: "+=" + window.innerHeight / 2 + "px",
    pin: trigger.value,
    srub: 0,
    markers: false,
    onToggle: (self) => {
      if (self.isActive) {
        store.imgActive = true;
        gsap.to(image.value, {
          opacity: 1,
          // padding: 0,
          transform: "translateX(-45vw)",
          width: window.innerWidth,
        });
      } else {
        store.imgActive = false;
        gsap.to(image.value, {
          // paddingTop: "200px",
          // opacity: 0.2,
          transform: "translateX(-17.5vw)",

          width: window.innerWidth * 0.45,
        });
      }
    },
    onUpdate: (self) => {},
  });
});
</script>

<template>
  <div class="pb-12">
    <div
      ref="trigger"
      class="relative w-full h-[100vh] text-black mt-12 left-0 top-0 overflow-x-visible"
    >
      <p
        v-if="store.imgActive == false"
        class="fixed flex w-screen p-0 justify-center -translate-x-[50vw] z-60"
      >
        {{ title }}
      </p>
      <div
        ref="image"
        class="fixed z-60 w-[45vw] -translate-x-[17.5vw] h-[100vh] opacity-0.2 overflow-visible"
      >
        <div
          class="flex h-full justify-start items-center content-center flex-wrap"
        >
          <img class="w-full" src="/assets/images/obama.gif" />
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
