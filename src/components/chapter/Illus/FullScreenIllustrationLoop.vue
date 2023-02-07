<template>
  <div class="w-full h-full noHyphens pb-24">
    <h4 class="absolute">{{ animation.title }}</h4>
    <div
      class="w-full h-full flex justify-between items-start pt-32 text-small gap-16"
    >
      <div class="w-1/3 flex flex-col gap-12">
        <ol class="-ml-2 w-full">
          <li
            class="pt-10 first-of-type:pt-0 pointer-event-none flex gap-3"
            v-for="(state, index) of animation.states"
            :key="state"
          >
            <div
              :class="
                index === 2 ? 'bg-violet text-white' : 'bg-white text_black'
              "
              class="shrink-0 -mt-[0.4rem] pt-0.5 mr-2 rounded-full border border-black h-10 w-10 text-center"
            >
              {{ index + 1 }}
            </div>
            <div>{{ state }}</div>
          </li>
        </ol>
        <ul
          v-if="animation.statesHighlight"
          :class="
            animation.statesHighlight.length > 8 ? 'columns-2 gap-12' : ''
          "
          class="w-full pl-12"
        >
          <li
            class="pt-6 cursor-pointer flex gap-3"
            :class="
              index + 1 === activeState
                ? 'underline  text-violet hover:text-violet'
                : ' hover:text-violet'
            "
            v-for="(state, index) of animation.statesHighlight"
            :key="state"
            @click="setState(index)"
          >
            {{ state }}
          </li>
        </ul>
      </div>
      <div class="w-2/3 h-full flex justify-end items-end">
        <div :id="animation.id" />
        <img
          class="w-full h-full object-contain object-right-bottom"
          :src="'/publicAssets/images/placeholders/' + animation.id + '.png'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import lottie from "lottie-web";
import animationJSON from "@/assets/json_backend/animations.json";

const props = defineProps({
  animation: Object,
  state: String,
});

let animationLottie;

const activeState = ref(0);

onMounted(() => {
  let svgContainer = document.getElementById(props.animation.id + "placholder");

  if (!svgContainer) return;
  animationLottie = lottie.loadAnimation({
    id: props.animation.id,
    speed: 3,
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    autoplay: true,
    path: "/publicAssets/animations/" + props.animation.id + ".json",
  });
  animationLottie.setSubframe(true);
  animationLottie.setSpeed(0.5);
});

const setState = (index) => {
  if (activeState.value === index + 1) {
    activeState.value = 0;
  } else {
    activeState.value = index + 1;
  }
};
</script>

<style scoped>
.noHyphens {
  hyphens: none;
}
</style>
