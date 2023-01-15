<script setup>
import lottie from "lottie-web";
import { onMounted, ref } from "vue";

import FullScreenIllustrationMultiple from "@/components/chapter/Illus/FullScreenIllustrationMultiple.vue";

import animations from "@/assets/animations.json";

const props = defineProps({
  paragraph: Object,
});

const animation = ref(null);
const totalFrames = ref(null);

const thisAnimation = ref(
  animations.animations.find((x) => x.id == props.paragraph.animationId)
);

const activeState = ref({
  state: !thisAnimation.value?.multiple
    ? 0
    : Object.keys(thisAnimation.value.states)[0],
  toggle: false,
});

onMounted(() => {
  const id = props.paragraph.animationId;
  var svgContainer = document.getElementById("container" + id);
  animation.value = lottie.loadAnimation({
    speed: 3,
    wrapper: svgContainer,
    animType: "svg",
    loop: false,
    autoplay: false,
    path: "/assets/animations/" + id + ".json",
  });
  animation.value.setSubframe(true);
  animation.value.setSpeed(1);
});

const toggleState = (index, activeState) => {
  const posStart = 36 + 23 + 74 * (activeState.state - 1) - 5;
  const posEnd = 36 + 23 + 74 * (activeState.state - 1) + 15;
  if (!activeState.toggle) {
    animation.value.playSegments([posStart, posEnd], true);
    activeState.toggle = !activeState.toggle;
  } else {
    animation.value.playSegments([posEnd, posStart], true);
    activeState.toggle = !activeState.toggle;
  }
};
const setState = (index, activeState, setter) => {
  if (!totalFrames.value) {
    totalFrames.value = animation.value.totalFrames;
  }
  animation.value.playSegments([1, totalFrames.value], true);
  if (index != 0) {
    const posAfter = 36 + 23 + 72 * (index - 1) + activeState.toggle * 12;
    activeState.state = index;
    animation.value.goToAndStop(posAfter, true);
  } else {
    animation.value.goToAndStop(0, true);
    activeState.toggle = 0;
    activeState.state = index;
  }
};
</script>

<template>
  <div
    class="h-[150vh] w-screen bg-light text-left -translate-x-1/2 -ml-28 my-72 text-small font-mono"
  >
    <div class="sticky w-full h-screen px-32 py-16 top-0">
      <div class="absolute z-50 flex flex-col justify-between">
        <div
          v-for="(state, index) in thisAnimation.states"
          :key="state"
          class="flex justify-between flex-wrap mb-4 p-4 pr-12 py-1"
        >
          <button
            class="p-4 pr-12 py-1 text-left duration-200 border w-64 bg-lighter text-dark"
            :class="[
              (activeState.toggle === false && activeState.state === index) ||
              (activeState.state === index && index === 0)
                ? 'opacity-100 pointer-events-none'
                : activeState.state !== index
                ? 'opacity-30 hover:blur-xs '
                : 'opacity-60 hover:blur-xs',
            ]"
            @click="
              activeState.state !== index
                ? activeState.toggle === true
                  ? (toggleState(index, activeState),
                    setState(index, activeState))
                  : setState(index, activeState)
                : toggleState(index, activeState)
            "
          >
            {{ state }}
          </button>
          <button
            v-if="index !== 0 && !thisAnimation?.multiple"
            class="p-4 pr-12 py-1 text-left duration-200 flex-1 bg-black text-light"
            :class="[
              activeState.toggle === true && activeState.state === index
                ? 'opacity-100 pointer-events-none'
                : activeState.state !== index
                ? 'opacity-20 hover:blur-xs '
                : 'opacity-40 hover:blur-xs',
              ,
            ]"
            @click="
              activeState.state !== index
                ? activeState.toggle !== true //shoulb be !==
                  ? (toggleState(index, activeState),
                    setState(index, activeState, 'toggle'))
                  : setState(index, activeState, 'toggle')
                : toggleState(index, activeState, 'toggle')
            "
          >
            {{ thisAnimation.toggle }}
          </button>
        </div>
      </div>
      <div
        v-if="!thisAnimation?.multiple"
        :id="'container' + paragraph.animationId"
        class="w-full h-full flex flex-col justify-center items-center"
      ></div>
      <div
        v-else
        class="w-full h-screen flex flex-col justify-center items-center p-56"
      >
        <template
          v-for="(state, index) in Object.keys(thisAnimation.states)"
          :key="state"
        >
          <FullScreenIllustrationMultiple
            v-if="activeState.state === state"
            :state="state"
            :animation="thisAnimation"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
