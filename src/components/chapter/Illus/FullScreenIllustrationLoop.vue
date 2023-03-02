<template>
  <div
    ref="container"
    class="absolute top-0 left-0 w-screen h-screen noHyphens pl-20"
  >
    <template v-if="isActive">
      <!-- <h4 class="absolute">{{ animation.title }}</h4> -->
      <div class="w-full h-full flex items-start text-small">
        <div class="w-5/8 h-full flex justify-end items-end bg-med pl-12">
          <div class="h-[75%] w-full pb-24" :id="animation.id" />
        </div>
        <div
          class="w-2/8 h-full flex flex-col gap-12 bg-light pt-32 px-12 border-l border-black"
        >
          <ol class="w-full">
            <li
              class="pt-10 first-of-type:pt-0 pointer-event-none flex gap-3"
              v-for="(state, index) of animation.states"
              :key="state"
            >
              <div
                :class="currenSection === index ? 'bg-green' : 'bg-white'"
                class="shrink-0 duration-500 -mt-[0.4rem] pt-0.5 mr-2 rounded-full border border-black h-10 w-10 text-center"
              >
                {{ index + 1 }}
              </div>
              <div>{{ state }}</div>
            </li>
          </ol>
        </div>
        <div
          class="w-1/8 h-full flex flex-col gap-12 bg-lighter pt-32 border-l border-black"
        >
          <ul v-if="animation.statesHighlight" class="w-full px-12">
            <li
              class="pb-6 cursor-pointer flex gap-3"
              :class="
                toCamelCase(state) === activeState
                  ? 'underline  text-violet hover:text-violet'
                  : ' hover:text-violet'
              "
              v-for="state of animation.statesHighlight"
              :key="state"
              @click="setState(state)"
            >
              {{ state }}
            </li>
          </ul>
        </div>
        <div class="absolute top-10 right-12 flex gap-3">
          <!-- <p v-if="!isPlay" @click="next()" class="hover:text-violet">next</p> -->
          <p
            @click="setSpeed()"
            v-if="speed === 0.7"
            class="hover:text-white cursor-pointer icon flex justify-center items-center text-smaller"
          >
            1x
          </p>
          <p
            v-else
            @click="setSpeed()"
            class="hover:text-white cursor-pointer icon flex justify-center items-center text-smaller"
          >
            2x
          </p>
          <PlayIcon v-if="!isPlay" @click="playPause()" class="icon" />
          <PauseIcon v-else @click="playPause()" class="icon" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import lottie from "lottie-web";
import { toCamelCase } from "@/helper/general";
import PlayIcon from "../../../icons/custom/PlayIcon.vue";
import PauseIcon from "../../../icons/custom/PauseIcon.vue";

const props = defineProps({
  animation: Object,
  state: String,
});

let animationLottie;

const activeState = ref(0);
const frame = ref(0);
const currenSection = ref(0);

const isPlay = ref(true);
const speed = ref(0.7);

const frames = {
  pathwayForThePupillaryLightReflex: [0, 12, 36, 60, 90],
  phototransduction: [0, 6, 25, 55, 69, 79, 159, 213],
  theVisualCycle: [0, 11, 36, 72, 132, 192, 240],
};

const setState = (stateIncoming) => {
  let state = toCamelCase(stateIncoming);

  if (activeState.value === state) {
    activeState.value = 0;
  } else {
    activeState.value = state;
  }
  let prevEls = [...document.getElementsByClassName("highlightIllu")];
  for (let el of prevEls) {
    el.classList.remove("highlightIllu");
  }
  if (activeState.value === 0) return;
  let stateChanged =
    stateIncoming === "α"
      ? "alpha"
      : stateIncoming === "γ"
      ? "beta"
      : stateIncoming === "β"
      ? "gamma"
      : stateIncoming === "Phosphodiesterase (PDE)"
      ? "phosphodiesterasePde"
      : stateIncoming === "cGMP"
      ? "cgmp"
      : stateIncoming === "GMP"
      ? "gmp"
      : stateIncoming === "GTP"
      ? "gtp"
      : stateIncoming === "RPE"
      ? "rpe"
      : stateIncoming === "IRBP"
      ? "irbp"
      : stateIncoming === "NA+"
      ? "na"
      : stateIncoming;

  let els = [
    ...document.getElementsByClassName(toCamelCase(stateChanged) + "Highlight"),
  ];
  console.log(els);
  for (let el of els) {
    el.classList.add("highlightIllu");
  }
};

const playPause = () => {
  isPlay.value = !isPlay.value;

  if (isPlay.value === true) {
    animationLottie.play();
  } else {
    animationLottie.pause();
  }
};

const setSpeed = () => {
  if (speed.value === 0.7) {
    speed.value = 0.2;
    animationLottie.setSpeed(speed.value);
  } else {
    speed.value = 0.7;
    animationLottie.setSpeed(speed.value);
  }
};

const container = ref();
const isActive = ref(true);

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
    path: "/publicAssets/animations/" + props.animation.id + ".json",
    rendererSettings: {
      progressiveLoad: true,
    },
  });
  setTimeout(() => {
    animationLottie.play();
  }, 1000);

  const complete = () => {
    if (!isPlay.value) return;
    animationLottie.playSegments([0, animationLottie.animationData.op], true);
  };
  animationLottie.addEventListener("complete", complete);
  animationLottie.setSubframe(true);
  animationLottie.setSpeed(0.7);
  setInterval(() => {
    frame.value = animationLottie.currentFrame;
    for (let state in props.animation.states) {
      if (
        Math.floor(frame.value) ===
        frames[toCamelCase(props.animation.title)][state]
      ) {
        currenSection.value = +state;
      }
    }
  }, 10);
});
</script>

<style scoped>
.noHyphens {
  hyphens: none;
}
</style>
