<script setup>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ref, onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

const trigger = ref(null);
const image = ref(null);

onMounted(() => {
  ScrollTrigger.create({
    trigger: trigger.value,
    start: "top top",
    end: "+=" + window.innerHeight / 2 + "px",
    pin: trigger.value,
    srub: 0,
    markers: false,
    onToggle: (self) => {
      console.log(self.isActive);
      if (self.isActive) {
        gsap.to(image.value, {
          opacity: 1,
        });
      } else {
        gsap.to(image.value, {
          opacity: 0.5,
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
      class="relative w-screen h-screen overflow-visible left-0 top-0"
    >
      <div
        ref="image"
        class="fixed flex items-center w-full h-screen p-12 translate-x-[-45vw] opacity-50 float-right bg-black overflow-hidden"
      >
        <img class="w-screen" src="/assets/images/obama.gif" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
