<script setup>
import { useGeneral } from "@/stores";
import lottie from "lottie-web";
import { onMounted, ref } from "vue";
import { watchDebounced, useMouse } from "@vueuse/core";

import DownArrow from "@/icons/custom/DownArrow.vue";

const { x } = useMouse();

const store = useGeneral();
const animation = ref();

watchDebounced(
  x,
  (x) => {
    if (!animation.value) return;
    const map = (value, x1, y1, x2, y2) =>
      ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

    // let newFrame = map(x, 0, window.innerWidth, 0, 4).toFixed(6);
    let newFrame = map(
      x,
      0,
      window.innerWidth,
      0,
      animation.value.totalFrames
    ).toFixed(6);
    animation.value.goToAndStop(newFrame, true);
    // vid.value.currentTime = newFrame;
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
    :class="store.activeMenu ? 'w-[65vw]' : 'w-screen'"
    class="bg-img bg-light absolute right-0 h-screen z-[50] duration-300 flex justify-start items-start"
  >
    <div
      class="absolute top-0 left-0 w-screen h-screen text-white text-center flex justify-center items-center pb-8"
    >
      <div class="flex justify-center items-center flex-col w-2/3">
        <div class="text-biggest font-text">The Open Brain</div>
        <div class="text-6xl">The Retina</div>
      </div>
    </div>
    <div
      @click="scrollToPos()"
      class="absolute bottom-8 left-0 w-full flex justify-center items-center text-center"
    >
      <DownArrow class="pointer-events-auto icon iconMed" />
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
  background-image: url("/publicAssets/images/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
