<template>
  <div
    class="pr-12 pl-32 flex flex-row justify-center items-center h-[100%] pointer-events-auto"
  >
    <div
      class="px-20 pt-10 z-30 fixed flex flex-col w-[50vw] justify-between top-0 left-0"
      :class="animation.multiple ? 'items-center' : 'items-start'"
    >
      <span class="pb-0 text-baseMono">{{ animation.title }}</span>
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
            v-for="(state, index) of !animation.multiple
              ? animation.states
              : Object.keys(animation.states)"
            :key="state"
            class="hover:underline duration-300 text-small"
            :class="
              activeState.state == index
                ? 'italic font-semibold'
                : 'blur-xs opacity-30'
            "
            @click="setState(index, state)"
          >
            Task {{ index + 1 }}: {{ animation.states[state] }}
          </p>
        </div>
      </div>

      <div
        v-if="animation.switches || (animation.states && !animation.multiple)"
      >
        <template v-if="!info.blockStates">
          <StateElement
            :states="!info.multiple ? info.states : Object.keys(info.states)"
            :activeState="activeState.state"
            @onClick="setState"
          />
        </template>
        <template v-else>
          <p
            v-for="(state, index) in !animation.multiple
              ? animation.states
              : Object.keys(animation.states)"
            :key="state"
            class="hover:opacity-50 select-none text-smaller cursor-pointer pb-2 mb-4 border-black border p-4 flex flex-col justify-center items-center"
            :class="
              activeState[index] ? 'font-semibold bg-violet text-white' : ''
            "
            @click="setBlockState(index, activeState.state)"
          >
            <BiPlayCircleFill />
            {{ state }}
          </p>
        </template>
      </div>
    </div>
    <div
      class="flex flex-row min-w-full"
      :class="animation.legend ? '-mr-20 ml-20' : ''"
    >
      <div
        v-if="!animation.multiple && !animation.flip && !animation.switch"
        :id="animation.id"
        class="w-full"
      />
      <IllustrationFlip
        v-else-if="!animation.multiple && animation.flip"
        :video="toSlug(animation.video)"
      />
      <IllustrationSwitch
        v-if="!animation.multiple && !animation.flip && animation.switch"
        :info="info"
        :isPaused="isPaused"
      />
      <LegendElement
        v-if="animation.legend"
        :legend="animation.legend"
        iconPraefix="retinalCircuits"
      />
    </div>
    <div class="absolute top-12 right-8 z-40">
      <BiPauseCircleFill
        class="w-10 h-10 ml-2 hover:text-violet cursor-pointer text-light"
        v-if="animation.loop && !isPaused"
        @click="playPause()"
      />
      <BiPlayCircleFill
        class="w-10 h-10 ml-2 hover:text-violet cursor-pointer text-light"
        v-else-if="animation.loop"
        @click="playPause()"
      />
    </div>
  </div>
</template>

<script setup>
import IllustarionMultiple from "@/components/chapter/Illus/IllustarionMultiple.vue";
import { ref, onMounted, watch } from "vue";
import { addH, removeH, toSlug, toCamelCase } from "@/helper/general";

import lottie from "lottie-web";
import animationJSON from "@/assets/json_backend/animations.json";
import BiPlayCircleFill from "@/icons/BiPlayCircleFill.vue";
import BiPauseCircleFill from "@/icons/BiPauseCircleFill.vue";
import IllustrationFlip from "./IllustrationFlip.vue";
import IllustrationSwitch from "./IllustrationSwitch.vue";
import StateElement from "@/components/UI/StateElement.vue";
import LegendElement from "@/components/UI/LegendElement.vue";

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
      state: undefined,
    })
  : ref([]);

if (info.blockStates) {
  info.states.forEach(() => {
    activeState.value.push(true);
  });
}

const playPause = () => {
  if (isPaused.value) {
    isPaused.value = false;
    if (!animationLottie) return;
    animationLottie.playSegments(
      info.loopSection || [0, animationLottie.totalFrames],
      false
    );
  } else {
    isPaused.value = true;
    if (!animationLottie) return;
    animationLottie.pause();
  }
};

const setState = (event) => {
  let index = event.index;
  let indexBefore = event.activeState;
  if (!info.highlight) {
    if (!props.animation.multiple) {
      animationLottie.setSpeed(6);
      let totalFrames = animationLottie.animationData.op;
      const pos = (totalFrames / 6) * (indexBefore + 1);
      animationLottie.playSegments([1, totalFrames], true);
      const posAfter = (totalFrames / 6) * (index + 1);
      activeState.value.state = index;
      if (info.smooth) {
        animationLottie.playSegments([pos, posAfter], true);
      } else {
        animationLottie.goToAndStop(posAfter, true);
      }
    } else {
      activeState.value.state = index;
    }
  } else {
    let state = toCamelCase(info.states[index]);
    console.log(state);
    let els = document.getElementsByClassName(state + "Highlight");
    for (let el of els) {
      console.log(el);
      el.classList.add("highlightIllu");
      activeState.value.state = index;
    }
    if (indexBefore === undefined) return;
    let lastState = toCamelCase(info.states[indexBefore]);
    let lastEls = document.getElementsByClassName(lastState + "Highlight");
    for (let lastEl of lastEls) {
      lastEl.classList.remove("highlightIllu");
    }
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
  if (info.switch) return;
  let svgContainer = document.getElementById(props.animation.id);
  if (!svgContainer) return;
  animationLottie = lottie.loadAnimation({
    id: props.animation.id,
    speed: 1,
    wrapper: svgContainer,
    animType: "svg",
    loop: false,
    autoplay: true,
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
  animationLottie.play();
  if (info.loop) {
    animationLottie.addEventListener("complete", () => {
      animationLottie.playSegments(
        info.loopSection || [0, animationLottie.totalFrames],
        true
      );
    });
  }
  if (!info.hasTransition) {
    if (!info.states) {
      animationLottie.play();
    } else {
      animationLottie.goToAndStop(24, true);
    }
  } else {
    setTimeout(() => {
      animationLottie.play();
    }, 500);
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

.highlighterIlluDisplay.highlightIllu {
  opacity: 1;
  display: block;
}
</style>
