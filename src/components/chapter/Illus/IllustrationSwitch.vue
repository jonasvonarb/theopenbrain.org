<template>
  <div class="w-full h-full flex justify-center items-start">
    <StateElement
      v-if="!info.iconSwitches"
      :states="info.switches"
      :activeState="activeState"
      @onClick="setState"
    />
    <div v-else>
      <img
        class="absolute top-64 left-24 h-12 w-12"
        @click="setState"
        :src="
          '/publicAssets/icons/' +
          info.iconPraefix +
          '/' +
          info.switches[activeState] +
          '.svg'
        "
      />
    </div>
    <template v-for="(switchWord, index) of info.switches" :key="switchWord">
      <div
        v-show="index === activeState"
        :id="
          info.id +
          switchWord[0].toUpperCase() +
          switchWord.substring(1).replaceAll(' ', '')
        "
        class="w-full"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import lottie from "lottie-web";
import StateElement from "../../UI/StateElement.vue";

const props = defineProps({
  info: Object,
  isPaused: Boolean,
});
let animationLottie = [];

let activeState = ref(0);

let setState = (event) => {
  let max = props.info.switches.length;
  animationLottie[event.index || (activeState.value + 1) % max].goToAndPlay(
    0,
    true
  );
  activeState.value = event.index || (activeState.value + 1) % max;
};

watch(
  () => props.isPaused,
  (isPaused) => {
    if (!isPaused) {
      animationLottie[activeState.value].play();
    } else {
      animationLottie[activeState.value].pause();
    }
  }
);

onMounted(() => {
  let switches = props.info.switches;
  for (let index in switches) {
    let id =
      props.info.id +
      switches[index][0].toUpperCase() +
      switches[index].substring(1).replaceAll(" ", "");
    let svgContainer = document.getElementById(id);
    if (!svgContainer) return;
    animationLottie[index] = lottie.loadAnimation({
      id: id,
      speed: 1,
      wrapper: svgContainer,
      animType: "svg",
      loop: true,
      autoplay: props.info.loop ? true : false,
      path: "/publicAssets/animations/" + id + ".json",
    });
    animationLottie[index].setSubframe(true);
    animationLottie[index].play();
  }
});
</script>

<style scoped></style>
