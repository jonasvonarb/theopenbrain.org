<template>
  <div class="fixed top-0 left-0 h-screen w-[50vw] px-5 z-20 bg-white">
    <!-- <div id="animationWindowDouble" class="w-full h-full" /> -->
  </div>
</template>

<script setup>
import lottie from "lottie-web";
import { onBeforeUnmount, onMounted } from "vue";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  animation.play();
  let animationTriggers = document.getElementsByClassName("animationTrigger");
  for (let trigger of animationTriggers) {
    ScrollTrigger.create({
      id: "scrollTriggerAnimation",
      trigger: trigger,
      start: "top " + window.innerHeight / 2,
      end: "bottom " + window.innerHeight / 2,
      srub: 0,
      markers: false,
      onToggle: (self) => {
        if (self.isActive) {
          trigger.classList.add("active");
        } else {
          trigger.classList.remove("active");
        }
      },
      onUpdate: (self) => {
        console.log(self);
      },
    });
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getById("scrollTriggerAnimation").kill();
});
</script>

<style scoped></style>
