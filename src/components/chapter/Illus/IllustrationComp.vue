<template>
  <div
    class="px-24 w-full flex flex-col justify-center h-[100%] pointer-events-auto"
  >
    <div
      class="px-24 pl-32 z-50 fixed flex w-[50vw] justify-between top-6 left-0"
      :class="animation.multiple ? 'items-center' : 'items-start'"
    >
      <span>{{ animation.title }}</span>
      <span v-if="animation.loop" class="hover:underline" @click="replay()"
        >replay</span
      >
      <div
        v-if="animation.multiple"
        class="fixed top-0 left-0 w-[50vw] h-screen px-24 pl-32 flex flex-col justify-center items-start"
      >
        <template
          v-for="(state, index) in Object.keys(animation.states)"
          :key="state"
        >
          <IllustarionMultiple
            v-if="activeState.state === index"
            :state="state"
            :animation="animation"
            class="max-h-[600px]"
          />
        </template>
        <div v-if="animation.states">
          <p
            v-for="(state, index) in !animation.multiple
              ? animation.states
              : Object.keys(animation.states)"
            :key="state"
            class="hover:underline duration-300 text-small"
            :class="
              activeState.state == index
                ? 'italic font-bold'
                : 'blur-xs opacity-30'
            "
            @click="setState(index, state)"
          >
            Task {{ index + 1 }}: {{ animation.states[state] }}
          </p>
        </div>
      </div>
      <div v-if="animation.states && !animation.multiple">
        <p
          v-for="(state, index) in !animation.multiple
            ? animation.states
            : Object.keys(animation.states)"
          :key="state"
          class="hover:underline duration-300 text-small"
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
    <div
      v-if="!animation.multiple"
      :id="animation.id"
      class="w-full h-full px-24 pl-32 max-h-[600px]"
    />
  </div>
</template>

<script setup>
import IllustarionMultiple from "@/components/chapter/Illus/IllustarionMultiple.vue";
import { ref, onMounted } from "vue";
import { addH, removeH } from "@/helper/general";

import lottie from "lottie-web";
import animationJSON from "@/assets/animations.json";

const props = defineProps({
  animation: Object,
  activeAnimation: String,
});
let animationLottie;

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
  console.log(index);
  if (!props.animation.multiple) {
    const totalFrames = animationLottie.totalFrames / 5;
    const pos = (totalFrames.value / 3) * index;
    const posAfter = (totalFrames.value / 3) * (index + 1);
    activeState.value.state = index;
    animationLottie.playSegments([pos, posAfter], true);
  } else {
    activeState.value.state = index;
  }
};

onMounted(() => {
  let svgContainer = document.getElementById(props.animation.id);
  if (!svgContainer) return;
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
