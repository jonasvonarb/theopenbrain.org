<script setup>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ref, onMounted } from "vue";
import { useGeneral } from "@/stores";

gsap.registerPlugin(ScrollTrigger);

const trigger = ref(null);
const image = ref(null);
const store = useGeneral();

onMounted(() => {
  ScrollTrigger.create({
    trigger: trigger.value,
    start: "top top",
    end: "+=" + window.innerHeight / 2 + "px",
    pin: trigger.value,
    srub: 0,
    markers: false,
    onToggle: (self) => {
      if (self.isActive) {
        store.imgActive = true;
        gsap.to(image.value, {
          opacity: 1,
          background: "black",
        });
      } else {
        store.imgActive = false;
        gsap.to(image.value, {
          opacity: 0.2,
          background: "white",
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
      class="relative w-full h-screen mt-12 left-0 top-0 overflow-x-visible"
    >
      <div
        ref="image"
        class="fixed z-50 flex items-center w-full h-screen p-12 translate-x-[-45vw] opacity-0.2 float-right overflow-hidden"
      >
        <img class="w-screen" src="/assets/images/obama.gif" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
