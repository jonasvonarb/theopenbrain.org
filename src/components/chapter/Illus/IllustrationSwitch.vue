<template>
  <div class="w-full h-full flex justify-end items-start">
    <div class="absolute top-40 left-20 z-50 w-64">
      <StateElement
        v-if="!info.blockSwitches"
        :states="info.switches"
        :activeState="activeState"
        @onClick="setState"
      />
      <StateElementBlock
        v-else
        :states="info.switches"
        :activeState="activeState"
        :praefix="info.iconPraefix"
        @onClick="setState"
      />
      <LegendElement
        v-if="info.legend"
        :legend="info.legend"
        :iconPraefix="info.iconPraefix"
      />
    </div>
    <template v-for="(switchWord, index) of info.switches" :key="switchWord">
      <div
        :class="store.legendIsActive && 'w-[80%]'"
        v-show="index === activeState"
        :id="
          info.id +
          switchWord[0].toUpperCase() +
          switchWord.substring(1).replaceAll(' ', '')
        "
        class="w-full duration-300"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import lottie from "lottie-web";
import StateElement from "../../UI/StateElement.vue";
import StateElementBlock from "../../UI/StateElementBlock.vue";
import LegendElement from "@/components/UI/LegendElement.vue";
import { useGeneral } from "../../../stores";

const props = defineProps({
  info: Object,
  isPaused: Boolean,
});
let animationLottie = [];
const store = useGeneral();
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
      rendererSettings: {
        progressiveLoad: false,
      },
      id: id,
      wrapper: svgContainer,
      animType: "svg",
      loop: true,
      autoplay: props.info.loop ? true : false,
      path: "/publicAssets/animations/" + id + ".json",
    });
    animationLottie[index].setSubframe(true);
    animationLottie[index].play();
    console.log(props.info.id);
    if (props.info.id === "animationOnOff") {
      animationLottie[index].setSpeed(0.5);
    }
  }
});
</script>

<style scoped></style>
