<script setup>
import lottie from "lottie-web";
import { onMounted, ref } from "vue";

import FullScreenIllustrationMultiple from "@/components/chapter/Illus/FullScreenIllustrationMultiple.vue";

import animations from "@/assets/json_backend/animations.json";
import FullScreenIllustrationLoop from "./FullScreenIllustrationLoop.vue";
import FullScreenIllustrationSplit from "./FullScreenIllustrationSplit.vue";
import BiCheckCircle from "../../../icons/BiCheckCircle.vue";
import BiDashCircle from "../../../icons/BiDashCircle.vue";

const props = defineProps({
  paragraph: Object,
});

const animation = ref(null);
const totalFrames = ref(null);
const containerScroll = ref();

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
  if (props.paragraph.scroll) return;
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
const setState = (index, activeState) => {
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
    ref="containerScroll"
    class="w-screen bg-lighter border-y border-black -translate-x-1/2 -ml-20 my-[25vh] text-small font-mono"
    :class="!thisAnimation.split ? 'h-[150vh]' : 'h-[700vh]'"
  >
    <div class="sticky w-full h-screen px-24 py-10 top-0">
      <div
        class="absolute z-50 flex flex-col justify-between"
        v-if="
          !thisAnimation?.loop &&
          thisAnimation?.states &&
          !thisAnimation?.multiple
        "
      >
        <h4 class="">{{ thisAnimation.title }}</h4>
        <div class="pt-20">
          <div
            v-for="(state, index) in thisAnimation.states"
            :key="state"
            class="grid grid-cols-2 mb-4 py-0 gap-0"
          >
            <button
              class="flex justify-center items-center flex-col border p-6 border-black duration-100 text-center flex-1"
              :class="[
                index !== 0 ? ' col-span-1	' : ' col-span-2	',
                (activeState.toggle === false && activeState.state === index) ||
                (activeState.state === index && index === 0)
                  ? 'bg-violet text-white pointer-events-none'
                  : activeState.state === index
                  ? 'border-violet text-black hover:text-violet '
                  : ' text-dark hover:text-violet',
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
              <div class="">{{ state }}</div>
            </button>

            <button
              v-if="index !== 0 && !thisAnimation?.multiple"
              class="flex justify-center items-center flex-col border border-l-0 col-span-1 p-6 border-black duration-100 flex-1"
              :class="[
                activeState.toggle === true && activeState.state === index
                  ? 'bg-violet text-white pointer-events-none'
                  : activeState.state === index
                  ? 'border-violet text-black  hover:text-violet '
                  : 'bg-lighter text-dark hover:text-violet',
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
      </div>
      <div
        v-if="
          !thisAnimation?.multiple &&
          !thisAnimation?.loop &&
          !thisAnimation?.split
        "
        :id="'container' + paragraph.animationId"
        class="absolute right-0 w-2/3 h-full p-24 pr-36 flex flex-col justify-end items-center"
      ></div>
      <div
        v-if="!thisAnimation?.multiple && thisAnimation?.loop"
        class="w-full h-full"
      >
        <FullScreenIllustrationLoop :animation="thisAnimation" />
      </div>
      <div v-if="thisAnimation?.split" class="w-full h-full">
        <FullScreenIllustrationSplit
          :animation="thisAnimation"
          :container="containerScroll"
        />
      </div>
      <div
        v-else-if="thisAnimation?.multiple && thisAnimation?.states"
        class="w-full h-screen flex flex-col justify-center items-center p-56"
      >
        <template
          v-for="state in Object.keys(thisAnimation.states)"
          :key="state"
        >
          <FullScreenIllustrationMultiple
            v-if="activeState?.state === state"
            :state="state"
            :animation="thisAnimation"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
