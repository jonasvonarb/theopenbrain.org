<template>
  <div
    ref="container"
    class="absolute top-0 left-0 w-screen h-screen noHyphens"
  >
    <template v-if="isActive">
      <div class="w-full h-screen flex items-start text-small">
        <div
          class="block-1 relative h-full flex justify-center items-end bg-med pl-20"
        >
          <div
            class="max-h-[70vh] max-w-[80%] w-full h-full pb-24"
            :id="animation.id"
          />
          <div class="absolute top-10 right-12 z-[60] text-white flex gap-2">
            <PauseIcon
              v-if="isPlay"
              :class="[
                !isPlay ? 'opacity-20 pointer-events-none ' : '',
                isGoingNext &&
                  'pointer-events-none !bg-violet !border-violet !fill-white',
              ]"
              @click="playPause()"
              class="icon"
            />
            <ReplayIcon
              v-else
              @click="playPause()"
              class="icon"
              :class="[
                isPlay ? 'opacity-20 pointer-events-none ' : '',
                isGoingNext ? 'opacity-20 pointer-events-none' : '',
              ]"
            />
            <NextIcon
              :class="[
                isPlay ? 'opacity-20 pointer-events-none ' : '',
                isGoingNext &&
                  'pointer-events-none !bg-violet !border-violet !fill-white',
              ]"
              @click="nextStep()"
              class="icon"
            />
          </div>
          <div class="absolute bottom-16 right-12 z-[60] text-white flex gap-2">
            <div>Speed:</div>
            <div
              @click="setSpeed()"
              class="hover:opacity-100 cursor-pointer"
              :class="
                speed === 0.6
                  ? 'opacity-50'
                  : 'opacity-100  pointer-events-none underline'
              "
            >
              1X
            </div>
            <div>|</div>
            <div
              @click="setSpeed()"
              class="hover:opacity-100 cursor-pointer"
              :class="
                speed === 0.2
                  ? 'opacity-50'
                  : 'opacity-100 pointer-events-none underline'
              "
            >
              2X
            </div>
          </div>
        </div>
        <div
          class="relative block-2 text-medium h-full flex flex-col gap-12 bg-light pt-9 px-0 pr-0 border-l border-black"
        >
          <ol class="w-full">
            <li
              class="pb-5 pt-1.5 first-of-type:mt-0 pointer-event-none flex border-b pl-8 p-24 border-black"
              v-for="(state, index) of animation.states"
              :key="state"
              :class="
                currenSection === index
                  ? ' bg-violet text-white'
                  : ' bg-transparent'
              "
            >
              <div
                :class="currenSection === index ? '' : ''"
                class="shrink-0 duration-300 h-10 w-10 text-center rounded-full"
              >
                {{ index + 1 }}.
              </div>
              <span class="-my-1 py-1 pl-3 duration-300">
                {{ state }}
              </span>
            </li>
          </ol>
          <!-- controlls -->
        </div>
        <div
          class="block-3 h-full flex flex-col gap-12 bg-lighter pt-10 border-l border-black"
        >
          <ul v-if="animation.statesHighlight" class="w-full px-8 pr-20 pt-2">
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
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import lottie from "lottie-web";
import { toCamelCase } from "@/helper/general";
import ReplayIcon from "../../../icons/custom/ReplayIcon.vue";
import PauseIcon from "../../../icons/custom/PauseIcon.vue";
import NextIcon from "../../../icons/custom/NextIcon.vue";

const props = defineProps({
  animation: Object,
  state: String,
});

let animationLottie;

const activeState = ref(0);
const frame = ref(0);
const currenSection = ref(0);

const isPlay = ref(true);
const isGoingNext = ref(false);
const speed = ref(0.6);

const frames = {
  pathwayForThePupillaryLightReflex: [0, 12, 36, 60, 88, 120],
  phototransduction: [0, 6, 25, 55, 69, 79, 159, 213, 240],
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
  for (let el of els) {
    el.classList.add("highlightIllu");
  }
};

const playPause = () => {
  isPlay.value = !isPlay.value;

  if (isPlay.value === true) {
    animationLottie.playSegments(
      [frame.value, animationLottie.animationData.op],
      true
    );
  } else {
    nextStep(true);
  }
};

const nextStep = (pause = false) => {
  isGoingNext.value = true;
  const tF = animationLottie.animationData.op;
  animationLottie.playSegments([0, tF], false);
  const targetFrame =
    frames[toCamelCase(props.animation.title)][
      +currenSection.value + (pause ? 1 : 2)
    ] || frames[toCamelCase(props.animation.title)][1];
  isPlay.value = false;
  const cF = animationLottie.projectInterface.currentFrame;
  const lS =
    frames[toCamelCase(props.animation.title)][
      frames[toCamelCase(props.animation.title)].length - 2
    ];
  const startFrame = cF <= lS ? cF : 0;
  animationLottie.playSegments([startFrame, targetFrame], true);
};

const setSpeed = () => {
  if (speed.value === 0.6) {
    speed.value = 0.2;
    animationLottie.setSpeed(speed.value);
  } else {
    speed.value = 0.6;
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
    isGoingNext.value = false;
    if (isPlay.value) {
      animationLottie.playSegments([0, animationLottie.animationData.op], true);
    } else {
      const tF = animationLottie.animationData.op;
      animationLottie.playSegments([0, tF], false);
      animationLottie.pause();
    }
  };
  animationLottie.addEventListener("complete", complete);
  animationLottie.setSubframe(true);
  animationLottie.setSpeed(0.5);
  setInterval(() => {
    frame.value = animationLottie.projectInterface.currentFrame;
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

.block-1 {
  width: max(50vw, calc(100vw - 780px - 11rem));
}
.block-2 {
  width: min(calc(50vw / 8 * 5), calc((780px + 11rem) / 8 * 5));
  overflow: hidden;
}
.block-3 {
  /* width: calc(780px + 11rem); */
  width: min(calc(50vw / 8 * 3), calc((780px + 11rem) / 8 * 3));
  overflow: hidden;
}
</style>
