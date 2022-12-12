<script setup>
import { useRoute } from "vue-router";
import { useGeneral } from "@/stores";
import lottie from "lottie-web";
import { onMounted, ref, watch } from "vue";
import { useMouse, useMousePressed } from "@vueuse/core";

const { x, y } = useMouse();

const { pressed } = useMousePressed();

const route = useRoute();
const store = useGeneral();
const animation = ref(null);

watch(x, (x, prevX) => {
  console.log(pressed.value);
  const map = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
  animation.value.goToAndStop(
    map(x, 0, window.innerWidth, 0, animation.value.totalFrames),
    true
  );
});

onMounted(() => {
  let svgContainer = document.getElementById("animationStart");
  animation.value = lottie.loadAnimation({
    id: "intro",
    speed: 3,
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    autoplay: false,
    rendererSettings: {
      progressiveLoad: false,
      preserveAspectRatio: "xMidYMax slice",
    },
    path: "/assets/animations/background-test-1.json",
  });
});
</script>
<template>
  <div
    id="titleAnimation"
    class="absolute w-screen h-screen z-[50] bg-black overflow-hidden duration-500 flex justify-start items-center"
  >
    <!-- :class="!store.startIsActive ? 'h-0' : 'h-screen'" -->
    <div class="w-screen flex justify-center" id="animationStart" />
    <div class="absolute bottom-6 right-12 w-full flex justify-end pr-3">
      <button
        class="pointer-events-auto text-xl text-white bg-black rounded-full w-16 h-16"
      >
        <!--         @click="store.startIsActive = !store.startIsActive" -->
        &#x2193;
      </button>
    </div>
  </div>
</template>

<style>
#animationStart > svg {
  width: unset !important;
  height: 100vh !important;
}
</style>
