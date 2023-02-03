<template>
  <div
    class="px-24 w-full flex flex-col h-full pointer-events-auto"
    :class="animation.noBleed ? 'px-0 pl-12' : 'px-24'"
  >
    <div :id="animation.id" class="w-full h-full" />
  </div>
</template>

<script setup>
import { watch, onMounted } from "vue";

import lottie from "lottie-web";

const props = defineProps({
  animation: Object,
  activeAnimation: String,
  progress: Number,
});
let animationLottie;

watch(
  () => props.progress,
  (newP, olP) => {
    const map = (value, x1, y1, x2, y2) =>
      ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
    let totalFrames = animationLottie.totalFrames;
    let newMap = map(newP, 0.1, 0.9, 0, totalFrames);
    let frame =
      totalFrames > newMap ? (0 < newMap ? newMap : 1) : totalFrames - 1;
    animationLottie.goToAndStop(frame, true);
  }
);

onMounted(() => {
  let svgContainer = document.getElementById(props.animation.id);
  animationLottie = lottie.loadAnimation({
    id: props.animation.id,
    speed: 3,
    wrapper: svgContainer,
    animType: "svg",
    loop: false,
    autoplay: false,
    path: "/assets/animations/" + props.animation.id + ".json",
  });
  animationLottie.setSubframe(true);
});
</script>

<style lang="scss" scoped></style>
