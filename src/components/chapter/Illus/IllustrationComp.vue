<template>
  <div
    class="px-24 w-full flex flex-col justify-center h-[90%] pointer-events-auto bg-gray-100"
  >
    <div
      class="px-24 pl-32 z-50 fixed flex w-[50vw] justify-between items-center top-6 left-0"
    >
      <span>{{ animation.title }}</span>
      <span v-if="animation.loop" class="hover:underline" @click="replay()"
        >replay</span
      >
      <div v-if="animation.states">
        <p
          v-for="(state, index) in animation.states"
          :key="state"
          class="hover:underline duration-300"
          :class="
            activeState.state == index
              ? 'italic font-bold'
              : 'blur-xs opacity-30'
          "
          @click="setState(index, state)"
        >
          {{ state }}
        </p>
      </div>
    </div>
    <div :id="animation.id" class="w-full h-full px-24 pl-32 max-h-[600px]" />
  </div>
</template>

<script setup>
import { ref, onUpdated, onMounted } from "vue";
import { addH, removeH } from "@/helper/general";
import { useGeneral } from "@/stores";

import lottie from "lottie-web";
import animationJSON from "@/assets/animations.json";

const props = defineProps({
  animation: Object,
  activeAnimation: String,
});
let animationLottie;
// const emit = defineEmits(["clickAction"]);

const activeState = ref({
  state: 0,
});

const replay = () => {
  const info = animationJSON.animations.find((x) => {
    return x.id == props.animation.id;
  });
  if (!info.loopSection) {
    animationLottie.goToAndPlay(0, true);
  } else {
    animationLottie.playSegments(info.loopSection, true);
  }
};

const setState = (index, state) => {
  const totalFrames = animationLottie.totalFrames / 5;
  const pos = (totalFrames.value / 3) * index;
  const posAfter = (totalFrames.value / 3) * (index + 1);
  activeState.value.state = index;
  animationLottie.playSegments([pos, posAfter], true);
};

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

<style lang="scss" scoped></style>
