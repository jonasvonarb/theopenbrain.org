<script setup>
import lottie from "lottie-web";
import { onBeforeUnmount, onMounted, ref } from "vue";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import animations from "/src/assets/animations.json";
gsap.registerPlugin(ScrollTrigger);

const activeAnimation = ref(null);

const props = defineProps({
  paragraph: Object,
});

const animation = ref(null);
const totalFrames = ref(null);

const thisAnimation = ref(
  animations.animations.find((x) => x.id == props.paragraph.animationId)
);

const activeState = ref({
  state: 0,
  toggle: 0,
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
  console.log(activeState.state);
  const posStart = 36 + 23 + 72 * (activeState.state - 1);
  const posEnd = 36 + 23 + 72 * (activeState.state - 1) + 12;
  if (index === 1) {
    animation.value.playSegments([posStart, posEnd], true);
    activeState.toggle = index;
  } else {
    animation.value.playSegments([posEnd, posStart], true);
    activeState.toggle = index;
  }
};
const setState = (index, activeState) => {
  if (!totalFrames.value) {
    totalFrames.value = animation.value.totalFrames;
  }
  animation.value.playSegments([1, totalFrames.value], true);
  if (index != 0) {
    const posAfter = 36 + 23 + 72 * (index - 1) + activeState.toggle * 12;
    console.log(posAfter, index);
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
    class="h-[150vh] w-screen bg-violet-500 text-white -translate-x-1/2 -ml-32 my-[5vh]"
  >
    <div class="sticky w-full h-screen p-32 top-0">
      <div class="absolute z-50 flex flex-col justify-between pr-48">
        <div class="w-52 grow">
          <p
            @click="
              activeState.state != index ? setState(index, activeState) : ''
            "
            class="hover:underline"
            v-for="(state, index) in thisAnimation.states"
            :class="
              activeState.state == index
                ? 'italic font-bold'
                : 'blur-xs opacity-30'
            "
          >
            {{ state }}
          </p>
        </div>
        <div class="w-52 grow text-right">
          <p
            v-if="activeState.state != 0"
            @click="
              activeState.toggle != index ? toggleState(index, activeState) : ''
            "
            class="hover:underline"
            v-for="(toggle, index) in thisAnimation.toggle"
            :class="
              activeState.toggle == index
                ? 'italic font-bold'
                : 'blur-xs opacity-30'
            "
          >
            {{ toggle }}
          </p>
        </div>
      </div>
      <div
        class="w-full h-full flex flex-col justify-center items-center"
        :id="'container' + paragraph.animationId"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
