<script setup>
import { useRoute } from "vue-router";
import { useGeneral } from "@/stores";
import lottie from "lottie-web";
import { onMounted, ref, watch } from "vue";
import { useMouse } from "@vueuse/core";

const { x } = useMouse();

const store = useGeneral();
const animation = ref(null);

watch(x, (x) => {
  if (!animation.value) return;
  const map = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
  animation.value.goToAndStop(
    map(x, 0, window.innerWidth, 0, animation.value.totalFrames),
    true
  );
});

onMounted(() => {
  let svgContainer = document.getElementById("animationStart");
  setTimeout(() => {
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
  }, 700);
});
</script>
<template>
  <div
    id="titleAnimation"
    :class="store.activeMenu ? 'w-[65vw]' : 'w-screen'"
    class="bgImage bg-dark absolute right-0 h-screen z-[50] overflow-hidden duration-500 flex justify-start items-center"
  >
    <div
      id="animationStart"
      class="w-screen h-screen flex flex-wrap justify-center items-center"
    />
    <div class="absolute bottom-12 right-0 w-full flex justify-center pr-3">
      <button
        class="pointer-events-auto text-xl text-white bg-black rounded-full w-16 h-16"
      >
        &#x2193;
      </button>
    </div>
  </div>
</template>

<style>
#animationStart > svg {
  height: 100vh;
}

.bgImage {
  background-image: url("/assets/images/placeholderEye.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
