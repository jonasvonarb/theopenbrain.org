<template>
  <div
    class="pr-24 pl-24 flex flex-row justify-center items-center h-[100%] pointer-events-auto"
  >
    <div
      class="px-24 pl-24 z-50 fixed flex flex-col w-[50vw] justify-between top-6 left-0"
      :class="animation.multiple ? 'items-center' : 'items-start'"
    >
      <span class="pb-12">{{ animation.title }}</span>
      <div
        v-if="animation.multiple"
        class="fixed top-0 left-0 w-[50vw] h-screen px-24 pl-24 flex flex-col justify-center items-start"
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
        <template v-if="!info.blockStates">
          <p
            v-for="(state, index) in !animation.multiple
              ? animation.states
              : Object.keys(animation.states)"
            :key="state"
            class="hover:opacity-50 text-small cursor-pointer pb-2 hover:blur-xs"
            :class="
              activeState.state == index ? 'font-bold pointer-events-none' : ''
            "
            @click="setState(index, activeState.state)"
          >
            {{ state }}
          </p>
        </template>
        <template v-else>
          <p
            v-for="(state, index) in !animation.multiple
              ? animation.states
              : Object.keys(animation.states)"
            :key="state"
            class="hover:opacity-50 text-smaller cursor-pointer pb-2 mb-4 hover:blur-xs border-black border p-4 flex flex-col justify-center items-center"
            :class="activeState[index] ? 'font-bold bg-violet text-white' : ''"
            @click="setBlockState(index, activeState.state)"
          >
            <BiPlayCircleFill />
            {{ state }}
          </p>
        </template>
      </div>
    </div>
    <div class="flex flex-row min-w-full">
      <div v-if="!animation.multiple" :id="animation.id" class="w-full" />
      <BiPauseCircleFill
        class="w-10 h-10 ml-4 mt-4 hover:text-violet cursor-pointer text-light"
        v-if="animation.loop && !isPaused && animation.playPause"
        @click="playPause()"
      />
      <BiPlayCircleFill
        class="w-10 h-10 ml-4 mt-4 hover:text-violet cursor-pointer text-light"
        v-else-if="animation.playPause"
        @click="playPause()"
      />
    </div>
  </div>
</template>

<script setup>
import IllustarionMultiple from "@/components/chapter/Illus/IllustarionMultiple.vue";
import { ref, onMounted, watch } from "vue";
import { addH, removeH, toSlug } from "@/helper/general";

import lottie from "lottie-web";
import animationJSON from "@/assets/animations.json";
import BiPlayCircleFill from "@/icons/BiPlayCircleFill.vue";
import BiPauseCircleFill from "@/icons/BiPauseCircleFill.vue";

const props = defineProps({
  animation: Object,
  activeAnimation: String,
});
let animationLottie;
let isPaused = ref(false);
const info = animationJSON.animations.find((x) => {
  return x.id == props.animation.id;
});

const activeState = !info.blockStates
  ? ref({
      state: 0,
    })
  : ref([]);

if (info.blockStates) {
  info.states.forEach((x) => {
    activeState.value.push(false);
  });
}

const playPause = () => {
  if (animationLottie.isPaused) {
    animationLottie.playSegments(
      info.loopSection || [0, animationLottie.totalFrames],
      false
    );
    isPaused.value = false;
  } else {
    animationLottie.pause();
    isPaused.value = true;
  }
};

const setState = (index, indexBefore) => {
  if (!props.animation.multiple) {
    animationLottie.setSpeed(6);
    let totalFrames = animationLottie.animationData.op;
    const pos = (totalFrames / 6) * (indexBefore + 1);
    animationLottie.playSegments([1, totalFrames], true);
    const posAfter = (totalFrames / 6) * (index + 1);
    activeState.value.state = index;
    animationLottie.playSegments([pos, posAfter], true);
  } else {
    activeState.value.state = index;
  }
};

const setBlockState = (index) => {
  let newState = !activeState.value[index];
  activeState.value.splice(index, 1, newState);
  let stateName = info.states[index].replaceAll(" ", "").toLowerCase();
  let els = document.querySelectorAll("." + stateName + "Highlight");
  for (let el of els) {
    if (newState) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  }
};

onMounted(() => {
  let svgContainer = document.getElementById(props.animation.id);
  if (!svgContainer) return;
  animationLottie = lottie.loadAnimation({
    id: props.animation.id,
    speed: 1,
    wrapper: svgContainer,
    animType: "svg",
    loop: info.blockStates ? true : false,
    autoplay: info.blockStates ? true : false,
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
  if (info.loop) {
    animationLottie.addEventListener("complete", () => {
      animationLottie.playSegments(
        info.loopSection || [0, animationLottie.totalFrames],
        true
      );
    });
  }

  if (!info.states) {
    animationLottie.play();
  } else {
    animationLottie.goToAndStop(24, true);
  }
});
</script>

<style scoped>
.blockState {
  border: black solid 1px;
}
</style>

<style>
.highlighterIlluDisplay {
  opacity: 0;
}
.highlighterIlluDisplay.active {
  opacity: 1;
}
</style>
