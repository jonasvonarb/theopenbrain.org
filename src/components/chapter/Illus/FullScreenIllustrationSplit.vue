<template>
  <div :id="toSlug(animation.title)" ref="container" class="w-full h-full">
    <TitleIllus :title="animation.title" />
    <SourceElement
      :source="animation.sources?.[activeLayer]"
      :info="animation.infos?.[activeLayer]"
    />
    <div
      class="absolute top-0 left-0 w-full h-full flex justify-between items-start text-small"
    >
      <div class="w-full h-full flex justify-end items-end bg-light">
        <div
          class="max-w-[800px] w-1/2 h-full py-48 m-auto "
          :id="animation.id + 'Left'"
        />
        <div
          class="flex items-center w-1/2 border-black border-l h-full overflow-hidden"
        >
          <div class="fullscreen m-12 hPlus" :id="animation.id + 'Right'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import lottie from "lottie-web";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { toSlug } from "@/helper/general.js";
import SourceElement from "../../UI/SourceElement.vue";
import TitleIllus from "../../UI/TitleIllus.vue";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  animation: Object,
  container: HTMLDivElement,
});

let animationLottieRight, animationLottieLeft;
let container = ref();
let progress = ref();
let activeLayer = ref(null);

onMounted(() => {
  let svgContainerLeft = document.getElementById(props.animation.id + "Left");
  if (!svgContainerLeft) return;
  animationLottieLeft = lottie.loadAnimation({
    id: props.animation.id + "Left",
    speed: 3,
    wrapper: svgContainerLeft,
    animType: "svg",
    loop: false,
    autoplay: false,
    renderer: "svg",
    // rendererSettings: {
    //   progressiveLoad: false,
    // },
    path: "/publicAssets/animations/" + props.animation.id + "Left" + ".json",
  });
  animationLottieLeft.setSubframe(true);

  let svgContainerRight = document.getElementById(props.animation.id + "Right");
  animationLottieRight = lottie.loadAnimation({
    id: props.animation.id + "Right",
    wrapper: svgContainerRight,
    animType: "svg",
    loop: false,
    autoplay: false,
    renderer: "canvas",
    scrub: false,
    path: "/publicAssets/animations/" + props.animation.id + "Right" + ".json",
  });
  animationLottieRight.setSubframe(false);

  let wait = setInterval(() => {
    if (!wait) return;
    clearInterval(wait);
    ScrollTrigger.create({
      id: "scrollTriggerSplit",
      trigger: props.container,
      start: "top " + 0,
      end: "bottom " + window.innerHeight,
      scrub: true,
      markers: false,
      onToggle: (self) => {},
      onUpdate: (self) => {
        progress.value = self.progress;
      },
    });
  }, 20);
});

watch(
  () => progress.value,
  (newP, olP) => {
    const map = (value, x1, y1, x2, y2) =>
      ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

    let totalFramesLeft = animationLottieLeft.totalFrames;
    let newMapLeft = map(newP, 0, 1, 20, totalFramesLeft - 1);
    let frameLeft =
      totalFramesLeft > newMapLeft
        ? 0 < newMapLeft
          ? newMapLeft
          : 1
        : totalFramesLeft - 1;
    animationLottieLeft.goToAndStop(frameLeft, true);
    animationLottieRight.goToAndStop(frameLeft, true);
    if (60 < frameLeft && frameLeft < 100) {
      activeLayer.value = 0;
    } else if (110 < frameLeft && frameLeft < 180) {
      activeLayer.value = 1;
    } else if (190 < frameLeft && frameLeft < 250) {
      activeLayer.value = 2;
    } else {
      activeLayer.value = null;
    }
  }
);
</script>

<style scoped>
.fullscreen > svg {
  height: unset !important;
  width: unset !important;
}

.hPlus {
  height: calc(100% + 5rem);
}
</style>
