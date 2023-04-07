<template>
  <div class="px-left w-full flex flex-col h-full pointer-events-auto">
    {{ "test" }}
    <div class="px-left z-50 fixed flex w-[50vw] justify-between top-6 left-0">
      <!-- <span>{{ animation.title }}</span> -->
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
              ? 'italic font-semibold'
              : 'blur-xs opacity-30'
          "
          @click="setState(index, state)"
        >
          {{ state }}
        </p>
      </div>
    </div>
    <div :id="animation.id" class="w-full h-full" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { addH, removeH } from "@/helper/general";

import lottie from "lottie-web";
import animationJSON from "@/assets/json_backend/animations.json";

const props = defineProps({
  animation: Object,
  activeAnimation: String,
  progress: Number,
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

watch(
  () => props.progress,
  (newP, olP) => {
    const map = (value, x1, y1, x2, y2) =>
      ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
    let totalFrames = animationLottie.totalFrames;
    animationLottie.goToAndStop(map(newP, 0, 1, 0, totalFrames), true);
  }
);

const setState = (index, state) => {
  const totalFrames = animationLottie.totalFrames;
  const pos = totalFrames.value * index;
  const posAfter = totalFrames.value * (index + 1);
  activeState.value.state = index;
  animationLottie.playSegments([pos, posAfter], true);
};

const activeAnimation = ref(null);

onMounted(() => {
  let svgContainer = document.getElementById(props.animation.id);
  animationLottie = lottie.loadAnimation({
    rendererSettings: {
      progressiveLoad: false,
    },
    id: props.animation.id,
    speed: 3,
    wrapper: svgContainer,
    animType: "svg",
    loop: false,
    autoplay: false,
    path: "/publicAssets/animations/" + props.animation.id + ".json",
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
