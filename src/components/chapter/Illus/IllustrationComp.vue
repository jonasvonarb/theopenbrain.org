<template>
  <div
    class="pr-24 pl-32 flex flex-row justify-center items-center h-[100%] pointer-events-auto"
  >
    <div
      class="px-24 pl-32 z-50 fixed flex flex-col w-[50vw] justify-between top-6 left-0"
      :class="animation.multiple ? 'items-center' : 'items-start'"
    >
      <span class="pb-12">{{ animation.title }}</span>
      <div
        v-if="animation.multiple"
        class="fixed top-0 left-0 w-[50vw] h-screen px-24 pl-32 flex flex-col justify-center items-start"
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
        <p
          v-for="(state, index) in !animation.multiple
            ? animation.states
            : Object.keys(animation.states)"
          :key="state"
          class="hover:opacity-50 duration-300 text-small cursor-pointer pb-4"
          :class="
            activeState.state == index ? ' blur-xs pointer-events-none' : ''
          "
          @click="setState(index, activeState.state)"
        >
          {{ state }}
        </p>
      </div>
    </div>
    <div class="flex flex-row">
      <div
        v-if="!animation.multiple"
        :id="animation.id"
        class="w-full max-w-[800px]"
      />
      <BiArrowRepeat
        class="w-10 h-10 ml-4 mt-4 hover:text-violet cursor-pointer"
        v-if="animation.loop"
        @click="replay()"
      />
    </div>
  </div>
</template>

<script setup>
import IllustarionMultiple from "@/components/chapter/Illus/IllustarionMultiple.vue";
import { ref, onMounted } from "vue";
import { addH, removeH, toSlug } from "@/helper/general";

import lottie from "lottie-web";
import animationJSON from "@/assets/animations.json";
import BiArrowRepeat from "@/icons/BiArrowRepeat.vue";

const props = defineProps({
  animation: Object,
  activeAnimation: String,
});
let animationLottie;

const activeState = ref({
  state: 0,
});

const info = animationJSON.animations.find((x) => {
  return x.id == props.animation.id;
});

const replay = () => {
  if (!info.loopSection) {
    animationLottie.goToAndPlay(0, true);
  } else {
    animationLottie.playSegments(info.loopSection, true);
  }
};

const setState = (index, indexBefore) => {
  if (info.clickTriggered) {
    let clickTriggers = document.getElementsByClassName("animationMarkerClick");
    let trigger = Array.prototype.slice.call(clickTriggers).find((x) => {
      return x.id === toSlug(props.animation.states[index]);
    });
    let triggerBefore = Array.prototype.slice.call(clickTriggers).find((x) => {
      return x.id === toSlug(props.animation.states[indexBefore]);
    });
    trigger.classList.add("active");
    trigger.scrollIntoView({
      behavior: "smooth",
      alignToTop: "false",
      block: "center",
    });
    triggerBefore.classList.remove("active");
  }

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

onMounted(() => {
  if (info.clickTriggered) {
    let clickTriggers = document.getElementsByClassName("animationMarkerClick");
    let trigger = Array.prototype.slice.call(clickTriggers).find((x) => {
      return x.id === toSlug(props.animation.states[0]);
    });
    trigger.classList.add("active");
  }

  let svgContainer = document.getElementById(props.animation.id);
  if (!svgContainer) return;
  animationLottie = lottie.loadAnimation({
    id: props.animation.id,
    speed: 3,
    wrapper: svgContainer,
    animType: "svg",
    loop: false,
    autoplay: false,
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

  if (!info.states) {
    animationLottie.play();
  } else {
    animationLottie.goToAndStop(24, true);
  }
});
</script>

<style lang="scss" scoped></style>
