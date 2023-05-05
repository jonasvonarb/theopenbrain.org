<template>
  <div :id="animation?.id + state.toUpperCase()" class="w-full" />
</template>

<script setup>
import { onMounted } from "vue";
import lottie from "lottie-web";
import { addH, removeH } from "@/helper/general";

import animationJSON from "@/assets/json_backend/animations.json";

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
    loop: true,
    autoplay: false,
    rendererSettings: {
      progressiveLoad: false,
    },
    path:
      "/publicAssets/animations/" +
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

<style scoped></style>
