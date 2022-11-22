<template>
  <div class="fixed top-0 left-0 h-screen w-[50vw] px-5 z-20 bg-white invert">
    <!-- <div id="animationWindowDouble" class="w-full h-full" /> -->
  </div>
</template>

<script setup>
import lottie from "lottie-web";
import { onMounted } from "vue";

onMounted(() => {
  const animActive = true;
  var svgContainer = document.getElementById("animationWindowDouble");
  var animation = lottie.loadAnimation({
    speed: 3,
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    autoplay: false,
    path: "/assets/lottietest-2-jva.json",
  });
  animation.setSubframe(false);
  animation.setSpeed(1);
  animation.play()
});
</script>

<style scoped></style>
