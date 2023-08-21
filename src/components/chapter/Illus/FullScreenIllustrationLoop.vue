<template>
  <div
    ref="container"
    class="absolute top-0 left-0 w-screen h-screen noHyphens text-white text-select-off"
  >
    <template v-if="isActive">
      <div class="w-full h-screen flex items-start text-small">
        <div
          class="block-1 relative h-full flex justify-center items-end bg-fullDa border-r border-white pl-left"
        >
          <div
            class="max-h-anim max-w-[100%] w-full h-full pb-0"
            :id="animation.id"
          />
          <div
            class="absolute flex items-end flex-col w-full left-0 font-sans top-64 z-[60] text-base text-left"
          >
            <div
              class="flex justify-between w-full pl-left bg-fullHDa p-6 py-4 pr-30"
            >
              <span class="w-oText flex items-start pr-16">
                <span class="pr-3 text-start shrink-1 pl-1">
                  {{ currenSection + 1 }}.
                </span>
                {{ animation.states?.[currenSection] }}
              </span>
              <DownArrow
                @click="nextStep()"
                class="icon iconBig iconFull -rotate-90 hover:border-white hover:fill-white"
              />
            </div>
            <!-- <div class="z-[60] text-white flex gap-2 pr-6 pt-6">
              <PauseIcon
                v-if="isPlay"
                :class="[
                  !isPlay ? 'opacity-20 pointer-events ' : '',
                  isGoingNext &&
                    'pointer-events-none !bg-fullHDa !border-fullHDa !fill-white',
                ]"
                @click="playPause()"
                class="icon"
              />
              <PlayIcon
                v-else
                @click="playPause()"
                class="icon"
                :class="[
                  isPlay ? 'opacity-20 pointer-events-none ' : '',
                  isGoingNext ? 'opacity-20 pointer-events-none' : '',
                ]"
              />
            </div> -->
          </div>
        </div>
        <div
          class="relative block-2 text-medium h-full flex flex-col gap-12 bg-fullMed px-0 pr-0 pt-40 border-l border-black"
        >
          <ol class="w-full h-full overflow-scroll">
            <li
              class="pb-10 pt-1.5 first-of-type:mt-0 pointer-event-none flex flex-col pl-8 p-24 hover:text-fullHDa cursor-pointer"
              v-for="(state, index) of animation.states"
              :key="state"
              @click="goToStep(index)"
            >
              <div class="shrink-0 duration-300 text-left">
                {{ index + 1 }}
              </div>
              <span class="duration-300">
                {{ state }}
              </span>
            </li>
          </ol>
          <!-- controlls -->
        </div>
        <div
          class="block-3 font-bold h-full flex flex-col gap-12 bg-fullLi pt-40 border-l border-black"
        >
          <ul v-if="animation.statesHighlight" class="w-full px-8 pr-20 pt-2">
            <li
              class="pb-10 cursor-pointer flex items-center gap-5"
              :class="
                toCamelCase(
                  state
                    ?.replaceAll('<span class=\'superscirpt\'>', '')
                    ?.replaceAll('</span>', '')
                ) === activeState
                  ? 'underline  text-primaryMed hover:text-primaryMed'
                  : ' hover:text-primaryMed'
              "
              v-for="state of animation.statesHighlight"
              :key="state"
              @click="
                setState(
                  state
                    ?.replaceAll('<span class=\'superscirpt\'>', '')
                    ?.replaceAll('</span>', '')
                )
              "
            >
              <img
                loading="lazy"
                class="invert h-10"
                :src="`/publicAssets/icons/fullScreenAnimations/${toCamelCase(
                  state
                    ?.replaceAll('<span class=\'superscirpt\'>', '')
                    ?.replaceAll('</span>', '')
                )}.svg`"
              />
              <span v-html="state" />
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
import DownArrow from "../../../icons/custom/DownArrow.vue";

const props = defineProps({
  animation: Object,
  state: String,
});

let animationLottie;

const activeState = ref(0);
const frame = ref(0);
const currenSection = ref(0);

const isPlay = ref(false);
const isGoingNext = ref(false);
const speed = ref(1);

const frames = {
  pathwayForThePupillaryLightReflex: [0, 48, 96, 144, 192, 264],
  phototransduction: [0, 48, 96, 144, 192, 240, 336, 432, 528],
  theVisualCycle: [0, 72, 120, 240, 312, 432, 480],
};

const setState = (stateIncoming) => {
  let state = toCamelCase(stateIncoming);

  console.log(state);

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
      : stateIncoming === "Na+"
      ? "na"
      : stateIncoming;

  let els = [
    ...document.getElementsByClassName(toCamelCase(stateChanged) + "Highlight"),
  ];
  for (let el of els) {
    el.classList.add("highlightIllu");
  }
};

const goToStep = (index) => {
  const targetFrame =
    frames[toCamelCase(props.animation.title)][+index + 1] ||
    frames[toCamelCase(props.animation.title)][1];
  const _frames = frames[toCamelCase(props.animation.title)];
  const lastState = _frames[_frames.length - 1];
  const startFrame = frames[toCamelCase(props.animation.title)][+index];
  const sf = startFrame !== lastState ? startFrame : 0;

  animationLottie.playSegments([sf, targetFrame], true);
};

const nextStep = (pause = false) => {
  isGoingNext.value = true;
  const tF = animationLottie.animationData.op;
  animationLottie.playSegments([1, tF], false);
  animationLottie.loop = true;
  const targetFrame =
    frames[toCamelCase(props.animation.title)][
      +currenSection.value + (pause ? 1 : 2)
    ] || frames[toCamelCase(props.animation.title)][1];
  isPlay.value = false;
  const _frames = frames[toCamelCase(props.animation.title)];
  const lastState = _frames[_frames.length - 1];
  const startFrame =
    frames[toCamelCase(props.animation.title)][
      +currenSection.value + (pause ? 1 : 2) - 1
    ];
  const sf = startFrame !== lastState ? startFrame : 0;

  animationLottie.playSegments([sf, targetFrame], true);
};

const setSpeed = () => {
  if (speed.value === 1) {
    speed.value = 0.2;
    animationLottie.setSpeed(speed.value);
  } else {
    speed.value = 1;
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
    speed: 0.2,
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    autoplay: false,
    path: "/publicAssets/animations/" + props.animation.id + ".json",
    rendererSettings: {
      progressiveLoad: false,
    },
  });
  setTimeout(() => {
    animationLottie.setSpeed(0.6);
    animationLottie.playSegments(
      [0, frames[toCamelCase(props.animation.title)][1]],
      true
    );
  }, 1000);

  const complete = () => {
    console.log("complete");
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
  animationLottie.setSpeed(1);
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
  width: max(50vw, calc(100vw - 780px - 11rem + 2px));
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

.w-oText {
  width: min(calc(50vw - 10rem), calc(780px));
}
.max-h-anim {
  max-height: calc(100vh - 220px);
}
</style>
