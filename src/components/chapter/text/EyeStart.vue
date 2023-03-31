<script setup>
import { useGeneral } from "@/stores";
import lottie from "lottie-web";
import { onMounted, ref } from "vue";
import { watchDebounced, useMouse } from "@vueuse/core";

import DownArrow from "@/icons/custom/DownArrow.vue";

const { x } = useMouse();

const animation = ref();
const newFrame = ref(0);

onMounted(() => {
  let svgContainer = document.getElementById("introAnimation");
  animation.value = lottie.loadAnimation({
    rendererSettings: {
      scaleMode: "noScale",
      progressiveLoad: true,
      preserveAspectRatio: "xMidYMid slice",
    },
    id: "introAnimation",
    speed: 3,
    wrapper: svgContainer,
    animType: "svg",
    loop: false,
    autoplay: false,
    path: "/publicAssets/animations/introAnimation.json",
  });
  animation.value.setSubframe(true);
});

watchDebounced(
  x,
  (x) => {
    if (!animation.value) return;
    const map = (value, x1, y1, x2, y2) =>
      ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
    newFrame.value = map(
      x,
      0,
      window.innerWidth,
      0,
      animation.value.animationData.op
    ).toFixed(3);
    animation.value.goToAndStop(newFrame.value, true);
  },
  { debounce: 0 }
);

const scrollToPos = () => {
  document.getElementById("container").scrollIntoView({ behavior: "smooth" });
};
</script>
<template>
  <div
    id="titleAnimation"
    class="bg-img bg-bgLi absolute right-0 h-screen w-screen z-[50] duration-300 flex justify-start items-start"
  >
    <div
      class="sticky top-6 left-20 text-white text-biggest flex items-center gap-4 z-50"
    >
      <img src="/favicon_io/android-chrome-512x512.png" class="h-20 invert" />
      The Open Brain
    </div>
    <div class="absolute right-0 h-screen w-screen" id="introAnimation" />
    <div
      @click="scrollToPos()"
      class="absolute bottom-8 left-1/2 -ml-5 flex justify-center items-center text-center"
    >
      <DownArrow
        class="pointer-events-auto hover:bg-primaryLi iconBig cursor-pointer rounded-full"
      />
    </div>
  </div>
</template>

<style>
#animationStart > svg {
  height: calc(100vh - 5rem);
}
.h-start {
  height: calc(100vh);
}

.bg-img {
  background: black;
  /* background-image: url("/publicAssets/images/background.jpg"); */
  /* background-repeat: no-repeat;
  background-position: center;
  background-size: cover; */
}
</style>
