<script setup>
import lottie from "lottie-web";
import { onMounted, ref } from "vue";

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
  const posStart = 36 + 23 + 74 * (activeState.state - 1) - 5;
  const posEnd = 36 + 23 + 74 * (activeState.state - 1) + 15;
  if (index === 1) {
    animation.value.playSegments([posStart, posEnd], true);
    activeState.toggle = index;
  } else {
    animation.value.playSegments([posEnd, posStart], true);
    activeState.toggle = index;
  }
  console.log(posStart, posEnd);
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
    class="h-[150vh] w-screen bg-violet text-white -translate-x-1/2 -ml-32 my-6"
  >
    <div class="sticky w-full h-screen px-44 top-0">
      <div class="absolute z-50 flex flex-col justify-between pr-48">
        <div class="w-52 pt-32 grow">
          <button
            v-for="(state, index) in thisAnimation.states"
            :key="state"
            class="hover:underline"
            :class="
              activeState.state == index
                ? 'italic font-bold'
                : 'blur-xs opacity-30'
            "
            @click="
              activeState.state != index ? setState(index, activeState) : ''
            "
          >
            {{ state }}
          </button>
        </div>
        <div class="w-52 grow text-right">
          <button
            v-for="(toggle, index) in thisAnimation.toggle"
            :key="toggle"
            class="hover:underline"
            :class="
              activeState.toggle == index
                ? 'italic font-bold'
                : 'blur-xs opacity-30'
            "
            @click="
              activeState.toggle != index ? toggleState(index, activeState) : ''
            "
          >
            <template v-if="activeState.state != 0"> {{ toggle }}</template>
          </button>
        </div>
      </div>
      <div
        :id="'container' + paragraph.animationId"
        class="w-full h-full flex flex-col justify-center items-center"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
