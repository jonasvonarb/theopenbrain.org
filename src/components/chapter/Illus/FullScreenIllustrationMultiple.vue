<script setup>
import { onMounted } from "vue";
import lottie from "lottie-web";
import { addH, removeH } from "@/helper/general";

import animationJSON from "@/assets/animations.json";

const props = defineProps({
  animation: Object,
  state: String,
});
let animationLottie;

onMounted(() => {
  let svgContainer = document.getElementById(
    props.animation.id + props.state.toUpperCase()
  );
  if (!svgContainer) return;
  animationLottie = lottie.loadAnimation({
    id: props.animation.id + props.state.toUpperCase(),
    speed: 3,
    wrapper: svgContainer,
    animType: "svg",
    loop: false,
    autoplay: false,
    path:
      "/assets/animations/" +
      props.animation.id +
      props.state.toUpperCase() +
      ".json",
  });
  animationLottie.addEventListener("DOMLoaded", () => {
    const highligters = document.getElementsByClassName("highlighterIllu");
    for (let highlighter of highligters) {
      highlighter.addEventListener("mouseover", (event) => addH(event));
      highlighter.addEventListener("mouseleave", (event) => removeH(event));
    }
  });
  animationLottie.setSubframe(true);
  animationLottie.setSpeed(1);
  animationLottie.play();
});
</script>

<template>
  <div class="flex justify-center items-center h-full flex-wrap">
    <div
      :id="animation?.id + state.toUpperCase()"
      class="flex-grow h-full w-full object-contain"
    />
  </div>
</template>

<style scoped></style>
